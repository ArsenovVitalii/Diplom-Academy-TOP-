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
    user_id_str = str(current_user.id)
    print(f"DEBUG API: Getting orders for user_id={user_id_str}, email={current_user.email}, role={getattr(current_user, 'role', 'unknown')}")
    
    if hasattr(current_user, 'role') and current_user.role == "admin":
        orders = db.query(Order).all()
    else:
        orders = db.query(Order).filter(Order.user_id == user_id_str).all()
    
    print(f"DEBUG API: Found {len(orders)} orders")
    
    result_orders = []
    for order in orders:
        order_items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        items_list = []
        for item in order_items:
            course = db.query(Course).filter(Course.id == item.course_id).first()
            items_list.append({
                "id": item.id,
                "course_id": item.course_id,
                "price_at_purchase": item.price_at_purchase,
                "course": {
                    "id": course.id,
                    "title": course.title,
                    "price": course.price
                } if course else None
            })
        
        order_dict = {
            "id": order.id,
            "user_id": order.user_id,
            "total_amount": order.total_amount,
            "status": order.status.value if hasattr(order.status, 'value') else str(order.status),
            "customer_name": order.customer_name,
            "phone": order.phone,
            "address": order.address,
            "created_at": order.created_at.isoformat() if order.created_at else None,
            "items": items_list
        }
        result_orders.append(order_dict)
    
    return result_orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id_str = str(current_user.id)
    
    if hasattr(current_user, 'role') and current_user.role == "admin":
        order = db.query(Order).filter(Order.id == order_id).first()
    else:
        order = db.query(Order).filter(
            Order.id == order_id,
            Order.user_id == user_id_str
        ).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    order_items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
    items_list = []
    for item in order_items:
        course = db.query(Course).filter(Course.id == item.course_id).first()
        items_list.append({
            "id": item.id,
            "course_id": item.course_id,
            "price_at_purchase": item.price_at_purchase,
            "course": {
                "id": course.id,
                "title": course.title,
                "price": course.price
            } if course else None
        })
    
    return {
        "id": order.id,
        "user_id": order.user_id,
        "total_amount": order.total_amount,
        "status": order.status.value if hasattr(order.status, 'value') else str(order.status),
        "customer_name": order.customer_name,
        "phone": order.phone,
        "address": order.address,
        "created_at": order.created_at.isoformat() if order.created_at else None,
        "items": items_list
    }


@router.post("", response_model=OrderResponse)
def create_order(
    order_data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id_str = str(current_user.id)
    print(f"DEBUG API: Creating order for user_id={user_id_str}, email={current_user.email}")
    
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id_str).all()
    print(f"DEBUG API: Found {len(cart_items)} cart items for user_id={user_id_str}")
    
    if not cart_items:
        cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
        print(f"DEBUG API: Fallback search found {len(cart_items)} cart items")
    
    if not cart_items:
        print(f"DEBUG API: Cart is empty for user_id={user_id_str}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cart is empty. Please add courses to cart first."
        )
    
    total_amount = 0
    order_items_list = []
    
    for cart_item in cart_items:
        course = db.query(Course).filter(Course.id == cart_item.course_id).first()
        if course:
            total_amount += course.price
            order_items_list.append({
                "course": course,
                "price": course.price
            })
    
    order_id = str(uuid.uuid4())
    
    order = Order(
        id=order_id,
        user_id=user_id_str,
        total_amount=total_amount,
        status=OrderStatus.PENDING,
        customer_name=order_data.customer_name,
        phone=order_data.phone,
        address=order_data.address
    )
    db.add(order)
    db.flush()
    
    for item in order_items_list:
        order_item_id = str(uuid.uuid4())
        order_item = OrderItem(
            id=order_item_id,
            order_id=order.id,
            course_id=item["course"].id,
            price_at_purchase=item["price"]
        )
        db.add(order_item)
    
    db.query(CartItem).filter(CartItem.user_id == user_id_str).delete()
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    
    db.commit()
    db.refresh(order)
    
    order_items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
    items_list = []
    for item in order_items:
        course = db.query(Course).filter(Course.id == item.course_id).first()
        items_list.append({
            "id": item.id,
            "course_id": item.course_id,
            "price_at_purchase": item.price_at_purchase,
            "course": {
                "id": course.id,
                "title": course.title,
                "price": course.price
            } if course else None
        })
    
    return {
        "id": order.id,
        "user_id": order.user_id,
        "total_amount": order.total_amount,
        "status": order.status.value if hasattr(order.status, 'value') else str(order.status),
        "customer_name": order.customer_name,
        "phone": order.phone,
        "address": order.address,
        "created_at": order.created_at.isoformat() if order.created_at else None,
        "items": items_list
    }


@router.patch("/{order_id}/status")
def update_order_status(
    order_id: str,
    status_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not hasattr(current_user, 'role') or current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    new_status = status_data.get("status")
    if new_status not in ["pending", "paid", "cancelled"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status"
        )
    
    order.status = new_status
    db.commit()
    
    return {"message": "Status updated", "status": new_status}