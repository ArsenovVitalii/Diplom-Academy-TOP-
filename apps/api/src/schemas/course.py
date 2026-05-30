from pydantic import BaseModel, field_validator, Field
from datetime import datetime
from typing import Optional


class CourseCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=10, max_length=2000)
    price: int = Field(..., gt=0, description="Цена должна быть больше 0")
    image_url: Optional[str] = ""
    duration: Optional[str] = "12 месяцев"
    age_badge: Optional[str] = "16+"

    @field_validator('title')
    @classmethod
    def validate_title(cls, v):
        if len(v) < 3:
            raise ValueError('Название курса должно быть не менее 3 символов')
        return v

    @field_validator('description')
    @classmethod
    def validate_description(cls, v):
        if len(v) < 10:
            raise ValueError('Описание курса должно быть не менее 10 символов')
        return v

    @field_validator('price')
    @classmethod
    def validate_price(cls, v):
        if v <= 0:
            raise ValueError('Цена должна быть больше 0')
        return v


class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    image_url: Optional[str] = None
    duration: Optional[str] = None
    age_badge: Optional[str] = None

    @field_validator('title')
    @classmethod
    def validate_title(cls, v):
        if v is not None and len(v) < 3:
            raise ValueError('Название курса должно быть не менее 3 символов')
        return v

    @field_validator('description')
    @classmethod
    def validate_description(cls, v):
        if v is not None and len(v) < 10:
            raise ValueError('Описание курса должно быть не менее 10 символов')
        return v

    @field_validator('price')
    @classmethod
    def validate_price(cls, v):
        if v is not None and v <= 0:
            raise ValueError('Цена должна быть больше 0')
        return v


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
