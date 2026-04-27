from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class HeroSettingsResponse(BaseModel):
    id: int
    slogan: str
    subtitle: str
    cta_text: str
    image_url: str
    updated_at: datetime

    class Config:
        from_attributes = True


class HeroSettingsUpdate(BaseModel):
    slogan: Optional[str] = None
    subtitle: Optional[str] = None
    cta_text: Optional[str] = None
    image_url: Optional[str] = None


class UserProfileResponse(BaseModel):
    id: str
    user_id: str
    name: str
    phone: str

    class Config:
        from_attributes = True


class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
