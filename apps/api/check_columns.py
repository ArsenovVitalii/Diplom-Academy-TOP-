from src.core.database import engine
from sqlalchemy import text

with engine.connect() as conn:
    result = conn.execute(text("PRAGMA table_info(user_profiles)"))
    columns = [row[1] for row in result]
    print("Колонки в таблице user_profiles:")
    for col in columns:
        print(f"  - {col}")
    
    if 'avatar_url' in columns:
        print("\n✅ avatar_url есть в таблице")
    else:
        print("\n❌ avatar_url ОТСУТСТВУЕТ в таблице")