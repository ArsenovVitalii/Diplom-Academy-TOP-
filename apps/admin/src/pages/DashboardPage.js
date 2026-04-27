import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { api } from '../api/client';
export const DashboardPage = () => {
    const [stats, setStats] = useState({ courses: 0, users: 0 });
    useEffect(() => {
        const loadStats = async () => {
            try {
                const courses = await api.courses.getAll();
                const users = await api.users.getAll();
                setStats({ courses: courses.length, users: users.length });
            }
            catch (err) {
                console.error(err);
            }
        };
        loadStats();
    }, []);
    return (_jsxs("div", { style: { display: 'flex', minHeight: '100vh' }, children: [_jsx(Sidebar, { active: "dashboard" }), _jsxs("main", { style: { flex: 1, padding: '40px' }, children: [_jsx("h1", { style: { fontSize: '32px', fontWeight: 700, marginBottom: '32px' }, children: "\u0414\u0430\u0448\u0431\u043E\u0440\u0434" }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }, children: [_jsx(Card, { children: _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '48px', marginBottom: '8px' }, children: "\uD83D\uDCDA" }), _jsx("div", { style: { fontSize: '36px', fontWeight: 700 }, children: stats.courses }), _jsx("div", { style: { color: 'var(--color-text-secondary)' }, children: "\u041A\u0443\u0440\u0441\u043E\u0432" })] }) }), _jsx(Card, { children: _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '48px', marginBottom: '8px' }, children: "\uD83D\uDC65" }), _jsx("div", { style: { fontSize: '36px', fontWeight: 700 }, children: stats.users }), _jsx("div", { style: { color: 'var(--color-text-secondary)' }, children: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439" })] }) })] })] })] }));
};
