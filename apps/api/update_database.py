"""
Скрипт для обновления базы данных (создание таблиц и новых полей)
Запускается один раз после изменений в моделях
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from sqlalchemy import inspect
from src.core.database import engine, SessionLocal
from src.models.database import Review, Course, User, UserProfile

def check_and_create_tables():
    """Проверяет наличие таблиц и создаёт их при необходимости"""
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    
    print(f"Текущие таблицы: {tables}")
    
    # Проверяем таблицу reviews
    if 'reviews' not in tables:
        print("Таблица 'reviews' не найдена. Создаю...")
        Review.__table__.create(engine)
        print("Таблица 'reviews' успешно создана!")
    else:
        print("Таблица 'reviews' уже существует.")
    
    # Проверяем таблицу user_profiles
    if 'user_profiles' not in tables:
        print("Таблица 'user_profiles' не найдена. Создаю...")
        UserProfile.__table__.create(engine)
        print("Таблица 'user_profiles' успешно создана!")
    else:
        print("Таблица 'user_profiles' уже существует.")
    
    # Проверяем новые поля в таблице users
    if 'users' in tables:
        user_columns = [col['name'] for col in inspector.get_columns('users')]
        
        # Проверяем is_verified
        if 'is_verified' not in user_columns:
            print("Поле 'is_verified' не найдено. Добавляю...")
            from sqlalchemy import text
            with engine.connect() as conn:
                conn.execute(text("ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE"))
                conn.commit()
            print("Поле 'is_verified' успешно добавлено!")
        else:
            print("Поле 'is_verified' уже существует.")
        
        # Проверяем verification_code
        if 'verification_code' not in user_columns:
            print("Поле 'verification_code' не найдено. Добавляю...")
            from sqlalchemy import text
            with engine.connect() as conn:
                conn.execute(text("ALTER TABLE users ADD COLUMN verification_code VARCHAR(6)"))
                conn.commit()
            print("Поле 'verification_code' успешно добавлено!")
        else:
            print("Поле 'verification_code' уже существует.")
        
        # Проверяем code_expires_at
        if 'code_expires_at' not in user_columns:
            print("Поле 'code_expires_at' не найдено. Добавляю...")
            from sqlalchemy import text
            with engine.connect() as conn:
                conn.execute(text("ALTER TABLE users ADD COLUMN code_expires_at DATETIME"))
                conn.commit()
            print("Поле 'code_expires_at' успешно добавлено!")
        else:
            print("Поле 'code_expires_at' уже существует.")
    
    print("\nГотово!")
    print("\nНовые поля добавлены в модель User:")
    print("- is_verified (Boolean)")
    print("- verification_code (String 6)")
    print("- code_expires_at (DateTime)")

if __name__ == "__main__":
    check_and_create_tables()
