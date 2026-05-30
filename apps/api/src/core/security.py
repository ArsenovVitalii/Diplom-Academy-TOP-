from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from .config import settings
from .database import get_db
from ..models.database import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")


def truncate_password(password: str, max_bytes: int = 72) -> str:
    """Усекает пароль до указанного количества байт (для bcrypt)"""
    password_bytes = password.encode('utf-8')[:max_bytes]
    return password_bytes.decode('utf-8', errors='ignore')


def get_password_hash(password: str) -> str:
    truncated = truncate_password(password)
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(truncated.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    truncated = truncate_password(plain_password)
    return bcrypt.checkpw(
        truncated.encode('utf-8'),
        hashed_password.encode('utf-8')
    )


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_token(token)
    if payload is None:
        print("DEBUG API: Token decode failed")
        raise credentials_exception
    user_id: str = payload.get("sub")
    print(f"DEBUG API: Token decoded, user_id={user_id}")
    if user_id is None:
        raise credentials_exception
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        print(f"DEBUG API: User not found for user_id={user_id}")
        raise credentials_exception
    print(f"DEBUG API: User authenticated: {user.email}, id={user.id}")
    return user


async def get_current_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user


def generate_verification_code() -> str:
    """Генерирует 6-значный код подтверждения"""
    return str(random.randint(100000, 999999))


def send_verification_email(email: str, code: str) -> bool:
    """
    Отправляет email с кодом подтверждения.
    Если SMTP настроен — отправляет реально, иначе — в консоль.
    """
    # Проверяем, настроен ли SMTP
    if not settings.SMTP_HOST or not settings.SMTP_USER:
        # В разработке: выводим код в консоль
        print("=" * 50)
        print(f"📧 EMAIL VERIFICATION CODE (DEV MODE)")
        print(f"To: {email}")
        print(f"Code: {code}")
        print("⚠️ SMTP не настроен. Настройте .env для реальной отправки.")
        print("=" * 50)
        return True
    
    # Реальная отправка через SMTP
    try:
        msg = MIMEMultipart()
        msg['From'] = settings.SMTP_FROM_EMAIL
        msg['To'] = email
        msg['Subject'] = 'Код подтверждения регистрации'
        
        body = f"""
Здравствуйте!

Ваш код подтверждения: {code}

Введите этот код на странице регистрации.
Код действителен в течение 10 минут.

С уважением,
Top Academy
"""
        msg.attach(MIMEText(body, 'plain'))
        
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
        
        print(f"✅ Email успешно отправлен на {email}")
        return True
    except Exception as e:
        print(f"❌ Error sending email to {email}: {e}")
        return False