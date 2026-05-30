from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from pydantic import BaseModel
from ..core.database import get_db
from ..core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    get_current_user,
    generate_verification_code,
    send_verification_email
)
from ..core.config import settings
from ..models.database import User
from ..schemas.auth import (
    UserCreate, 
    UserResponse, 
    TokenResponse, 
    VerificationCodeRequest,
    ResendCodeRequest
)

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginJSON(BaseModel):
    username: str
    password: str


@router.post("/register", response_model=TokenResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Генерируем код подтверждения
    verification_code = generate_verification_code()
    code_expires_at = datetime.utcnow() + timedelta(minutes=10)
    
    # Отправляем код на email
    send_verification_email(user_data.email, verification_code)

    if user_data.email == "admin@top-academy.ru":
        role = "admin"
    else:
        role = "customer"

    user = User(
        id=str(hash(user_data.email)),
        email=user_data.email,
        password_hash=get_password_hash(user_data.password),
        role=role,
        is_verified=False,
        verification_code=verification_code,
        code_expires_at=code_expires_at
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Возвращаем токен (пользователь ещё не подтверждён, но может войти для тестирования)
    # В продакшене лучше не выдавать токен до подтверждения
    access_token = create_access_token(
        data={"sub": user.id},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=user.id,
            email=user.email,
            role=user.role.value if hasattr(user.role, 'value') else str(user.role),
            created_at=user.created_at
        )
    )


@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": user.id},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=user.id,
            email=user.email,
            role=user.role.value if hasattr(user.role, 'value') else str(user.role),
            created_at=user.created_at
        )
    )


@router.post("/login/json", response_model=TokenResponse)
def login_json(login_data: LoginJSON, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.username).first()
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": user.id},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=user.id,
            email=user.email,
            role=user.role.value if hasattr(user.role, 'value') else str(user.role),
            created_at=user.created_at
        )
    )


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        role=current_user.role.value if hasattr(current_user.role, 'value') else str(current_user.role),
        created_at=current_user.created_at
    )


@router.post("/verify")
def verify_email(
    verify_data: VerificationCodeRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == verify_data.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already verified"
        )
    
    # Проверяем, не истёк ли срок действия кода
    if not user.code_expires_at or datetime.utcnow() > user.code_expires_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Verification code has expired. Please request a new one."
        )
    
    # Проверяем код
    if user.verification_code != verify_data.verification_code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid verification code"
        )
    
    # Подтверждаем email
    user.is_verified = True
    user.verification_code = None
    user.code_expires_at = None
    db.commit()
    
    return {"detail": "Email successfully verified", "verified": True}


@router.post("/resend-code")
def resend_code(
    resend_data: ResendCodeRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == resend_data.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already verified"
        )
    
    # Генерируем новый код
    verification_code = generate_verification_code()
    code_expires_at = datetime.utcnow() + timedelta(minutes=10)
    
    # Отправляем код на email
    send_verification_email(resend_data.email, verification_code)
    
    # Обновляем код в БД
    user.verification_code = verification_code
    user.code_expires_at = code_expires_at
    db.commit()
    
    return {"detail": "New verification code sent"}