from .routers import auth, courses, cart, orders, users, settings, reviews, public
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from .core.database import engine, Base
from .routers import auth, courses, cart, orders, users, settings, reviews
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from .core.database import engine, Base
from .core.config import settings as app_settings
from . import seed

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TOP IT SCHOOL API", version="1.0.0")

os.makedirs("uploads/avatars", exist_ok=True)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


app.add_middleware(
    CORSMiddleware,
    allow_origins=app_settings.CORS_ORIGINS_LIST,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Запускаем seed при старте сервера"""
    print("="*60)
    print("🚀 Запуск сервера TOP IT SCHOOL API")
    print("📦 Проверка и создание начальных данных...")
    print("="*60)
    seed.seed_admin()
    seed.seed_courses()
    seed.seed_hero_settings()
    print("✅ Готово! Сервер запущен.")
    print("="*60)


@app.get("/api/public-test")
def public_test():
    print("DEBUG: public_test in main.py called")
    return {"status": "public endpoint works"}

app.include_router(auth.router, prefix="/api")
app.include_router(courses.router, prefix="/api")
app.include_router(cart.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(settings.router, prefix="/api")
app.include_router(reviews.router, prefix="/api")
app.include_router(public.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "TOP IT SCHOOL API", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "ok"}