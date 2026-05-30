# 🎓 TOP IT SCHOOL

Учебный веб-проект школы с углубленным изучением IT для будущих профессионалов. Монорепозиторий на Turborepo.

## 📋 Описание

Полнофункциональная платформа для онлайн-обучения IT-профессиям, включающая:
- **Клиентский сайт** — каталог курсов, корзина, оформление заказов, личный кабинет
- **Админ-панель** — управление курсами, пользователями, настройками главной страницы
- **REST API** — бэкенд на FastAPI с PostgreSQL

## 🏗 Структура проекта

```
top-it-school/
├── apps/
│   ├── web/          # Клиентский фронтенд (React + TypeScript + Vite)
│   ├── admin/        # Админ-панель (React + TypeScript + Vite)
│   └── api/          # Бэкенд (FastAPI + SQLAlchemy + PostgreSQL)
├── packages/
│   └── types/        # Общие TypeScript типы для всех приложений
├── turbo.json        # Конфигурация Turborepo
└── package.json      # Корневой package.json для монорепозитория
```

## ✨ Функционал

### Клиентский сайт
- 📚 **Каталог курсов** — просмотр доступных курсов с фильтрацией
- 🖼 **Изображения курсов** — возможность добавления изображений через URL
- 🛒 **Корзина** — добавление и удаление курсов
- 📝 **Оформление заказа** — ввод контактных данных
- 👤 **Личный кабинет** — история заказов, выход из аккаунта
- 🔐 **Аутентификация** — регистрация и вход пользователей
- 🏠 **Главная страница** — настраиваемый баннер с информацией о школе

### Админ-панель
- 📊 **Дашборд** — статистика по курсам и пользователям
- 📚 **Управление курсами** — создание, редактирование, удаление курсов
- 🖼 **Изображения** — добавление URL-изображений для курсов
- 👥 **Управление пользователями** — просмотр и удаление пользователей
- ⚙️ **Настройки главной страницы** — слоган, подзаголовок, текст кнопки

## 🚀 Установка и запуск (пошаговая инструкция)

Этот проект требует настройки нескольких компонентов. Следуйте шагам по порядку.

### ⚙️ Требования

Перед установкой убедитесь, что на компьютере установлены:

