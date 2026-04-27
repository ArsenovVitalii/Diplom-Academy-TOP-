import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
export const Sidebar = ({ active }) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };
    const openWebsite = () => {
        window.open('http://localhost:3000', '_blank');
    };
    const styles = {
        width: '240px',
        backgroundColor: 'var(--color-block)',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
    };
    const logoStyles = {
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--color-accent)',
        marginBottom: '40px',
        textAlign: 'center',
    };
    const navStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1,
    };
    const linkStyles = (isActive) => ({
        padding: '12px 16px',
        borderRadius: '4px',
        fontWeight: 500,
        backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
        color: isActive ? 'white' : 'var(--color-text)',
        transition: 'background-color 0.2s',
    });
    const buttonStyles = {
        padding: '12px 16px',
        borderRadius: '4px',
        fontWeight: 500,
        backgroundColor: 'transparent',
        color: 'var(--color-text)',
        transition: 'background-color 0.2s',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    };
    return (_jsxs("aside", { style: styles, children: [_jsx("div", { style: logoStyles, children: "ADMIN" }), _jsxs("nav", { style: navStyles, children: [_jsx(Link, { to: "/dashboard", style: linkStyles(active === 'dashboard'), children: "\uD83D\uDCCA \u0414\u0430\u0448\u0431\u043E\u0440\u0434" }), _jsx(Link, { to: "/courses", style: linkStyles(active === 'courses'), children: "\uD83D\uDCDA \u041A\u0443\u0440\u0441\u044B" }), _jsx(Link, { to: "/users", style: linkStyles(active === 'users'), children: "\uD83D\uDC65 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438" }), _jsx(Link, { to: "/hero-settings", style: linkStyles(active === 'hero-settings'), children: "\uD83C\uDFA8 \u0425\u0438\u0440\u043E-\u043F\u0430\u043D\u0435\u043B\u044C" }), _jsx("button", { onClick: openWebsite, style: buttonStyles, children: "\uD83C\uDF10 \u041D\u0430 \u0441\u0430\u0439\u0442" })] }), _jsx("button", { onClick: logout, style: { marginTop: 'auto', padding: '12px', color: 'var(--color-accent)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }, children: "\u0412\u044B\u0439\u0442\u0438" })] }));
};
