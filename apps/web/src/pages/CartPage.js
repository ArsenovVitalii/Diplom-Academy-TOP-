import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
export const CartPage = () => {
    const { items, removeItem, total } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();
    if (!token) {
        return (_jsx(Layout, { children: _jsxs("div", { className: "container", style: { padding: '60px', textAlign: 'center' }, children: [_jsx("p", { style: { marginBottom: '20px', fontSize: '18px' }, children: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u043E\u0440\u0437\u0438\u043D\u0443" }), _jsx(Link, { to: "/login", children: _jsx(Button, { children: "\u0412\u043E\u0439\u0442\u0438" }) })] }) }));
    }
    const styles = {
        padding: 'clamp(30px, 5vw, 60px) 0',
    };
    const titleStyles = {
        fontSize: 'clamp(24px, 5vw, 36px)',
        fontWeight: 700,
        marginBottom: 'clamp(20px, 4vw, 40px)',
    };
    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: items.length > 0 ? '1fr minmax(250px, 350px)' : '1fr',
        gap: '24px',
        alignItems: 'start',
    };
    const itemsStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    };
    const itemStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
    };
    const summaryStyles = {
        padding: '24px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        position: 'sticky',
        top: '100px',
    };
    const emptyStyles = {
        textAlign: 'center',
        padding: '60px',
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "container", style: styles, children: [_jsx("h1", { style: titleStyles, children: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430" }), items.length === 0 ? (_jsx(Card, { children: _jsxs("div", { style: emptyStyles, children: [_jsx("p", { style: { fontSize: '20px', marginBottom: '20px' }, children: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430" }), _jsx(Link, { to: "/catalog", children: _jsx(Button, { children: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433" }) })] }) })) : (_jsxs("div", { style: gridStyles, children: [_jsx("div", { style: itemsStyles, children: items.map((item) => (_jsx(Card, { children: _jsxs("div", { style: itemStyles, children: [_jsxs("div", { children: [_jsx("h3", { style: { fontWeight: 600, marginBottom: '4px' }, children: item.course.title }), _jsxs("span", { style: { color: 'var(--color-accent)', fontWeight: 700 }, children: [item.course.price.toLocaleString(), " \u20BD"] })] }), _jsx(Button, { variant: "outline", size: "small", onClick: () => removeItem(item.course_id), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] }) }, item.id))) }), _jsx(Card, { children: _jsxs("div", { style: summaryStyles, children: [_jsx("h3", { style: { fontSize: '20px', fontWeight: 600, marginBottom: '20px' }, children: "\u0418\u0442\u043E\u0433\u043E" }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }, children: [_jsx("span", { children: "\u041A\u0443\u0440\u0441\u043E\u0432:" }), _jsx("span", { style: { fontWeight: 600 }, children: items.length })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }, children: [_jsx("span", { style: { fontSize: '20px', fontWeight: 700 }, children: "\u0421\u0443\u043C\u043C\u0430:" }), _jsxs("span", { style: { fontSize: '20px', fontWeight: 700, color: 'var(--color-accent)' }, children: [total.toLocaleString(), " \u20BD"] })] }), _jsx(Button, { fullWidth: true, onClick: () => navigate('/checkout'), children: "\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437" })] }) })] }))] }), _jsx("style", { children: `
        @media (max-width: 640px) {
          .container > div > div { grid-template-columns: 1fr !important; }
          .container > div > div > div:last-child { position: static !important; }
        }
      ` })] }));
};
