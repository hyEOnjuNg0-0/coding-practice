import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, async_engine
from fastapi.concurrency import asynccontextmanager
from dotenv import load_dotenv
from app.routers import user
from app.middleware.token_refresh import TokenRefreshMiddleware

load_dotenv(dotenv_path=".env")

#DB연결 후 metadata.create_all -> 모든 테이블 생성 
#종료시에 DB연결 해제 
@asynccontextmanager
async def lifespan(app:FastAPI):
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await async_engine.dispose()


app=FastAPI(lifespan=lifespan)

app.add_middleware(TokenRefreshMiddleware)

app.add_middleware(
    CORSMiddleware,
    # Vite dev port can change (e.g., 3001, 3002) when 3000 is occupied.
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)

if __name__=="__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8081, reload=True)