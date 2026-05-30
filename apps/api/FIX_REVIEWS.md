# Исправление ошибки отправки отзывов

## Проблема
Ошибка `Failed to fetch` при отправке отзыва на странице курса.

## Возможные причины и решения

### 1. Таблица reviews отсутствует в базе данных (НАИБОЛЕЕ ВЕРОЯТНО)

**Симптомы:**
- Ошибка 404 или 500 при POST /api/reviews
- SQL error в логах бэкенда

**Решение:**
```bash
# Перейдите в директорию API
cd apps/api

# Запустите скрипт обновления БД
python update_database.py
```

Если Python не найден, установите зависимости и запустите:
```bash
pip install -r requirements.txt
python update_database.py
```

---

### 2. CORS блокирует запрос

**Симптомы:**
- Ошибка CORS в консоли браузера
- Preflight запрос не проходит

**Решение:**
Убедитесь, что в `apps/api/src/main.py` добавлены правильные origins:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",  # Vite порт
        "http://127.0.0.1:5173",
        # ... другие порты
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**После изменения перезапустите бэкенд!**

---

### 3. Бэкенд не запущен или недоступен

**Проверка:**
```bash
# Проверьте, что бэкенд работает
curl http://localhost:8000/health
# Должен вернуть: {"status":"ok"}
```

**Запуск бэкенда:**
```bash
cd apps/api
uvicorn src.main:app --reload --port 8000
```

---

### 4. Токен авторизации отсутствует

**Симптомы:**
- Ошибка 401 Unauthorized
- Пользователь не залогинен

**Проверка:**
1. Откройте страницу курса
2. Откройте DevTools → Network
3. Найдите запрос POST /api/reviews
4. Проверьте заголовки - должен быть `Authorization: Bearer <token>`

**Решение:**
- Залогиньтесь на странице `/login`
- Убедитесь, что токен сохранён в localStorage

---

## Порядок действий для исправления

### Шаг 1: Запустить бэкенд
```bash
cd apps/api
uvicorn src.main:app --reload --port 8000
```

### Шаг 2: Обновить базу данных
```bash
python update_database.py
```

### Шаг 3: Перезапустить фронтенд
```bash
cd apps/web
npm run dev
```

### Шаг 4: Проверить работу
1. Откройте http://localhost:5173
2. Залогиньтесь
3. Перейдите на страницу курса
4. Попробуйте отправить отзыв
5. Проверьте консоль браузера (F12 → Console) и Network tab

---

## Как проверить что всё работает

### Проверка на бэкенде:
```bash
# Получите все отзывы
curl http://localhost:8000/api/reviews/admin -H "Authorization: Bearer <ваш-токен>"

# Получите отзывы конкретного курса
curl http://localhost:8000/api/reviews/course/<course-id>
```

### Проверка на фронтенде:
1. Откройте DevTools → Network
2. Отправьте отзыв
3. Должен быть запрос:
   - POST /api/reviews
   - Status: 201 Created
   - Response: объект отзыва

---

## Откат изменений (если что-то пошло не так)

Если таблица reviews создана с ошибками:
```bash
# Удалите базу данных и пересоздайте (ВНИМАНИЕ: потеря всех данных!)
cd apps/api
rm instance/*.db  # для SQLite
uvicorn src.main:app --reload
```

---

## Дополнительные проверки

### Проверьте структуру таблицы:
```sql
-- Если используете SQLite
sqlite3 instance/your_db.db ".schema reviews"
```

Ожидаемая структура:
```sql
CREATE TABLE reviews (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES courses(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME NOT NULL
);
```

### Проверьте связи в SQLAlchemy:
```python
from src.models.database import Course, User

# Проверка что связи определены
print(hasattr(Course, 'reviews'))  # True
print(hasattr(User, 'reviews'))    # True
```
