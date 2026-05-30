# TOP IT SCHOOL - Полная документация проекта

## 📋 Общая информация

**Название проекта:** Top Academy - Онлайн-школа программирования  
**Тип проекта:** E-learning платформа (онлайн-школа IT-курсов)  
**Архитектура:** Monorepo (Turborepo)  
**Целевая аудитория:** Студенты и желающие освоить IT-профессии  

---

## 🏗️ Архитектура проекта

### Структура репозитория (Monorepo)

```
Diplom/
├── apps/
│   ├── api/              # Backend (FastAPI)
│   ├── web/              # Frontend (React + Vite)
│   └── admin/            # Админ-панель (React + Vite)
├── packages/
│   └── types/            # Общие TypeScript типы
├── package.json          # Корневой package.json
├── turbo.json            # Конфигурация Turbo
└── tsconfig.base.json   # Базовый tsconfig
```

---

## 🖥️ Frontend (apps/web)

### Технологии

- **React 18** — UI-фреймворк
- **TypeScript** — типизация
- **Vite** — сборка и dev-сервер
- **React Router v6** — роутинг
- **CSS (Custom Properties)** — стилизация
- **Fetch API** — HTTP-запросы

### Структура

```
apps/web/src/
├── api/
│   └── client.ts              # API клиент
├── components/
│   ├── layout/                # Layout компоненты
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── ui/                    # UI компоненты
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   └── features/              # Фичевые компоненты
│       ├── CourseCard.tsx
│       └── HeroSection.tsx
├── context/
│   ├── AuthContext.tsx        # Аутентификация
│   └── CartContext.tsx        # Корзина
├── pages/
│   ├── HomePage.tsx           # Главная
│   ├── CatalogPage.tsx        # Каталог курсов
│   ├── CoursePage.tsx         # Страница курса
│   ├── CartPage.tsx           # Корзина
│   ├── CheckoutPage.tsx       # Оформление заказа
│   ├── SuccessPage.tsx        # Успешный заказ
│   ├── LoginPage.tsx          # Вход
│   ├── RegisterPage.tsx       # Регистрация (с email-подтверждением)
│   └── ProfilePage.tsx        # Профиль пользователя
├── styles/
│   ├── variables.css          # CSS переменные
│   └── main.css
├── App.tsx                    # Root компонент
├── main.tsx                   # Entry point
└── index.css                  # Глобальные стили
```

