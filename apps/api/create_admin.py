from src.core.database import SessionLocal
from src.models.database import User
from src.core.security import get_password_hash

db = SessionLocal()

admin = db.query(User).filter(User.email == 'admin@example.com').first()

if not admin:
    admin = User(
        id=str(hash('admin@example.com')),
        email='admin@example.com',
        password_hash=get_password_hash('admin123'),
        role='admin'
    )
    db.add(admin)
    print('Admin created!')
else:
    admin.role = 'admin'
    print('Role updated to admin!')

db.commit()
db.close()
print('')
print('Email: admin@example.com')
print('Password: admin123')