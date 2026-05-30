from src.core.database import engine
from sqlalchemy import text

def check_and_add_column():
    try:
        with engine.connect() as conn:
            # Проверяем, есть ли колонка avatar_url
            result = conn.execute(text("PRAGMA table_info(user_profiles)"))
            columns = [row[1] for row in result]
            
            if 'avatar_url' in columns:
                print("✅ Колонка avatar_url уже существует")
            else:
                # Добавляем колонку
                conn.execute(text("ALTER TABLE user_profiles ADD COLUMN avatar_url VARCHAR(500) DEFAULT ''"))
                conn.commit()
                print("✅ Колонка avatar_url успешно добавлена")
    except Exception as e:
        print(f"Ошибка: {e}")

if __name__ == "__main__":
    check_and_add_column()