from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from .course import CourseResponse


class CartItemResponse(BaseModel):
    id: str
    course_id: str
    added_at: datetime
    course: CourseResponse

    class Config:
        from_attributes = True


class CartItemCreate(BaseModel):
    course_id: str


class OrderResponse(BaseModel):
    id: str
    user_id: str
    total_amount: float
    status: str
    customer_name: str
    phone: str
    address: Optional[str] = None
    created_at: datetime
    items: List[CartItemResponse]

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    customer_name: str
    phone: str
    address: Optional[str] = None
