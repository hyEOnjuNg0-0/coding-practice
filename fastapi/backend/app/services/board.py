from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import Board
from app.db.scheme.boards import BoardCreate, BoardRead
from app.db.crud import BoardCrud
from sqlalchemy import select, desc

class BoardService:
    @staticmethod
    async def get_all(db:AsyncSession):
        query=select(Board).order_by(Board.board_id.desc())

        result=await db.execute(query)
        return result.scalars().all()
    

    @staticmethod
    async def create(db:AsyncSession, user_id:int, board_data:BoardCreate) -> Board:
        try:
            db_board=await BoardCrud.create(db, board_data, user_id)
            await db.commit()
            await db.refresh(db_board)
            return db_board
        except Exception:
            await db.rollback()
            raise
        
    

    

    



