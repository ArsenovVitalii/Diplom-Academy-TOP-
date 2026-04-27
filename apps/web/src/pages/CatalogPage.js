import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { CourseCard } from '../components/features/CourseCard';
import { api } from '../api/client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export const CatalogPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { addItem } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();
    // Показываем кнопку "Наверх" при скролле
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    useEffect(() => {
        api.courses.getAll()
            .then(setCourses)
            .catch(() => setCourses([]))
            .finally(() => setLoading(false));
    }, []);
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };
    const handleAddToCart = async (courseId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            await addItem(courseId);
            showNotification('Курс добавлен в корзину');
        }
        catch (err) {
            console.error('Failed to add to cart:', err);
        }
    };
    const styles = {
        padding: 'clamp(30px, 5vw, 60px) 0',
    };
    const titleStyles = {
        fontSize: 'clamp(24px, 5vw, 36px)',
        fontWeight: 700,
        marginBottom: 'clamp(20px, 4vw, 40px)',
        textAlign: 'center',
    };
    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
    };
    const loadingStyles = {
        textAlign: 'center',
        padding: '60px',
        fontSize: '18px',
    };
    const notificationStyles = {
        position: 'fixed',
        top: '100px',
        right: '20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        animation: 'slideIn 0.3s ease',
        fontSize: '16px',
        fontWeight: 500,
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "container", style: styles, children: [_jsx("h1", { style: titleStyles, children: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043A\u0443\u0440\u0441\u043E\u0432" }), loading ? (_jsx("div", { style: loadingStyles, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." })) : (_jsx("div", { style: gridStyles, children: courses.map((course) => (_jsx(CourseCard, { course: course, onAddToCart: () => handleAddToCart(course.id) }, course.id))) }))] }), notification && (_jsxs(_Fragment, { children: [_jsx("style", { children: `
            @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          ` }), _jsx("div", { style: notificationStyles, children: notification })] })), showScrollButton && (_jsxs(_Fragment, { children: [_jsx("style", { children: `
            .scroll-to-top {
              position: fixed;
              bottom: 20px;
              right: 20px;
              width: 50px;
              height: 50px;
              background-color: var(--color-accent);
              color: white;
              border: none;
              border-radius: 50%;
              font-size: 24px;
              cursor: pointer;
              box-shadow: 0 4px 14px rgba(205, 37, 50, 0.4);
              transition: transform 0.2s, opacity 0.2s;
              z-index: 1000;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .scroll-to-top:hover {
              transform: scale(1.1);
            }
          ` }), _jsx("button", { className: "scroll-to-top", onClick: scrollToTop, title: "\u041D\u0430\u0432\u0435\u0440\u0445", children: "\u2191" })] }))] }));
};
