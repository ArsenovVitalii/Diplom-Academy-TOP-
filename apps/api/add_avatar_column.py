from src.core.database import engine
from sqlalchemy import text

with engine.connect() as conn:
    try:
        conn.execute(text("ALTER TABLE user_profiles ADD COLUMN avatar_url VARCHAR(500) DEFAULT ''"))
        conn.commit()
        print("✅ Колонка avatar_url успешно добавлена в таблицу user_profiles")
    except Exception as e:
        print(f"Ошибка: {e}")
        print("Возможно, колонка уже существует")