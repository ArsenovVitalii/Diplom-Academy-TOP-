from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import random
from ..core.database import get_db
from ..core.security import get_current_admin, get_current_user
from ..models.database import Course, User, CartItem, OrderItem, Review
from ..schemas.course import CourseCreate, CourseUpdate, CourseResponse

router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("", response_model=List[CourseResponse])
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).all()
    return courses


@router.get("/random/recommendations", response_model=List[CourseResponse])
def get_random_recommendations(
    limit: int = 3,
    exclude_ids: List[str] = [],
    db: Session = Depends(get_db)
):
    """Get random courses for recommendations, optionally excluding specified course IDs"""
    query = db.query(Course)
    if exclude_ids:
        query = query.filter(~Course.id.in_(exclude_ids))
    
    all_courses = query.all()
    
    if len(all_courses) <= limit:
        return all_courses
    
    selected = random.sample(all_courses, limit)
    return selected


@router.get("/{course_id}", response_model=CourseResponse)
def get_course(course_id: str, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    return course


@router.post("", response_model=CourseResponse)
def create_course(
    course_data: CourseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    course = Course(
        id=str(hash(course_data.title + str(course_data.price))),
        title=course_data.title,
        description=course_data.description,
        price=course_data.price,
        image_url=course_data.image_url or "",
        duration=course_data.duration or "12 месяцев",
        age_badge=course_data.age_badge or "16+"
    )
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@router.put("/{course_id}", response_model=CourseResponse)
def update_course(
    course_id: str,
    course_data: CourseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    if course_data.title is not None:
        course.title = course_data.title
    if course_data.description is not None:
        course.description = course_data.description
    if course_data.price is not None:
        course.price = course_data.price
    if course_data.image_url is not None:
        course.image_url = course_data.image_url
    if course_data.duration is not None:
        course.duration = course_data.duration
    if course_data.age_badge is not None:
        course.age_badge = course_data.age_badge
    
    db.commit()
    db.refresh(course)
    return course


@router.delete("/{course_id}")
def delete_course(
    course_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    db.query(CartItem).filter(CartItem.course_id == course_id).delete()
    db.query(OrderItem).filter(OrderItem.course_id == course_id).delete()
    db.query(Review).filter(Review.course_id == course_id).delete()

    db.delete(course)
    db.commit()
    return {"message": "Course deleted"}
