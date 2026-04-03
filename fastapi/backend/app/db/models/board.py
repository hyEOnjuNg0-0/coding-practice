from app.db.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from sqlalchemy import String, TIMESTAMP, func, ForeignKey
from typing import Optional
from .users import User

class Board(Base):
    __tablename__="boards"
    board_id:Mapped[int]=mapped_column(primary_key=True, index=True)
    title:Mapped[str]=mapped_column(String(255), nullable=False)
    description:Mapped[Optional[str]]=mapped_column(String(500), nullable=True)
    category:Mapped[str]=mapped_column(String(255), nullable=False, default="it")
    user_id:Mapped[int]=mapped_column(ForeignKey("users.user_id"),nullable=False)
    created_at:Mapped[datetime]=mapped_column(
        TIMESTAMP, server_default=func.now(), nullable=False
    )

    user:Mapped["User"]= relationship("User", back_populates="boards")





