from src.core.database import SessionLocal
from src.models.database import User
from src.core.security import get_password_hash
import os
from dotenv import load_dotenv
from pathlib import Path

# Загружаем переменные окружения из папки api
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

# Читаем настройки из .env
admin_email = os.getenv('ADMIN_EMAIL', 'admin@example.com')
admin_password = os.getenv('ADMIN_PASSWORD', 'admin123')

db = SessionLocal()

admin = db.query(User).filter(User.email == admin_email).first()

if not admin:
    admin = User(
        id=str(hash(admin_email)),
        email=admin_email,
        password_hash=get_password_hash(admin_password),
        role='admin'
    )
    db.add(admin)
    print('Admin created!')
else:
    # Обновляем пароль, если он изменился в .env
    admin.role = 'admin'
    admin.password_hash = get_password_hash(admin_password)
    print('Admin credentials updated!')

db.commit()
db.close()
print('')
print(f'Email: {admin_email}')
print(f'Password: {admin_password}')