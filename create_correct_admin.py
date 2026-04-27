from src.core.database import SessionLocal
from src.models.database import User, UserRole
from passlib.context import CryptContext
import uuid

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

db = SessionLocal()

# Удаляем старого админа
db.query(User).filter(User.email == "admin@top-academy.ru").delete()

# Создаём нового с правильным хешем
admin = User(
    id=str(uuid.uuid4()),
    email="admin@top-academy.ru",
    password_hash=pwd_context.hash("admin123"),
    role=UserRole.ADMIN
)
db.add(admin)
db.commit()

print("✅ Admin created successfully!")
print("   Email: admin@top-academy.ru")
print("   Password: admin123")
print(f"   Hash: {admin.password_hash}")

# Проверяем, что пароль подходит
test_hash = pwd_context.hash("admin123")
print(f"   Test hash: {test_hash}")

db.close()