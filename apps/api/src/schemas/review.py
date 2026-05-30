from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime


class ReviewBase(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    text: str = Field(..., min_length=10, max_length=1000)

    @field_validator('text')
    @classmethod
    def validate_text(cls, v):
        if len(v) < 10:
            raise ValueError('Текст отзыва должен быть не менее 10 символов')
        return v


class ReviewCreate(ReviewBase):
    course_id: str


class ReviewResponse(ReviewBase):
    id: str
    course_id: str
    user_id: str
    created_at: datetime

    class Config:
        from_attributes = True


class ReviewWithUser(ReviewResponse):
    user_name: str
    user_avatar_url: Optional[str] = None
