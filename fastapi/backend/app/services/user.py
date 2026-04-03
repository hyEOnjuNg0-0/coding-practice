from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import User
from app.db.scheme.users import UserCreate, UserUpdate, UserLogin
from sqlalchemy.future import select
from app.db.crud import UserCrud
from fastapi import HTTPException
from app.core.jwt_handle import (
    create_access_token,
    create_refresh_token,
    ensure_bcrypt_password_limit,
    get_password_hash, 
    verify_password
)

#crud는 UserCrud에서 처리하고, 비즈니스 규칙(유효성검사, 비밀번호해시, 예외처리 등)을 추가
class UserService:

    @staticmethod
    async def get_user(db:AsyncSession, user_id:int) -> User:
        db_user=await UserCrud.get_by_id(db, user_id)
        if not db_user:
            raise HTTPException(status_code=404, detail="사용자 찾을 수 없다")
        return db_user

    @staticmethod
    async def signup(db:AsyncSession, user:UserCreate):
        if await UserCrud.get_by_username(db, user.username):
            raise HTTPException(status_code=400,  detail="이미 사용중인 이름이다")
        try:
            ensure_bcrypt_password_limit(user.password)
        except ValueError:
            raise HTTPException(status_code=400, detail="비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.")

        hash_pw= get_password_hash(user.password)
        user_create=UserCreate(username=user.username, password=hash_pw, email=user.email)

        try:
            db_user=await UserCrud.create(db,user_create)
            await db.commit()
            await db.refresh(db_user)
            return db_user
        
        except Exception:
            await db.rollback()
            raise HTTPException(status_code=401, detail="잘못된 이메일 또는 비번이다")


    @staticmethod
    async def login(db:AsyncSession, user:UserLogin):
        db_user=await UserCrud.get_by_email(db, user.email)
        try:
            ensure_bcrypt_password_limit(user.password)
        except ValueError:
            raise HTTPException(status_code=400, detail="비밀번호는 UTF-8 기준 72바이트 이하여야 합니다.")

        #디비에 들어잇는 암호화된 비번과 내가 입력한 비번 확인
        if not db_user or not verify_password(user.password, db_user.password):
            raise HTTPException(status_code=401, detail="잘못된 이메일 또는 비번이다")
        

        refresh_token=create_refresh_token(db_user.user_id)
        access_token=create_access_token(db_user.user_id)

        #db에 리프레시 토큰 저장
        updated_user=await UserCrud.update_refresh_token_by_id(db, db_user.user_id, refresh_token)
        await db.commit()
        await db.refresh(updated_user)
        return updated_user, access_token, refresh_token 

#1. 이메일+비번 -> 인증
#2. jwt 액세스/리프레시 토큰 발급
#3. 리프레시토큰 db저장
#4. db커밋 후 사용자 객체 최신화
#5. 사용자 정보 + jwt 액세스/리프레시 토큰 반환