### Роуты

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/` | HomePage | Главная страница |
| `/courses` | CatalogPage | Каталог курсов |
| `/catalog` | CatalogPage | Каталог курсов (альтернативный путь) |
| `/course/:id` | CoursePage | Страница курса |
| `/cart` | CartPage | Корзина |
| `/checkout` | CheckoutPage | Оформление заказа |
| `/success` | SuccessPage | Успешный заказ |
| `/login` | LoginPage | Вход в аккаунт |
| `/register` | RegisterPage | Регистрация (с подтверждением email) |
| `/profile` | ProfilePage | Личный кабинет |

### State Management

**AuthContext** — управление аутентификацией:
- `user` — текущий пользователь
- `token` — JWT токен
- `login(email, password)` — вход
- `register(email, password)` — регистрация
- `verifyEmail(email, code)` — подтверждение email
- `resendVerificationCode(email)` — повторная отправка кода
- `logout()` — выход

**CartContext** — управление корзиной:
- `cartItems` — товары в корзине
- `addCourse(courseId)` — добавить курс
- `removeCourse(courseId)` — удалить курс
- `clearCart()` — очистить корзину
- `totalPrice` — общая сумма

---

## 🖥️ Backend (apps/api)

### Технологии

- **Python 3.14**
- **FastAPI** — веб-фреймворк
- **SQLAlchemy** — ORM
- **SQLite** — база данных (production-ready, но можно заменить на PostgreSQL)
- **Pydantic** — валидация данных
- **JWT** — аутентификация
- **Bcrypt** — хеширование паролей
- **Uvicorn** — ASGI сервер

### Структура

```
apps/api/src/
├── core/
│   ├── config.py          # Конфигурация (.env)
│   ├── database.py        # Подключение к БД
│   └── security.py        # JWT, пароли, email
├── models/
│   ├── database.py        # SQLAlchemy модели
│   └── __init__.py
├── routers/
│   ├── auth.py            # Аутентификация
│   ├── courses.py         # Курсы
│   ├── cart.py            # Корзина
│   ├── orders.py          # Заказы
│   ├── users.py           # Пользователи
│   ├── settings.py        # Настройки сайта
│   ├── reviews.py         # Отзывы
│   └── public.py          # Public endpoints
├── schemas/
│   ├── auth.py            # DTO аутентификации
│   ├── course.py          # DTO курсов
│   ├── order.py           # DTO заказов
│   ├── review.py          # DTO отзывов
│   └── settings.py        # DTO настроек
├── main.py                # Entry point
└── seed.py                # Seed-данные
```

### База данных

#### Таблицы

**users** — пользователи
- `id` (PK, String) — уникальный ID
- `email` (String, unique) — email
- `password_hash` (String) — хеш пароля
- `role` (Enum: admin/customer) — роль
- `created_at` (DateTime) — дата создания
- `is_verified` (Boolean) — подтверждён ли email
- `verification_code` (String 6) — код подтверждения
- `code_expires_at` (DateTime) — срок действия кода

**courses** — курсы
- `id` (PK, String) — уникальный ID
- `title` (String) — название
- `description` (String) — описание
- `price` (Integer) — цена (в копейках)
- `image_url` (String) — URL картинки
- `duration` (String) — длительность
- `age_badge` (String) — возрастной рейтинг
- `created_at` (DateTime) — дата создания
- `updated_at` (DateTime) — дата обновления

**cart_items** — товары в корзине
- `id` (PK, String)
- `user_id` (FK → users.id)
- `course_id` (FK → courses.id)
- `added_at` (DateTime)

**orders** — заказы
- `id` (PK, String)
- `user_id` (FK → users.id)
- `total_amount` (Float) — сумма
- `status` (Enum: pending/paid/cancelled) — статус
- `customer_name` (String) — имя
- `phone` (String) — телефон
- `address` (String, nullable) — адрес
- `created_at` (DateTime)

**order_items** — товары в заказе
- `id` (PK, String)
- `order_id` (FK → orders.id)
- `course_id` (FK → courses.id)
- `price_at_purchase` (Float) — цена на момент покупки
- `added_at` (DateTime)

**reviews** — отзывы
- `id` (PK, String)
- `course_id` (FK → courses.id)
- `user_id` (FK → users.id)
- `rating` (Integer) — рейтинг (1-5)
- `text` (String) — текст отзыва
- `created_at` (DateTime)

**user_profiles** — профили пользователей
- `id` (PK, Integer, autoincrement)
- `user_id` (FK → users.id, unique)
- `name` (String) — имя
- `phone` (String) — телефон
- `avatar_url` (String) — аватар

**hero_settings** — настройки главной страницы
- `id` (PK, Integer)
- `slogan` (String) — слоган
- `subtitle` (String) — подзаголовок
- `cta_text` (String) — текст кнопки
- `image_url` (String) — URL баннера
- `updated_at` (DateTime)

### API Endpoints

#### Аутентификация (`/api/auth`)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| POST | `/register` | Регистрация (с генерацией кода) |
| POST | `/verify` | Подтверждение email по коду |
| POST | `/resend-code` | Повторная отправка кода |
| POST | `/login` | Вход (OAuth2 form) |
| POST | `/login/json` | Вход (JSON body) |
| GET | `/me` | Текущий пользователь |

#### Курсы (`/api/courses`)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/courses` | Все курсы |
| GET | `/courses/{id}` | Курс по ID |
| POST | `/courses` | Создать курс (admin) |
| PUT | `/courses/{id}` | Обновить курс (admin) |
| DELETE | `/courses/{id}` | Удалить курс (admin) |
| GET | `/courses/random/recommendations` | Рекомендации |

#### Корзина (`/api/cart`)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/cart` | Получить корзину |
| POST | `/cart` | Добавить курс |
| DELETE | `/cart/{courseId}` | Удалить курс |
| DELETE | `/cart` | Очистить корзину |

#### Заказы (`/api/orders`)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/orders` | Все заказы (admin) |
| GET | `/orders/{id}` | Заказ по ID |
| POST | `/orders` | Создать заказ |
| PATCH | `/orders/{id}/status` | Обновить статус (admin) |

#### Пользователи (`/api/users`)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/users` | Все пользователи (admin) |
| GET | `/users/{id}` | Пользователь по ID |
| DELETE | `/users/{id}` | Удалить пользователя (admin) |
| GET | `/public/my-profile` | Мой профиль |
| PUT | `/users/profile` | Обновить профиль |
| PATCH | `/users/profile/avatar` | Обновить аватар |

#### Отзывы (`/api/reviews`)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/reviews/course/{courseId}` | Отзывы курса |
| POST | `/reviews` | Добавить отзыв |

