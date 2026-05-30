"""Скрипт для чтения курсов из старой базы данных"""
import sqlite3
import json

# Подключаемся к старой базе данных
conn = sqlite3.connect('E:/back/Diplomback/apps/api/top_it_school.db')
cursor = conn.cursor()

# Получаем все курсы
cursor.execute("SELECT id, title, description, price, image_url, duration, age_badge, created_at FROM courses")
courses = cursor.fetchall()

print(f"Найдено курсов: {len(courses)}\n")

# Выводим в формате JSON для удобства
courses_data = []
for course in courses:
    course_dict = {
        "id": course[0],
        "title": course[1],
        "description": course[2],
        "price": course[3],
        "image_url": course[4] or "",
        "duration": course[5] or "12 месяцев",
        "age_badge": course[6] or "16+"
    }
    courses_data.append(course_dict)
    print(f"{course_dict['id']}. {course_dict['title']}")

print("\n" + "="*50)
print("JSON формат для seed.py:")
print("="*50)
print(json.dumps(courses_data, indent=2, ensure_ascii=False))

conn.close()
