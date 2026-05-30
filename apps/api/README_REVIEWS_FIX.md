# Инструкция по исправлению ошибки отправки отзывов

## Быстрое решение (3 шага)

### 1. Убедитесь что бэкенд запущен
```bash
cd apps/api
uvicorn src.main:app --reload --port 8000
```

### 2. Создайте таблицу reviews в базе данных
```bash
cd apps/api
python update_database.py
```

### 3. Перезапустите фронтенд
```bash
cd apps/web
npm run dev
```

---

## Подробное описание проблемы

### Что произошло
При отправке отзыва появляется ошибка `Failed to fetch` или `ERR_FAILED`.

### Причина
Скорее всего таблица `reviews` ещё не создана в базе данных, так как она была добавлена недавно.

### Что исправлено

#### Бэкенд:
1. ✅ Модель `Review` добавлена в `apps/api/src/models/database.py`
2. ✅ Роутер `reviews.py` создан и подключён в `main.py`
3. ✅ Схемы Pydantic созданы в `schemas/review.py`
4. ✅ CORS настроен для localhost:5173 (порт Vite)

#### Фронтенд:
1. ✅ Метод `api.courses.createReview()` добавлен
2. ✅ UI формы отзывов добавлен на `CoursePage.tsx`
3. ✅ Обработка ошибок улучшена с логированием

---

## Проверка работы

### 1. Проверьте таблицу в БД
```bash
cd apps/api
python -c "
from src.core.database import engine
from sqlalchemy import inspect
inspector = inspect(engine)
print('Таблицы:', inspector.get_table_names())
print('Есть reviews:', 'reviews' in inspector.get_table_names())
"
```

### 2. Проверьте эндпоинт
Откройте в браузере: `http://localhost:8000/docs`

Найдите endpoint `POST /api/reviews` и протестируйте его через Swagger UI.

### 3. Проверьте через Network tab
1. Откройте DevTools (F12)
2. Перейдите на страницу курса
3. Откройте вкладку Network
4. Отправьте отзыв
5. Должен быть запрос:
   - `POST /api/reviews`
   - Status: `201 Created`

---

## Если проблема сохраняется

### Проверьте логи бэкенда
В терминале где запущен бэкенд посмотрите ошибки.

### Проверьте токен авторизации
```javascript
// В консоли браузера
localStorage.getItem('token')
// Должен вернуть JWT токен
```

### Проверьте CORS
В консоли браузера должно быть:
```
API Request: { url: 'http://localhost:8000/api/reviews', ... }
```

Если видите ошибку CORS - проверьте что бэкенд запущен и `allow_origins` включает ваш порт.

---

## Ручное создание таблицы (если скрипт не работает)

```python
# В Python интерпретаторе
from src.core.database import engine, SessionLocal
from src.models.database import Review

# Создаём таблицу
Review.__table__.create(engine)

# Проверяем
session = SessionLocal()
print(session.query(Review).count())
session.close()
```

---

## Контакты

Если проблема не решается - проверьте:
1. Версию Python (должна быть 3.10+)
2. Установлены ли все зависимости (`pip install -r requirements.txt`)
3. Порт бэкенда (по умолчанию 8000)
4. Порт фронтенда (по умолчанию 5173 для Vite)
