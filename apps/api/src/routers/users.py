print("DEBUG: users.py module LOADED")

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import os
import base64
from uuid import uuid4
from ..core.database import get_db
from ..core.security import get_current_user, get_current_admin
from ..models.database import User, UserProfile, CartItem, Review, Order
from ..schemas.auth import UserResponse, AvatarUpload, ProfileUpdate

router = APIRouter(prefix="/users", tags=["users"])

# Публичный тестовый эндпоинт (без авторизации)
@router.get("/public-test")
def public_test():
    print("DEBUG: public_test CALLED - NO AUTH")
    return {"status": "public endpoint works"}


@router.get("", response_model=List[UserResponse])
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    users = db.query(User).all()
    return [
        UserResponse(
            id=user.id,
            email=user.email,
            role=user.role.value if hasattr(user.role, 'value') else str(user.role),
            created_at=user.created_at
        )
        for user in users
    ]


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.id != user_id and current_user.role.value != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserResponse(
        id=user.id,
        email=user.email,
        role=user.role.value if hasattr(user.role, 'value') else str(user.role),
        created_at=user.created_at
    )


@router.delete("/{user_id}")
def delete_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    if current_user.id == user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete yourself"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Удаляем связанные записи
    db.query(UserProfile).filter(UserProfile.user_id == user_id).delete()
    db.query(CartItem).filter(CartItem.user_id == user_id).delete()
    db.query(Review).filter(Review.user_id == user_id).delete()
    db.query(Order).filter(Order.user_id == user_id).delete()
    
    # Удаляем пользователя
    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}


@router.patch("/profile/avatar")
def upload_avatar(
    avatar_data: AvatarUpload,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    UPLOAD_DIR = "uploads/avatars"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    avatar_base64 = avatar_data.avatar_url
    
    if avatar_base64.startswith('data:image'):
        header, base64_data = avatar_base64.split(',', 1)
        image_format = header.split('/')[1].split(';')[0]
    else:
        base64_data = avatar_base64
        image_format = 'png'
    
    image_data = base64.b64decode(base64_data)
    
    unique_filename = f"{current_user.id}_{uuid4().hex}.{image_format}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as f:
        f.write(image_data)
    
    avatar_url = f"/uploads/avatars/{unique_filename}"
    
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    
    if not profile:
        profile = UserProfile(
            user_id=current_user.id,
            name="",
            phone="",
            avatar_url=avatar_url
        )
        db.add(profile)
    else:
        if profile.avatar_url and profile.avatar_url.startswith("/uploads/"):
            old_file_path = profile.avatar_url.lstrip("/")
            if os.path.exists(old_file_path):
                os.remove(old_file_path)
        profile.avatar_url = avatar_url
    
    db.commit()
    db.refresh(profile)
    
    return {"avatar_url": avatar_url}


@router.get("/profile")
def get_user_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    print("DEBUG: get_user_profile function CALLED")
    print(f"DEBUG: current_user.id = {current_user.id}")
    print(f"DEBUG: current_user.role = {current_user.role}")
    
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    
    if not profile:
        profile = UserProfile(
            user_id=current_user.id,
            name="",
            phone="",
            avatar_url=""
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    
    avatar_url = profile.avatar_url
    if avatar_url and not avatar_url.startswith('http'):
        avatar_url = f"http://localhost:8000{avatar_url}"
    
    return {
        "user_id": current_user.id,
        "email": current_user.email,
        "role": current_user.role.value if hasattr(current_user.role, 'value') else str(current_user.role),
        "name": profile.name,
        "phone": profile.phone,
        "avatar_url": avatar_url
    }


@router.put("/profile")
def update_user_profile(
    profile_data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    
    if not profile:
        profile = UserProfile(
            user_id=current_user.id,
            name=profile_data.name or "",
            phone=profile_data.phone or "",
            avatar_url=profile_data.avatar_url or ""
        )
        db.add(profile)
    else:
        if profile_data.name is not None:
            profile.name = profile_data.name
        if profile_data.phone is not None:
            profile.phone = profile_data.phone
        if profile_data.avatar_url is not None:
            profile.avatar_url = profile_data.avatar_url
    
    db.commit()
    db.refresh(profile)
    
    return {
        "name": profile.name,
        "phone": profile.phone,
        "avatar_url": profile.avatar_url
    }


@router.get("/my-profile")
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    print("DEBUG: get_my_profile CALLED")
    print(f"DEBUG: current_user.id = {current_user.id}")
    
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    
    if not profile:
        profile = UserProfile(
            user_id=current_user.id,
            name="",
            phone="",
            avatar_url=""
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    
    return {
        "user_id": current_user.id,
        "email": current_user.email,
        "role": current_user.role.value if hasattr(current_user.role, 'value') else str(current_user.role),
        "name": profile.name,
        "phone": profile.phone,
        "avatar_url": profile.avatar_url
    }


@router.get("/temp-public")
def temp_public():
    return {"status": "public", "message": "This endpoint is public"}