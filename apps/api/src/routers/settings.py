from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..core.security import get_current_admin
from ..models.database import HeroSettings, User
from ..schemas.settings import HeroSettingsResponse, HeroSettingsUpdate

router = APIRouter(prefix="/settings", tags=["settings"])


def get_or_create_hero_settings(db: Session) -> HeroSettings:
    settings = db.query(HeroSettings).first()
    if not settings:
        settings = HeroSettings(
            slogan="TOP IT SCHOOL",
            subtitle="Школа с углубленным изучением IT для будущих профессионалов",
            cta_text="Смотреть курсы",
            image_url=""
        )
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


@router.get("/hero", response_model=HeroSettingsResponse)
def get_hero_settings(db: Session = Depends(get_db)):
    return get_or_create_hero_settings(db)


@router.put("/hero", response_model=HeroSettingsResponse)
def update_hero_settings(
    settings_data: HeroSettingsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    settings = get_or_create_hero_settings(db)
    
    if settings_data.slogan is not None:
        settings.slogan = settings_data.slogan
    if settings_data.subtitle is not None:
        settings.subtitle = settings_data.subtitle
    if settings_data.cta_text is not None:
        settings.cta_text = settings_data.cta_text
    if settings_data.image_url is not None:
        settings.image_url = settings_data.image_url
    
    db.commit()
    db.refresh(settings)
    return settings
