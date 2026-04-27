"""Standalone seed script to populate the database with initial data."""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from src.core.database import SessionLocal, engine, Base
from src.models.database import Course, HeroSettings

# Create tables
Base.metadata.create_all(bind=engine)


def seed_courses():
    """Seed courses if they don't exist."""
    db = SessionLocal()
    try:
        # Check if courses already exist
        existing = db.query(Course).first()
        if existing:
            print("Courses already seeded.")
            return
        
        courses_data = [
            {
                "id": "1",
                "title": "Программирование на Python",
                "description": "Python + ИИ: сайты и машинное обучение",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+"
            },
            {
                "id": "2",
                "title": "Веб-разработчик с нуля",
                "description": "От фронта до бэка с использованием ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+"
            },
            {
                "id": "3",
                "title": "ИИ для бизнеса",
                "description": "Нейросети для увеличения дохода",
                "price": 10000,
                "duration": "6 месяцев",
                "age_badge": "16+"
            },
            {
                "id": "4",
                "title": "Цифровая грамотность",
                "description": "Базовые навыки работы с нейросетями",
                "price": 5000,
                "duration": "1 месяц",
                "age_badge": "16+"
            },
            {
                "id": "5",
                "title": "JavaScript с ИИ",
                "description": "Разработка на JavaScript с помощью нейросетей",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+"
            },
            {
                "id": "6",
                "title": "Фронтенд-разработчик",
                "description": "Интерфейсы сайтов и приложений с ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+"
            },
            {
                "id": "7",
                "title": "Android-разработчик",
                "description": "Приложения под Android с помощью ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+"
            },
            {
                "id": "8",
                "title": "DevOps-инженер",
                "description": "CI/CD, инфраструктура, Docker с ИИ",
                "price": 20000,
                "duration": "18 месяцев",
                "age_badge": "16+"
            },
            {
                "id": "9",
                "title": "iOS-разработка",
                "description": "Приложения под iPhone с ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+"
            },
            {
                "id": "10",
                "title": "Unity-разработчик",
                "description": "Создание игр в Unity с ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+"
            },
            {
                "id": "11",
                "title": "Бэкенд-разработчик",
                "description": "Серверная логика и API с ИИ",
                "price": 15000,
                "duration": "12 месяцев",
                "age_badge": "16+"
            },
        ]
        
        for course_data in courses_data:
            course = Course(**course_data)
            db.add(course)
        
        db.commit()
        print(f"Seeded {len(courses_data)} courses.")
        
    except Exception as e:
        print(f"Error seeding courses: {e}")
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
    seed_courses()
    seed_hero_settings()
