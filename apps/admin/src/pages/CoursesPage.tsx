import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { api } from '../api/client';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  age_badge: string;
}

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '12 месяцев',
    age_badge: '16+',
    image_url: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await api.courses.getAll();
      console.log('Loaded courses:', data);
      setCourses(data);
    } catch (err: any) {
      console.error(err);
      alert('Ошибка загрузки курсов: ' + (err?.message || 'Неизвестная ошибка'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация формы
    if (!formData.title.trim()) {
      alert('Введите название курса');
      return;
    }
    if (formData.title.length < 3) {
      alert('Название курса должно быть не менее 3 символов');
      return;
    }
    if (!formData.description.trim()) {
      alert('Введите описание курса');
      return;
    }
    if (formData.description.length < 10) {
      alert('Описание курса должно быть не менее 10 символов');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('Укажите корректную цену (больше 0)');
      return;
    }

    try {
      const courseData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        duration: formData.duration,
        age_badge: formData.age_badge,
        image_url: formData.image_url
      };

      console.log('Saving course:', { id: editingCourse?.id, data: courseData });

      if (editingCourse) {
        await api.courses.update(editingCourse.id, courseData);
      } else {
        await api.courses.create(courseData);
      }

      setFormData({ title: '', description: '', price: '', duration: '12 месяцев', age_badge: '16+', image_url: '' });
      setShowForm(false);
      setEditingCourse(null);
      loadCourses();
      alert('Курс сохранён!');
    } catch (err: any) {
      console.error('Error saving course:', err);
      const errorMessage = err?.message || err?.data?.detail || 'Ошибка при сохранении курса';
      alert('Ошибка при сохранении курса: ' + errorMessage);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      duration: course.duration,
      age_badge: course.age_badge,
      image_url: (course as any).image_url || ''
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', price: '', duration: '12 месяцев', age_badge: '16+', image_url: '' });
    setShowForm(false);
    setEditingCourse(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить курс?')) return;
    try {
      await api.courses.delete(id);
      loadCourses();
      alert('Курс удалён');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Ошибка при удалении курса');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active="courses" />
      <main style={{ flex: 1, padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700 }}>Курсы</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Отмена' : '+ Добавить курс'}
          </Button>
        </div>

        {showForm && (
          <Card style={{ marginBottom: '24px', padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
              {editingCourse ? 'Редактировать курс' : 'Новый курс'}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Название"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Input
                  label="Цена (₽)"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
                <Input
                  label="Длительность"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="12 месяцев"
                />
              </div>
              <Input
                label="Возрастной бейдж"
                value={formData.age_badge}
                onChange={(e) => setFormData({ ...formData, age_badge: e.target.value })}
                placeholder="16+"
              />
              <Input
                label="URL изображения"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button type="submit">
                  {editingCourse ? 'Сохранить' : 'Создать'}
                </Button>
                {editingCourse && (
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Отмена
                  </Button>
                )}
              </div>
            </form>
          </Card>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {courses.map((course) => (
            <Card key={course.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 600, marginBottom: '4px' }}>{course.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '8px' }}>
                    {course.description.length > 80 ? course.description.substring(0, 80) + '...' : course.description}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    <span>⏱️ {course.duration}</span>
                    <span>🎂 {course.age_badge}</span>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
                      {course.price.toLocaleString()} ₽
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                  <Button variant="outline" size="small" onClick={() => handleEdit(course)}>
                    Редактировать
                  </Button>
                  <Button variant="danger" size="small" onClick={() => handleDelete(course.id)}>
                    Удалить
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '40px' }}>
            Курсы не найдены
          </p>
        )}
      </main>
    </div>
  );
};
