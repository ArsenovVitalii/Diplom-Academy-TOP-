from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.database import UserProfile

router = APIRouter(prefix="/public-users", tags=["public-users"])

@router.get("/profile")
def get_public_profile(
    db: Session = Depends(get_db),
    user_id: str = None
):
    if not user_id:
        return {"error": "user_id required"}
    
    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    
    if not profile:
        return {"user_id": user_id, "name": "", "phone": "", "avatar_url": ""}
    
    return {
        "user_id": user_id,
        "name": profile.name,
        "phone": profile.phone,
        "avatar_url": profile.avatar_url
    }