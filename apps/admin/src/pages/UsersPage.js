import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { api } from '../api/client';
export const UsersPage = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        loadUsers();
    }, []);
    const loadUsers = async () => {
        try {
            const data = await api.users.getAll();
            setUsers(data);
        }
        catch (err) {
            console.error(err);
        }
    };
    const handleDelete = async (id) => {
        if (!confirm('Удалить пользователя?'))
            return;
        try {
            await api.users.delete(id);
            loadUsers();
        }
        catch (err) {
            console.error(err);
        }
    };
    return (_jsxs("div", { style: { display: 'flex', minHeight: '100vh' }, children: [_jsx(Sidebar, { active: "users" }), _jsxs("main", { style: { flex: 1, padding: '40px' }, children: [_jsx("h1", { style: { fontSize: '32px', fontWeight: 700, marginBottom: '24px' }, children: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: users.map((user) => (_jsx(Card, { children: _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsxs("div", { children: [_jsx("p", { style: { fontWeight: 600 }, children: user.email }), _jsx("span", { style: { fontSize: '12px', padding: '4px 8px', backgroundColor: user.role === 'admin' ? 'var(--color-accent)' : 'var(--color-block)', color: user.role === 'admin' ? 'white' : 'var(--color-text)', borderRadius: '4px' }, children: user.role === 'admin' ? 'Админ' : 'Покупатель' })] }), _jsx(Button, { variant: "danger", size: "small", onClick: () => handleDelete(user.id), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] }) }, user.id))) })] })] }));
};
