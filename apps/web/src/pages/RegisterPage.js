import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }
        if (password.length < 6) {
            setError('Пароль должен быть не менее 6 символов');
            return;
        }
        setLoading(true);
        try {
            await register(email, password);
            navigate('/');
        }
        catch (err) {
            setError(err.message || 'Ошибка регистрации');
        }
        finally {
            setLoading(false);
        }
    };
    const styles = {
        padding: 'clamp(30px, 5vw, 60px) 0',
        display: 'flex',
        justifyContent: 'center',
    };
    const formStyles = {
        maxWidth: '400px',
        width: '100%',
    };
    const titleStyles = {
        fontSize: 'clamp(22px, 5vw, 28px)',
        fontWeight: 700,
        marginBottom: 'clamp(16px, 3vw, 24px)',
        textAlign: 'center',
    };
    const linkStyles = {
        textAlign: 'center',
        marginTop: '16px',
        fontSize: '14px',
    };
    return (_jsx(Layout, { children: _jsx("div", { className: "container", style: styles, children: _jsx(Card, { children: _jsxs("div", { style: formStyles, children: [_jsx("h1", { style: titleStyles, children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }), _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsx(Input, { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "example@mail.ru", required: true }), _jsx(Input, { label: "\u041F\u0430\u0440\u043E\u043B\u044C", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u041C\u0438\u043D\u0438\u043C\u0443\u043C 6 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432", required: true }), _jsx(Input, { label: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", required: true }), error && (_jsx("div", { style: { color: 'var(--color-accent)', fontSize: '14px', textAlign: 'center' }, children: error })), _jsx(Button, { type: "submit", fullWidth: true, disabled: loading, children: loading ? 'Регистрация...' : 'Зарегистрироваться' })] }), _jsxs("div", { style: linkStyles, children: ["\u0423\u0436\u0435 \u0435\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442? ", _jsx(Link, { to: "/login", style: { color: 'var(--color-accent)' }, children: "\u0412\u043E\u0439\u0442\u0438" })] })] }) }) }) }));
};
