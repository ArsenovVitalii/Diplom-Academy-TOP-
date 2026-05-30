from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from ..core.database import get_db
from ..core.security import get_current_user
from ..models.database import CartItem, Course, User
import uuid

router = APIRouter(prefix="/cart", tags=["cart"])


class AddToCartRequest(BaseModel):
    course_id: str


@router.get("")
def get_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id_str = str(current_user.id)
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id_str).all()
    
    result = []
    for item in cart_items:
        course = db.query(Course).filter(Course.id == item.course_id).first()
        result.append({
            "id": item.id,
            "course_id": item.course_id,
            "added_at": item.added_at.isoformat() if item.added_at else None,
            "course": {
                "id": course.id,
                "title": course.title,
                "description": course.description,
                "price": course.price,
                "image_url": course.image_url
            } if course else None
        })
    
    return result


@router.post("")
def add_to_cart(
    request: AddToCartRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id_str = str(current_user.id)
    print(f"DEBUG API: Adding to cart for user_id={user_id_str}, course_id={request.course_id}")
    
    course = db.query(Course).filter(Course.id == request.course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    existing_item = db.query(CartItem).filter(
        CartItem.user_id == user_id_str,
        CartItem.course_id == request.course_id
    ).first()
    
    if existing_item:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Course already in cart"
        )
    
    cart_item = CartItem(
        id=str(uuid.uuid4()),
        user_id=user_id_str,
        course_id=request.course_id
    )
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    
    return {
        "id": cart_item.id,
        "course_id": cart_item.course_id,
        "added_at": cart_item.added_at.isoformat() if cart_item.added_at else None,
        "course": {
            "id": course.id,
            "title": course.title,
            "description": course.description,
            "price": course.price,
            "image_url": course.image_url
        }
    }


@router.delete("/{course_id}")
def remove_from_cart(
    course_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id_str = str(current_user.id)
    
    cart_item = db.query(CartItem).filter(
        CartItem.user_id == user_id_str,
        CartItem.course_id == course_id
    ).first()
    
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not in cart"
        )
    
    db.delete(cart_item)
    db.commit()
    return {"message": "Item removed from cart"}


@router.delete("")
def clear_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id_str = str(current_user.id)
    db.query(CartItem).filter(CartItem.user_id == user_id_str).delete()
    db.commit()
    return {"message": "Cart cleared"}