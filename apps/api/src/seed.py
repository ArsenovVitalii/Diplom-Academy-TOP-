"""Seed script to populate the database with initial data."""
from datetime import datetime
from .core.database import SessionLocal, engine, Base
from .models.database import Course, HeroSettings, User, UserRole

# Create tables
Base.metadata.create_all(bind=engine)


def seed_admin():
    """Create admin user if not exists."""
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.role == UserRole.ADMIN).first()
        if existing:
            print("Admin user already exists.")
            return
        
        # Default admin credentials
        admin = User(
            id="admin-1",
            email="admin@top-academy.ru",
            password_hash="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5ePLF3Sp.c6DO",  # password: admin123
            role=UserRole.ADMIN
        )
        db.add(admin)
        db.commit()
        print("Admin user created: admin@top-academy.ru / admin123")
        
    except Exception as e:
        print(f"Error creating admin: {e}")
        db.rollback()
    finally:
        db.close()


def seed_courses():
    """Seed courses if they don't exist."""
    db = SessionLocal()
    try:
        # Получаем все существующие ID курсов из старой базы
        existing_ids = {
            "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"
        }
        
        # Получаем все курсы из БД
        existing_courses = db.query(Course).filter(Course.id.in_(existing_ids)).all()
        existing_course_ids = {c.id for c in existing_courses}
        
        # Проверяем, нужно ли добавлять курсы
        if len(existing_course_ids) == len(existing_ids):
            print(f"Все {len(existing_ids)} курсов уже существуют.")
            return
        
        courses_data = [
            {
                "id": "2",
                "title": "Веб-разработчик с нуля",
                "description": "От фронта до бэка с использованием ИИ",
                "price": 16000,
                "duration": "12 месяцев",
                "age_badge": "18+",
                "image_url": ""
            },
            {
                "id": "3",
                "title": "ИИ для бизнеса",
                "description": "Нейросети для увеличения дохода",
                "price": 10000,
                "duration": "6 месяцев",
                "age_badge": "16+",
                "image_url": ""
            },
            {
                "id": "4",
                "title": "Цифровая грамотность",
                "description": "Базовые навыки работы с нейросетями",
                "price": 5000,
                "duration": "1 месяц",
                "age_badge": "16+",
                "image_url": ""
            },
            {
                "id": "5",
                "title": "JavaScript с ИИ",
                "description": "Разработка на JavaScript с помощью нейросетей",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+",
                "image_url": ""
            },
            {
                "id": "6",
                "title": "Фронтенд-разработчик",
                "description": "Интерфейсы сайтов и приложений с ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+",
                "image_url": ""
            },
            {
                "id": "7",
                "title": "Android-разработчик",
                "description": "Приложения под Android с помощью ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+",
                "image_url": ""
            },
            {
                "id": "8",
                "title": "DevOps-инженер",
                "description": "CI/CD, инфраструктура, Docker с ИИ",
                "price": 20000,
                "duration": "18 месяцев",
                "age_badge": "16+",
                "image_url": ""
            },
            {
                "id": "9",
                "title": "iOS-разработка",
                "description": "Приложения под iPhone с ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+",
                "image_url": ""
            },
            {
                "id": "10",
                "title": "Unity-разработчик",
                "description": "Создание игр в Unity с ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+",
                "image_url": ""
            },
            {
                "id": "11",
                "title": "Бэкенд-разработчик",
                "description": "Серверная логика и API с ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+",
                "image_url": ""
            },
        ]
        
        added_count = 0
        for course_data in courses_data:
            if course_data["id"] not in existing_course_ids:
                course = Course(**course_data)
                db.add(course)
                added_count += 1
                print(f"  Добавлен курс: {course_data['title']}")
        
        if added_count > 0:
            db.commit()
            print(f"✅ Добавлено курсов: {added_count}")
        else:
            print("Все курсы уже существуют.")
        
    except Exception as e:
        print(f"❌ Error seeding courses: {e}")
        db.rollback()
    finally:
        db.close()


def seed_hero_settings():
    """Seed hero settings if they don't exist."""
    db = SessionLocal()
    try:
        existing = db.query(HeroSettings).first()
        if existing:
            print("Hero settings already exist.")
            return
        
        settings = HeroSettings(
            slogan="TOP IT SCHOOL",
            subtitle="Школа с углубленным изучением IT для будущих профессионалов",
            cta_text="Смотреть курсы",
            image_url=""
        )
        db.add(settings)
        db.commit()
        print("Seeded hero settings.")
        
    except Exception as e:
        print(f"Error seeding hero settings: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_admin()
    seed_courses()
    seed_hero_settings()
