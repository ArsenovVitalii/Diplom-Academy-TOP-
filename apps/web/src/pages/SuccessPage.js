import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
export const SuccessPage = () => {
    const styles = {
        padding: 'clamp(40px, 8vw, 80px) 0',
        textAlign: 'center',
    };
    const iconStyles = {
        fontSize: 'clamp(48px, 10vw, 80px)',
        marginBottom: 'clamp(16px, 3vw, 24px)',
    };
    const titleStyles = {
        fontSize: 'clamp(24px, 5vw, 32px)',
        fontWeight: 700,
        marginBottom: 'clamp(12px, 2vw, 16px)',
        color: 'var(--color-accent)',
    };
    const messageStyles = {
        fontSize: 'clamp(14px, 2vw, 18px)',
        color: 'var(--color-text-secondary)',
        marginBottom: 'clamp(20px, 4vw, 32px)',
        lineHeight: 1.6,
    };
    return (_jsx(Layout, { children: _jsx("div", { className: "container", style: styles, children: _jsx(Card, { children: _jsxs("div", { style: { padding: '40px', maxWidth: '500px', margin: '0 auto' }, children: [_jsx("div", { style: iconStyles, children: "\u2705" }), _jsx("h1", { style: titleStyles, children: "\u0417\u0430\u043A\u0430\u0437 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D!" }), _jsxs("p", { style: messageStyles, children: ["\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u0437\u0430\u043A\u0430\u0437!", _jsx("br", {}), "\u0421 \u0432\u0430\u043C\u0438 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0434\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F.", _jsx("br", {}), "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043A\u0443\u0440\u0441\u0430\u0445 \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043D\u0430 \u0432\u0430\u0448\u0443 \u043F\u043E\u0447\u0442\u0443."] }), _jsx(Link, { to: "/courses", children: _jsx(Button, { children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433" }) })] }) }) }) }));
};
