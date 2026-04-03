from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models import Board
from app.db.scheme.boards import BoardCreate

class BoardCrud:
    #select *from Board
    @staticmethod
    async def get_all(db:AsyncSession):
        result=select(Board)
        result2=await db.execute(result)
        return result2.scalars().all()
    
    #매개변수에 user_id도 넣기
    #{"title":"제목","description":"내용","user_id":1}
    @staticmethod
    async def create(db:AsyncSession, board_data:BoardCreate, user_id:int) -> Board:
        board_dict=board_data.model_dump()
        board_dict["user_id"]=user_id
        new_board=Board(**board_dict)
        db.add(new_board)
        await db.flush()
        return new_board
    



