from pydantic import BaseModel, Field
from datetime import datetime, timezone
from typing import Annotated

class BoardBase(BaseModel):
    title:str
    description:str|None=None

class BoardCreate(BoardBase):
    pass

class BoardInDB(BoardBase):
    board_id:int
    created_at:datetime
    user_id:int

    class Config:
        from_attributes = True

class BoardRead(BoardInDB):
    pass
