from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CourseCreate(BaseModel):
    title: str
    description: str
    price: int
    image_url: Optional[str] = ""
    duration: Optional[str] = "12 месяцев"
    age_badge: Optional[str] = "16+"


class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    image_url: Optional[str] = None
    duration: Optional[str] = None
    age_badge: Optional[str] = None


class CourseResponse(BaseModel):
    id: str
    title: str
    description: str
    price: int
    image_url: str
    duration: str
    age_badge: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