- **Node.js 18+** — [Скачать](https://nodejs.org/)
- **Python 3.10+** — [Скачать](https://www.python.org/downloads/)
- **PostgreSQL 14+** — [Скачать](https://www.postgresql.org/download/)

> **Проверка установок:**
> ```powershell
> node --version
> python --version
> psql --version
> ```

---

### Шаг 1: Клонирование репозитория

```powershell
git clone <repository-url>
cd top-it-school
```

---

### Шаг 2: Установка Node.js зависимостей

```powershell
npm install
```

Это установит зависимости для всех приложений монорепозитория (web, admin, packages).

---

### Шаг 3: Настройка Python виртуального окружения

```powershell
cd apps/api
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
cd ../..
```

> **Если PowerShell блокирует выполнение скриптов:**
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

---

### Шаг 4: Настройка переменных окружения

Создайте `.env` файлы из примеров:

**Для API:**
```powershell
cd apps/api
copy .env.example .env
```

Откройте `apps/api/.env` и при необходимости измените значения:

```env
# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/top_it_school

# Security
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:5173

# Admin credentials
ADMIN_EMAIL=admin@top-academy.ru
ADMIN_PASSWORD=admin123
```

**Для фронтенда (web и admin):**
```powershell
cd apps/web
copy .env.example .env
cd ../admin
copy .env.example .env
```

Файлы `.env` для web и admin содержат только:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

### Шаг 5: Настройка базы данных PostgreSQL

**Вариант А — Использование SQLite (проще, для разработки):**

Измените в `apps/api/.env`:
```env
DATABASE_URL=sqlite:///./top_it_school.db
```

**Вариант Б — PostgreSQL (рекомендуется):**

1. Создайте базу данных:
```sql
CREATE DATABASE top_it_school;
```

2. Обновите `DATABASE_URL` в `apps/api/.env`:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/top_it_school
```

---

### Шаг 6: Запуск проекта

#### 6.1. Запуск бэкенда (PowerShell)

```powershell
cd apps/api
.\venv\Scripts\Activate.ps1
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

> При первом запуске автоматически создаются:
> - Админ-пользователь (admin@top-academy.ru / admin123)
> - Начальные данные курсов
> - Настройки главной страницы

**API доступно на:**
- Основная страница: http://localhost:8000
- Документация Swagger: http://localhost:8000/docs
- Проверка работы: http://localhost:8000/health

---

#### 6.2. Запуск клиентского сайта (новая вкладка терминала)

Откройте **новый терминал**, вернитесь в корень проекта:

```powershell
cd top-it-school
npm run dev
```

**Запустится сразу два приложения:**
- **Клиентский сайт:** http://localhost:3000
- **Админ-панель:** http://localhost:3001

---

### 📋 Сводная таблица портов

| Приложение | Порт | URL |
|------------|------|-----|
| API (FastAPI) | 8000 | http://localhost:8000 |
| Клиентский сайт (Web) | 3000 | http://localhost:3000 |
| Админ-панель (Admin) | 3001 | http://localhost:3001 |

---

### 🔐 Учётные данные по умолчанию

| Система | Email/Логин | Пароль |
|---------|-------------|--------|
| **Админ-панель** | admin@top-academy.ru | admin123 |
| **API документация** | admin@top-academy.ru | admin123 |

> Пароль можно изменить в `apps/api/.env` перед первым запуском:
> ```env
> ADMIN_EMAIL=ваш@email.com
> ADMIN_PASSWORD=ваш_пароль
> ```

---

### 🔄 Пересоздание админ-пользователя

Если нужно сбросить учётные данные админа:

```powershell
cd apps/api
.\venv\Scripts\Activate.ps1
python create_correct_admin.py
```

## 🔐 Учётные данные

### Админ-панель

По умолчанию:

| Поле | Значение |
|------|----------|
| Email | `admin@example.com` |
| Пароль | `admin123` |

**Чтобы изменить логин и пароль админа:**

1. Откройте `apps/api/.env`
2. Измените значения:
   ```
   ADMIN_EMAIL=ваш@email.com
   ADMIN_PASSWORD=ваш_пароль
   ```
3. Пересоздайте админа:
   ```bash
   cd apps/api
   .\venv\Scripts\Activate.ps1
   python create_admin.py
   ```

### База данных

| Параметр | Значение по умолчанию |
|----------|----------------------|
| Host | localhost |
| Port | 5432 |
| Database | top_it_school |
| User | postgres |
| Password | (ваш пароль PostgreSQL) |

## 🌐 Страницы сайта

### Клиентский сайт (порт 3000)

| Маршрут | Описание |
|---------|----------|
| `/` | Главная страница с информацией о школе |
| `/courses` | Каталог всех курсов |
| `/catalog` | Каталог курсов (алиас) |
| `/course/:id` | Карточка конкретного курса |
| `/cart` | Корзина покупок |
| `/checkout` | Оформление заказа |
| `/success` | Страница успешного заказа |
| `/login` | Вход для клиентов |
| `/register` | Регистрация нового клиента |
| `/profile` | Личный кабинет (история заказов, выход) |

### Админ-панель (порт 3001)

| Маршрут | Описание |
|---------|----------|
| `/login` | Вход для администратора |
| `/dashboard` | Дашборд с статистикой |
| `/courses` | Управление курсами (CRUD) |
| `/users` | Управление пользователями |
| `/hero-settings` | Настройки главной страницы |

## 🗄 База данных

### Модели

| Модель | Описание |
|--------|----------|
| User | Пользователи системы (роли: admin, customer) |
| Course | Курсы (название, описание, цена, изображение, длительность, возрастной бейдж) |
| CartItem | Элементы корзины пользователя |
| Order | Заказы (статусы: pending, paid, cancelled) |
| OrderItem | Элементы заказа с ценой на момент покупки |
| HeroSettings | Настройки главной страницы (слоган, подзаголовок, текст кнопки) |
| UserProfile | Профили пользователей (имя, телефон) |

## 📡 API Эндпоинты

### Аутентификация

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| POST | `/api/auth/register` | Регистрация нового пользователя |
| POST | `/api/auth/login` | Вход (form-data) |
| POST | `/api/auth/login/json` | Вход (JSON) |
| GET | `/api/auth/me` | Текущий пользователь |

### Курсы

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/api/courses` | Список всех курсов |
| GET | `/api/courses/{id}` | Детали курса |
| POST | `/api/courses` | Создание курса (admin) |
| PUT | `/api/courses/{id}` | Обновление курса (admin) |
| DELETE | `/api/courses/{id}` | Удаление курса (admin) |

### Корзина

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/api/cart` | Получить корзину пользователя |
| POST | `/api/cart` | Добавить курс в корзину |
| DELETE | `/api/cart/{course_id}` | Удалить курс из корзины |

### Заказы

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/api/orders` | Список заказов пользователя |
| POST | `/api/orders` | Создать заказ |

### Пользователи (admin)

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/api/users` | Список всех пользователей |
| GET | `/api/users/{id}` | Информация о пользователе |
| DELETE | `/api/users/{id}` | Удалить пользователя |

### Настройки

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/api/settings/hero` | Получить настройки главной страницы |
| PUT | `/api/settings/hero` | Обновить настройки главной страницы |

## 🎨 Дизайн-система

### Цвета

| Название | HEX | Использование |
|----------|-----|---------------|
| background | #FFFFFF | Фон страницы |
| text | #000000 | Основной текст |
| accent | #CD2532 | Акцентный цвет (кнопки, ссылки) |
| block | #D9D9D9 | Фон блоков |
| border | #E5E5E5 | Границы элементов |
| text-secondary | #666666 | Второстепенный текст |

### Компоненты

- **Button** — кнопки (primary, secondary, outline, danger)
- **Card** — карточки с hover-эффектом
- **Input** — поля ввода
- **Header** — навигация (логотип, каталог, корзина, профиль)
- **Footer** — подвал сайта с контактами

## 🛠 Технологии

### Фронтенд

- **React 18** — библиотека для построения UI
- **TypeScript** — типизация JavaScript
- **Vite** — сборщик и dev-сервер
- **React Router** — маршрутизация
- **Turborepo** — монорепозиторий

### Бэкенд

- **FastAPI** — веб-фреймворк на Python
- **SQLAlchemy** — ORM для работы с БД
- **PostgreSQL** — реляционная база данных
- **Pydantic** — валидация данных
- **JWT** — аутентификация
- **Bcrypt** — хэширование паролей

## 📦 Команды

### Монорепозиторий

```powershell
npm install          # Установить все зависимости для web и admin
npm run dev          # Запустить web (порт 3000) и admin (порт 3001)
npm run build        # Собрать все приложения для продакшена
npm run lint         # Запустить линтинг
```

### Клиентский сайт

```powershell
cd apps/web
npm run dev          # Dev сервер
npm run build        # Сборка для продакшена
npm run preview      # Превью продакшен сборки
```

### Админ-панель

```powershell
cd apps/admin
npm run dev          # Dev сервер
npm run build        # Сборка для продакшена
```

### API

```powershell
# Активация виртуального окружения
cd apps/api
.\venv\Scripts\Activate.ps1

# Запуск сервера
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

# Утилиты
python create_admin.py      # Создать/обновить админа из .env
python create_correct_admin.py # Пересоздать админа (admin@top-academy.ru / admin123)
python run_seed.py          # Заполнить БД курсами и настройками
```

> **Важно:** Перед первым запуском убедитесь, что файл `.env` создан в `apps/api/` (скопируйте из `.env.example`).

## 🔧 Возможные проблемы

### Ошибка подключения к базе данных

**Для SQLite:** Убедитесь, что в `apps/api/.env` указано:
```env
DATABASE_URL=sqlite:///./top_it_school.db
```

**Для PostgreSQL:** Убедитесь, что:
1. PostgreSQL запущен
2. База данных `top_it_school` создана
3. Логин и пароль в `DATABASE_URL` верные

### CORS ошибки

Если фронтенд не может обратиться к API, проверьте `CORS_ORIGINS` в `apps/api/.env`:
```env
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:5173
```

### Не создаётся админ-пользователь

1. Убедитесь, что `.env` файл существует в `apps/api/`
2. Проверьте значения `ADMIN_EMAIL` и `ADMIN_PASSWORD`
3. Пересоздайте админа:
```powershell
cd apps/api
.\venv\Scripts\Activate.ps1
python create_correct_admin.py
```

### Ошибка активации виртуального окружения в PowerShell

Если видите ошибку о выполнении скриптов:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Затем повторите активацию:
```powershell
.\venv\Scripts\Activate.ps1
```

### Ошибки при `npm install`

Очистите кэш npm и переустановите:
```powershell
npm cache clean --force
rm -r node_modules
npm install
```

### Порт занят

Если порт 8000, 3000 или 3001 занят:
- Измените порт в `apps/api/.env` (переменная `PORT`)
- Или остановите процесс, использующий порт:
```powershell
# Найти процесс на порту
netstat -ano | findstr :8000
# Завершить процесс (замените PID на свой)
taskkill /PID <PID> /F
```

## 🔐 Безопасность

### Переменные окружения

**Никогда не коммитьте `.env` файлы в репозиторий!** Они содержат секретные ключи и настройки.

Для запуска проекта:
1. Скопируйте `.env.example` в `.env` в каждой папке (`apps/api`, `apps/web`, `apps/admin`)
2. Измените значения по необходимости
3. Особенно важно изменить `SECRET_KEY` в продакшене

### Генерация SECRET_KEY

Для продакшена сгенерируйте безопасный ключ:

```python
# В Python
import secrets
print(secrets.token_urlsafe(32))
```

Или используйте онлайн-генератор.

---

**TOP IT SCHOOL** — Школа с углубленным изучением IT для будущих профессионалов 🖥️
