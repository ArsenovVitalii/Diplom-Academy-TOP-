import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { api } from '../api/client';
export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.auth.login(email, password);
            if (response.user.role !== 'admin') {
                setError('Доступ только для администраторов');
                return;
            }
            localStorage.setItem('adminToken', response.access_token);
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.message || 'Ошибка входа');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { style: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsxs(Card, { padding: "40px", children: [_jsx("h1", { style: { fontSize: '28px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }, children: "\u0410\u0434\u043C\u0438\u043D-\u043F\u0430\u043D\u0435\u043B\u044C" }), _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }, children: [_jsx(Input, { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx(Input, { label: "\u041F\u0430\u0440\u043E\u043B\u044C", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), error && _jsx("div", { style: { color: 'var(--color-accent)', fontSize: '14px', textAlign: 'center' }, children: error }), _jsx(Button, { type: "submit", disabled: loading, children: loading ? 'Вход...' : 'Войти' })] })] }) }));
};
