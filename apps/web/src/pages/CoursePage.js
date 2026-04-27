import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { api } from '../api/client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
export const CoursePage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            api.courses.getById(id)
                .then(setCourse)
                .catch(() => setCourse(null))
                .finally(() => setLoading(false));
        }
    }, [id]);
    const handleAddToCart = async () => {
        if (!token) {
            navigate('/login');
            return;
        }
        if (course) {
            try {
                await addItem(course.id);
                navigate('/cart');
            }
            catch (err) {
                console.error('Failed to add to cart:', err);
            }
        }
    };
    const styles = {
        padding: 'clamp(30px, 5vw, 60px) 0',
    };
    const contentStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '40px',
        alignItems: 'start',
    };
    const getEmoji = () => {
        if (!course)
            return '📚';
        const title = course.title.toLowerCase();
        if (title.includes('python'))
            return '🐍';
        if (title.includes('веб') || title.includes('фронт') || title.includes('бэк') || title.includes('javascript'))
            return '🌐';
        if (title.includes('ии') || title.includes('нейро'))
            return '🤖';
        if (title.includes('цифр'))
            return '💻';
        if (title.includes('android'))
            return '📱';
        if (title.includes('ios') || title.includes('iphone'))
            return '🍎';
        if (title.includes('unity') || title.includes('игр'))
            return '🎮';
        if (title.includes('devops'))
            return '⚙️';
        return '📚';
    };
    const imageStyles = {
        width: '100%',
        height: 'clamp(200px, 30vw, 300px)',
        backgroundColor: 'var(--color-block)',
        backgroundImage: course?.image_url ? `url(${course.image_url})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(48px, 10vw, 80px)',
    };
    const infoStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    };
    const titleStyles = {
        fontSize: 'clamp(24px, 5vw, 32px)',
        fontWeight: 700,
    };
    const priceStyles = {
        fontSize: 'clamp(22px, 4vw, 28px)',
        fontWeight: 700,
        color: 'var(--color-accent)',
    };
    const descriptionStyles = {
        fontSize: 'clamp(14px, 2vw, 16px)',
        lineHeight: 1.6,
        color: 'var(--color-text-secondary)',
    };
    if (loading) {
        return (_jsx(Layout, { children: _jsx("div", { className: "container", style: { padding: '60px', textAlign: 'center' }, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." }) }));
    }
    if (!course) {
        return (_jsx(Layout, { children: _jsx("div", { className: "container", style: { padding: '60px', textAlign: 'center' }, children: "\u041A\u0443\u0440\u0441 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" }) }));
    }
    return (_jsxs(Layout, { children: [_jsx("div", { className: "container", style: styles, children: _jsx(Card, { children: _jsxs("div", { style: contentStyles, children: [_jsx("div", { style: imageStyles, children: !course.image_url && _jsx("span", { children: getEmoji() }) }), _jsxs("div", { style: infoStyles, children: [_jsx("h1", { style: titleStyles, children: course.title }), _jsx("p", { style: descriptionStyles, children: course.description }), _jsxs("span", { style: priceStyles, children: [course.price.toLocaleString(), " \u20BD"] }), _jsx(Button, { size: "large", fullWidth: true, onClick: handleAddToCart, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" })] })] }) }) }), _jsx("style", { children: `
        @media (max-width: 640px) {
          .container > div > div { grid-template-columns: 1fr !important; }
        }
      ` })] }));
};
