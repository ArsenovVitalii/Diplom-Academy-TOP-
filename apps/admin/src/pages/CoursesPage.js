import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { api } from '../api/client';
export const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
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
        }
        catch (err) {
            console.error(err);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const courseData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                duration: formData.duration,
                age_badge: formData.age_badge,
                image_url: formData.image_url
            };
            console.log('Saving course:', { id: editingCourse?.id, data: courseData });
            if (editingCourse) {
                await api.courses.update(editingCourse.id, courseData);
            }
            else {
                await api.courses.create(courseData);
            }
            setFormData({ title: '', description: '', price: '', duration: '12 месяцев', age_badge: '16+', image_url: '' });
            setShowForm(false);
            setEditingCourse(null);
            loadCourses();
            alert('Курс сохранён!');
        }
        catch (err) {
            console.error('Error saving course:', err);
            alert('Ошибка при сохранении курса');
        }
    };
    const handleEdit = (course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description,
            price: course.price.toString(),
            duration: course.duration,
            age_badge: course.age_badge,
            image_url: course.image_url || ''
        });
        setShowForm(true);
    };
    const handleCancel = () => {
        setFormData({ title: '', description: '', price: '', duration: '12 месяцев', age_badge: '16+', image_url: '' });
        setShowForm(false);
        setEditingCourse(null);
    };
    const handleDelete = async (id) => {
        if (!confirm('Удалить курс?'))
            return;
        try {
            await api.courses.delete(id);
            loadCourses();
        }
        catch (err) {
            console.error(err);
        }
    };
    return (_jsxs("div", { style: { display: 'flex', minHeight: '100vh' }, children: [_jsx(Sidebar, { active: "courses" }), _jsxs("main", { style: { flex: 1, padding: '40px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }, children: [_jsx("h1", { style: { fontSize: '32px', fontWeight: 700 }, children: "\u041A\u0443\u0440\u0441\u044B" }), _jsx(Button, { onClick: () => setShowForm(!showForm), children: showForm ? 'Отмена' : '+ Добавить курс' })] }), showForm && (_jsxs(Card, { style: { marginBottom: '24px', padding: '24px' }, children: [_jsx("h3", { style: { marginBottom: '16px', fontSize: '18px', fontWeight: 600 }, children: editingCourse ? 'Редактировать курс' : 'Новый курс' }), _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsx(Input, { label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", value: formData.title, onChange: (e) => setFormData({ ...formData, title: e.target.value }), required: true }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }, children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }), _jsx("textarea", { value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }), required: true, style: {
                                                    width: '100%',
                                                    minHeight: '80px',
                                                    padding: '10px 12px',
                                                    border: '1px solid var(--color-border)',
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    fontFamily: 'inherit',
                                                    resize: 'vertical'
                                                } })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }, children: [_jsx(Input, { label: "\u0426\u0435\u043D\u0430 (\u20BD)", type: "number", value: formData.price, onChange: (e) => setFormData({ ...formData, price: e.target.value }), required: true }), _jsx(Input, { label: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C", value: formData.duration, onChange: (e) => setFormData({ ...formData, duration: e.target.value }), placeholder: "12 \u043C\u0435\u0441\u044F\u0446\u0435\u0432" })] }), _jsx(Input, { label: "\u0412\u043E\u0437\u0440\u0430\u0441\u0442\u043D\u043E\u0439 \u0431\u0435\u0439\u0434\u0436", value: formData.age_badge, onChange: (e) => setFormData({ ...formData, age_badge: e.target.value }), placeholder: "16+" }), _jsx(Input, { label: "URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F", value: formData.image_url, onChange: (e) => setFormData({ ...formData, image_url: e.target.value }), placeholder: "https://example.com/image.jpg" }), _jsxs("div", { style: { display: 'flex', gap: '12px', marginTop: '8px' }, children: [_jsx(Button, { type: "submit", children: editingCourse ? 'Сохранить' : 'Создать' }), editingCourse && (_jsx(Button, { type: "button", variant: "outline", onClick: handleCancel, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }))] })] })] })), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: courses.map((course) => (_jsx(Card, { children: _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsxs("div", { style: { flex: 1 }, children: [_jsx("h3", { style: { fontWeight: 600, marginBottom: '4px' }, children: course.title }), _jsx("p", { style: { color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '8px' }, children: course.description.length > 80 ? course.description.substring(0, 80) + '...' : course.description }), _jsxs("div", { style: { display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }, children: [_jsxs("span", { children: ["\u23F1\uFE0F ", course.duration] }), _jsxs("span", { children: ["\uD83C\uDF82 ", course.age_badge] }), _jsxs("span", { style: { color: 'var(--color-accent)', fontWeight: 700 }, children: [course.price.toLocaleString(), " \u20BD"] })] })] }), _jsxs("div", { style: { display: 'flex', gap: '8px', marginLeft: '16px' }, children: [_jsx(Button, { variant: "outline", size: "small", onClick: () => handleEdit(course), children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" }), _jsx(Button, { variant: "danger", size: "small", onClick: () => handleDelete(course.id), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] })] }) }, course.id))) }), courses.length === 0 && (_jsx("p", { style: { textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '40px' }, children: "\u041A\u0443\u0440\u0441\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B" }))] })] }));
};
