# Implementation Plan

[Overview]
Учебный проект школы "TOP IT SCHOOL" с каталогом IT-курсов, системой авторизации, корзиной и админ-панелью. Монорепозиторий на Turborepo с единым пакетом типов для фронтенда и бэкенда.

---

[Types]
### User (Пользователь)
```typescript
interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'customer';
  createdAt: Date;
}
```

### Course (Курс)
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### CartItem (Элемент корзины)
```typescript
interface CartItem {
  courseId: string;
  addedAt: Date;
}
```

### Order (Заказ)
```typescript
interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: Date;
}
```

### API Response Types
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}
```

---

[Files]

### Монорепозиторий Turborepo
```
top-it-school/
├── apps/
│   ├── web/                    # React фронтенд
│   ├── api/                    # FastAPI бэкенд
│   └── admin/                  # Админ-панель
├── packages/
│   └── types/                  # Общие TypeScript типы
├── turbo.json
├── package.json
└── tsconfig.base.json
```

### Структура `apps/web` (Фронтенд для клиентов)
```
apps/web/
├── src/
│   ├── components/             # UI компоненты
│   │   ├── ui/                 # Базовые компоненты
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ...
│   │   ├── layout/             # Layout компоненты
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── features/           # Бизнес-компоненты
│   │       ├── CourseCard.tsx
│   │       ├── CartItem.tsx
│   │       └── ...
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── CatalogPage.tsx
│   │   ├── CoursePage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── SuccessPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── useCourses.ts
│   ├── api/
│   │   └── client.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── styles/
│   │   └── variables.css       # CSS переменные
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── tsconfig.json
```

### Структура `apps/admin` (Админ-панель)
```
apps/admin/
├── src/
│   ├── components/             # UI компоненты (общие)
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── CourseEditPage.tsx
│   │   └── UsersPage.tsx
│   ├── hooks/
│   ├── api/
│   ├── styles/
│   │   └── variables.css
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── tsconfig.json
```

### Структура `apps/api` (Бэкенд FastAPI)
```
apps/api/
├── src/
│   ├── routers/
│   │   ├── auth.py
│   │   ├── courses.py
│   │   ├── cart.py
│   │   ├── orders.py
│   │   └── users.py
│   ├── models/
│   │   └── database.py         # SQLAlchemy модели
│   ├── schemas/
│   │   └── types.py            # Pydantic схемы
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   ├── main.py
│   └── types.ts                # Импорт общих типов
├── alembic/                    # Миграции БД
├── requirements.txt
└── tsconfig.json
```

### Структура `packages/types`
```
packages/types/
├── src/
│   ├── index.ts
│   ├── user.ts
│   ├── course.ts
│   ├── order.ts
│   └── api.ts
├── package.json
└── tsconfig.json
```

### Конфигурационные файлы

**`turbo.json`**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

**`package.json` (корневой)**
```json
{
  "name": "top-it-school",
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

---

[Functions]

### Бэкенд API (FastAPI)

**Auth Router (`apps/api/src/routers/auth.py`)**
- `POST /auth/register` - Регистрация пользователя
- `POST /auth/login` - Авторизация, возврат JWT токена
- `GET /auth/me` - Текущий пользователь

**Courses Router (`apps/api/src/routers/courses.py`)**
- `GET /courses` - Список всех курсов
- `GET /courses/{id}` - Детали курса
- `POST /courses` - Создание курса (admin)
- `PUT /courses/{id}` - Обновление курса (admin)
- `DELETE /courses/{id}` - Удаление курса (admin)

**Cart Router (`apps/api/src/routers/cart.py`)**
- `GET /cart` - Получить корзину пользователя
- `POST /cart` - Добавить курс в корзину
- `DELETE /cart/{courseId}` - Убрать из корзины

**Orders Router (`apps/api/src/routers/orders.py`)**
- `POST /orders` - Создать заказ (оплата)
- `GET /orders` - Список заказов пользователя
- `GET /orders/{id}` - Детали заказа

**Users Router (`apps/api/src/routers/users.py`)**
- `GET /users` - Список пользователей (admin)
- `GET /users/{id}` - Профиль пользователя
- `DELETE /users/{id}` - Удаление пользователя (admin)

### Фронтенд (React)

**Hooks**
- `useAuth()` - Авторизация, проверка роли
- `useCart()` - Управление корзиной
- `useCourses()` - Получение списка курсов
- `useOrders()` - Получение заказов

**Context Providers**
- `AuthContext` - Контекст авторизации
- `CartContext` - Контекст корзины

---

[Classes]

### Бэкенд (FastAPI + SQLAlchemy)

**Models (`apps/api/src/models/database.py`)**
- `Base` - Declarative Base
- `User` - Модель пользователя
- `Course` - Модель курса
- `CartItem` - Модель элемента корзины
- `Order` - Модель заказа

**Core Classes (`apps/api/src/core/`)**
- `Database` - Singleton для подключения к БД
- `Security` - Хеширование паролей, JWT

### Фронтенд

**UI Components (`apps/web/src/components/ui/`)**
- `Button` - Кнопка с вариантами (primary, secondary)
- `Input` - Поле ввода
- `Card` - Карточка с тенью
- `Container` - Контейнер для контента
- `Navbar` - Навигационная панель
- `Modal` - Модальное окно

---

[Dependencies]

### Корневой `package.json`
```json
{
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.4.0"
  }
}
```

### `apps/web/package.json`
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "@top-it-school/types": "workspace:*"
  },
  "devDependencies": {
    "vite": "^5.1.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.4.0"
  }
}
```

### `apps/admin/package.json`
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "@top-it-school/types": "workspace:*"
  },
  "devDependencies": {
    "vite": "^5.1.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.4.0"
  }
}
```

### `apps/api/requirements.txt`
```
fastapi==0.109.0
uvicorn==0.27.0
sqlalchemy==2.0.0
psycopg2-binary==2.9.9
pydantic==2.5.0
python-jose==3.3.0
passlib==1.7.4
bcrypt==4.1.0
python-multipart==0.0.6
alembic==1.13.0
```

### `packages/types/package.json`
```json
{
  "name": "@top-it-school/types",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  }
}
```

---

[Testing]

### Тестируемые компоненты

**Бэкенд:**
- API эндпоинты (curl/http тесты)
- Авторизация (register, login)
- CRUD курсов
- Операции с корзиной
- Создание заказов

**Фронтенд:**
- Рендеринг страниц
- Навигация
- Состояние авторизации
- Работа корзины

### Файлы тестов
- `apps/api/src/tests/` - pytest тесты
- `apps/web/src/__tests__/` - Vitest тесты

---

[Implementation Order]

1. **Инициализация монорепозитория** - Turborepo, workspaces, базовые tsconfig
2. **Пакет типов `packages/types`** - Общие TypeScript интерфейсы
3. **Бэкенд `apps/api`** - FastAPI проект, модели БД, миграции
4. **Auth система** - Регистрация, авторизация, JWT
5. **CRUD курсов** - API для курсов
6. **Корзина и заказы** - API для корзины и оформления
7. **Админка `apps/admin`** - CRUD курсов, управление пользователями
8. **Фронтенд `apps/web`** - React приложение
9. **UI компоненты** - Базовые компоненты с CSS переменными
10. **Страницы клиента** - Каталог, карточка курса, корзина, оформление
11. **Адаптивность** - Мобильная версия (<640px)
12. **Интеграция** - Подключение фронтенда к API