#### Настройки (`/api/settings`)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/settings/hero` | Hero-секция |
| PUT | `/settings/hero` | Обновить hero (admin) |

#### Public

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/public-test` | Тестовый endpoint |

### Конфигурация (.env)

```env
# Database
DATABASE_URL=sqlite:///./top_it_school.db

# Security
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Server
HOST=0.0.0.0
PORT=8000

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:5173

# Admin
ADMIN_EMAIL=admin@top-academy.ru
ADMIN_PASSWORD=admin123

# Email/SMTP (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=canongov18@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM_EMAIL=canongov18@gmail.com
```

---

## 🎨 Дизайн и UI

### Цветовая схема

```css
--color-background: #FFFFFF
--color-text: #000000
--color-accent: #CD2532       /* Красный акцент */
--color-block: #D9D9D9        /* Серый для блоков */
--color-text-secondary: #666666
--color-border: #E0E0E0
```

### Компоненты UI

- **Button** — кнопки (primary/secondary/outline)
- **Input** — поля ввода с лейблами
- **Card** — карточки контента

---

## 🚀 Запуск проекта

### Backend

```bash
cd apps/api
py -m uvicorn src.main:app --reload
```

Сервер запустится на `http://localhost:8000`  
API документация: `http://localhost:8000/docs`

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

Сайт запустится на `http://localhost:5173`

### Админ-панель

```bash
cd apps/admin
npm install
npm run dev
```

Админка запустится на `http://localhost:3001`

---

## 🎓 Функциональность

### Для пользователей

1. **Регистрация с подтверждением email**
   - Ввод email и пароля
   - Получение 6-значного кода
   - Подтверждение по коду
   - Код истекает через 10 минут

2. **Каталог курсов**
   - Просмотр всех курсов
   - Детальная информация о курсе
   - Отзывы и рейтинг

3. **Корзина**
   - Добавление курсов
   - Удаление курсов
   - Итоговая сумма

4. **Оформление заказа**
   - Ввод личных данных
   - Подтверждение заказа
   - История заказов

5. **Личный кабинет**
   - Профиль пользователя
   - Изменение данных
   - Аватар

### Для администраторов

1. **Управление курсами**
   - Создание/редактирование/удаление
   - Загрузка изображений

2. **Управление заказами**
   - Просмотр всех заказов
   - Смена статуса

3. **Управление пользователями**
   - Просмотр списка
   - Удаление

4. **Настройки сайта**
   - Hero-секция
   - Баннеры

---

## 🔐 Безопасность

1. **JWT-аутентификация**
   - Срок действия токена: 7 дней
   - Bearer token в заголовке

2. **Хеширование паролей**
   - Bcrypt с солью

3. **Email-подтверждение**
   - 6-значный код
   - Истечение через 10 минут
   - SMTP-отправка (Gmail/SendGrid)

4. **Ролевая модель**
   - admin / customer
   - Защита админских endpoint'ов

---

## 📦 Курсы в базе (10 штук)

| ID | Название | Цена | Длительность |
|----|----------|------|--------------|
| 2 | Веб-разработчик с нуля | 16 000 ₽ | 12 месяцев |
| 3 | ИИ для бизнеса | 10 000 ₽ | 6 месяцев |
| 4 | Цифровая грамотность | 5 000 ₽ | 1 месяц |
| 5 | JavaScript с ИИ | 15 000 ₽ | 12 месяцев |
| 6 | Фронтенд-разработчик | 15 000 ₽ | 12 месяцев |
| 7 | Android-разработчик | 15 000 ₽ | 12 месяцев |
| 8 | DevOps-инженер | 20 000 ₽ | 18 месяцев |
| 9 | iOS-разработка | 15 000 ₽ | 12 месяцев |
| 10 | Unity-разработчик | 15 000 ₽ | 12 месяцев |
| 11 | Бэкенд-разработчик | 15 000 ₽ | 12 месяцев |

---

## 🧪 Тестирование

### Тестовый админ
- Email: `admin@top-academy.ru`
- Пароль: `admin123`

### Проверка работы API
- Swagger UI: `http://localhost:8000/docs`
- Public test: `http://localhost:8000/api/public-test`

---

## 📝 Примечания

1. **Seed-данные** — автоматически создаются при запуске сервера
2. **Медиа-файлы** — аватары загружаются в `uploads/avatars/`
3. **CORS** — настроен для localhost:3000, 3001, 5173
4. **База данных** — SQLite (можно заменить на PostgreSQL)

---

**Документация создана для отчёта по дипломному проекту**  
**Дата: 28 мая 2026**
