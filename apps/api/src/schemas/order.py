from pydantic import BaseModel
from typing import List, Optional

class OrderItemResponse(BaseModel):
    id: str
    order_id: Optional[str] = None
    course_id: str
    price_at_purchase: float
    added_at: Optional[str] = None
    course: Optional[dict] = None

class OrderResponse(BaseModel):
    id: str
    user_id: str
    total_amount: float
    status: str
    customer_name: str
    phone: str
    address: Optional[str] = None
    created_at: Optional[str] = None
    items: List[OrderItemResponse] = []

class OrderCreate(BaseModel):
    customer_name: str
    phone: str
    address: Optional[str] = None

# Для совместимости с cart.py
CartItemResponse = OrderItemResponse