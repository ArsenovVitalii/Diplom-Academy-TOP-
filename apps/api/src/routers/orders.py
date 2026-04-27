from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import uuid
from ..core.database import get_db
from ..core.security import get_current_user
from ..models.database import CartItem, Course, Order, OrderItem, OrderStatus, User
from ..schemas.order import OrderResponse, OrderCreate

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("", response_model=List[OrderResponse])
def get_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    orders = db.query(Order).filter(Order.user_id == current_user.id).all()
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(
        Order.id == order_id,
        Order.user_id == current_user.id
    ).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    return order


@router.post("", response_model=OrderResponse)
def create_order(
    order_data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    
    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cart is empty"
        )
    
    total_amount = 0
    order_items = []
    
    for cart_item in cart_items:
        course = db.query(Course).filter(Course.id == cart_item.course_id).first()
        if course:
            total_amount += course.price
            order_items.append({
                "course": course,
                "price": course.price
            })
    
    # Генерируем уникальный ID заказа
    order_id = str(uuid.uuid4())
    
    order = Order(
        id=order_id,
        user_id=current_user.id,
        total_amount=total_amount,
        status=OrderStatus.PENDING,  # Используем PENDING вместо PAID
        customer_name=order_data.customer_name,
        phone=order_data.phone,
        address=order_data.address
    )
    db.add(order)
    db.flush()
    
    for item in order_items:
        # Генерируем уникальный ID для позиции заказа
        order_item_id = str(uuid.uuid4())
        order_item = OrderItem(
            id=order_item_id,
            order_id=order.id,
            course_id=item["course"].id,
            price_at_purchase=item["price"]
        )
        db.add(order_item)
    
    # Очищаем корзину
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    
    db.commit()
    db.refresh(order)
    return order