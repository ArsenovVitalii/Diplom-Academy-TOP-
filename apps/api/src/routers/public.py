from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.database import UserProfile
from ..core.security import get_current_user
from ..models.database import User

router = APIRouter(prefix="/public", tags=["public"])

@router.get("/test")
def test():
    return {"status": "public endpoint works"}

@router.get("/my-profile")
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
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