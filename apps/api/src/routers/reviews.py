from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
import uuid

from ..core.database import get_db
from ..models.database import Review, User, Course, UserProfile
from ..schemas.review import ReviewCreate, ReviewResponse, ReviewWithUser
from ..core.security import get_current_user
from ..models.database import UserRole

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.post("", response_model=ReviewWithUser, status_code=status.HTTP_201_CREATED)
def create_review(
    review_data: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if course exists
    course = db.query(Course).filter(Course.id == review_data.course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Create review
    review = Review(
        id=str(uuid.uuid4()),
        course_id=review_data.course_id,
        user_id=current_user.id,
        rating=review_data.rating,
        text=review_data.text
    )
    
    db.add(review)
    db.commit()
    db.refresh(review)
    
    # Get user profile for name and avatar
    user_profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    user_name = user_profile.name if user_profile else current_user.email.split('@')[0]
    user_avatar_url = user_profile.avatar_url if user_profile else None
    
    return ReviewWithUser(
        id=review.id,
        course_id=review.course_id,
        user_id=review.user_id,
        rating=review.rating,
        text=review.text,
        created_at=review.created_at,
        user_name=user_name,
        user_avatar_url=user_avatar_url
    )


@router.get("/course/{course_id}", response_model=List[ReviewWithUser])
def get_course_reviews(
    course_id: str,
    db: Session = Depends(get_db)
):
    # Загружаем отзывы с явной подгрузкой пользователя
    reviews = db.query(Review).filter(Review.course_id == course_id).order_by(Review.created_at.desc()).all()
    
    result = []
    for review in reviews:
        # Получаем пользователя отдельно, так как связь может быть не настроена
        user = db.query(User).filter(User.id == review.user_id).first()
        user_profile = db.query(UserProfile).filter(UserProfile.user_id == review.user_id).first()
        
        user_name = user_profile.name if user_profile and user_profile.name else (user.email.split('@')[0] if user else "Пользователь")
        user_avatar_url = user_profile.avatar_url if user_profile else None
        
        # Если avatar_url есть, но не полный URL — добавляем http://localhost:8000
        if user_avatar_url and not user_avatar_url.startswith('http'):
            user_avatar_url = f"http://localhost:8000{user_avatar_url}"
        
        result.append(ReviewWithUser(
            id=review.id,
            course_id=review.course_id,
            user_id=review.user_id,
            rating=review.rating,
            text=review.text,
            created_at=review.created_at,
            user_name=user_name,
            user_avatar_url=user_avatar_url
        ))
    
    return result


@router.get("/course/{course_id}/average")
def get_course_average_rating(
    course_id: str,
    db: Session = Depends(get_db)
):
    result = db.query(func.avg(Review.rating), func.count(Review.id)).filter(Review.course_id == course_id).first()
    
    if result[0] is None:
        return {"average_rating": 0, "review_count": 0}
    
    return {
        "average_rating": round(result[0], 1),
        "review_count": result[1]
    }


@router.delete("/{review_id}")
def delete_review(
    review_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    review = db.query(Review).filter(Review.id == review_id).first()
    
    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found"
        )
    
    # Only author or admin can delete
    if review.user_id != current_user.id and current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this review"
        )
    
    db.delete(review)
    db.commit()
    
    return {"message": "Review deleted successfully"}


@router.get("/admin", response_model=List[ReviewWithUser])
def get_all_reviews(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    reviews = db.query(Review).order_by(Review.created_at.desc()).all()
    
    result = []
    for review in reviews:
        user_profile = db.query(UserProfile).filter(UserProfile.user_id == review.user_id).first()
        user = db.query(User).filter(User.id == review.user_id).first()
        user_name = user_profile.name if user_profile else (user.email.split('@')[0] if user else "Пользователь")
        user_avatar_url = user_profile.avatar_url if user_profile else None
        
        # Если avatar_url есть, но не полный URL — добавляем http://localhost:8000
        if user_avatar_url and not user_avatar_url.startswith('http'):
            user_avatar_url = f"http://localhost:8000{user_avatar_url}"
        
        result.append(ReviewWithUser(
            id=review.id,
            course_id=review.course_id,
            user_id=review.user_id,
            rating=review.rating,
            text=review.text,
            created_at=review.created_at,
            user_name=user_name,
            user_avatar_url=user_avatar_url
        ))
    
    return result