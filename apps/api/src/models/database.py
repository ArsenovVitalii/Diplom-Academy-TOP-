from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from ..core.database import Base


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    CUSTOMER = "customer"


class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    CANCELLED = "cancelled"


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.CUSTOMER, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    cart_items = relationship("CartItem", back_populates="user", cascade="all, delete-orphan")
    orders = relationship("Order", back_populates="user", cascade="all, delete-orphan")


class Course(Base):
    __tablename__ = "courses"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Integer, nullable=False, default=15000)
    image_url = Column(String, default="")
    duration = Column(String, default="12 месяцев")
    age_badge = Column(String, default="16+")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    cart_items = relationship("CartItem", back_populates="course")
    order_items = relationship("OrderItem", back_populates="course")


class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    added_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="cart_items")
    course = relationship("Course", back_populates="cart_items")


class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    total_amount = Column(Float, nullable=False)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    customer_name = Column(String, default="", nullable=False)
    phone = Column(String, default="", nullable=False)
    address = Column(String, default="", nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String, primary_key=True, index=True)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    price_at_purchase = Column(Float, nullable=False)
    added_at = Column(DateTime, default=datetime.utcnow)  # ← ДОБАВЛЕНО ПОЛЕ

    order = relationship("Order", back_populates="items")
    course = relationship("Course", back_populates="order_items")


class HeroSettings(Base):
    __tablename__ = "hero_settings"

    id = Column(Integer, primary_key=True, index=True)
    slogan = Column(String, default="TOP IT SCHOOL", nullable=False)
    subtitle = Column(String, default="Школа с углубленным изучением IT для будущих профессионалов", nullable=False)
    cta_text = Column(String, default="Смотреть курсы", nullable=False)
    image_url = Column(String, default="", nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)
    name = Column(String, default="", nullable=False)
    phone = Column(String, default="", nullable=False)

    user = relationship("User", back_populates="profile", uselist=False)


# Add relationship to User model
User.profile = relationship("UserProfile", back_populates="user", uselist=False)