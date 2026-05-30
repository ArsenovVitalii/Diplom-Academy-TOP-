"""Скрипт для чтения курсов из старой базы данных"""
import sqlite3
import sys

# Устанавливаем UTF-8 для консоли
sys.stdout.reconfigure(encoding='utf-8')

# Подключаемся к старой базе данных
conn = sqlite3.connect('E:/back/Diplomback/apps/api/top_it_school.db')
conn.text_factory = str  # Принудительно используем str
cursor = conn.cursor()

# Получаем все курсы
cursor.execute("SELECT id, title, description, price, image_url, duration, age_badge FROM courses")
courses = cursor.fetchall()

print(f"Найдено курсов: {len(courses)}\n")
print("="*60)

# Выводим каждый курс
for i, course in enumerate(courses, 1):
    print(f"\nКурс {i}:")
    print(f"  ID: {course[0]}")
    print(f"  Title: {course[1]}")
    print(f"  Description: {course[2]}")
    print(f"  Price: {course[3]}")
    print(f"  Image URL: {course[4] or 'пусто'}")
    print(f"  Duration: {course[5] or '12 месяцев'}")
    print(f"  Age Badge: {course[6] or '16+'}")
    print("-"*60)

conn.close()
print("\nГотово! Данные прочитаны из старой базы.")
