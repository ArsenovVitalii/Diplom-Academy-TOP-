import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export const Header = () => {
    const { user, logout } = useAuth();
    const { items } = useCart();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const styles = {
        backgroundColor: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)',
        padding: '12px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    };

    const containerStyles = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const logoStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
    };

    const logoImageStyles = {
        height: '40px',
        width: 'auto',
    };

    const navStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    };

    const cartLinkStyles = {
        position: 'relative',
        fontSize: '16px',
        fontWeight: 500,
    };

    const badgeStyles = {
        position: 'absolute',
        top: '-8px',
        right: '-12px',
        backgroundColor: 'var(--color-accent)',
        color: 'white',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
    };

    const profileLinkStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: 'var(--color-text-secondary)',
    };

    const burgerStyles = {
        display: 'flex',  // По умолчанию показываем на мобильных
        flexDirection: 'column',
        gap: '5px',
        cursor: 'pointer',
        padding: '8px',
        background: 'none',
        border: 'none',
    };

    const burgerLineStyles = {
        width: '24px',
        height: '2px',
        backgroundColor: 'var(--color-text)',
        transition: '0.3s',
    };

    const mobileMenuStyles = {
        display: isMobileMenuOpen ? 'flex' : 'none',
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)',
        flexDirection: 'column',
        padding: '16px 20px',
        gap: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    };

    return (_jsxs("header", { style: styles, children: [
        _jsxs("div", { style: containerStyles, children: [
            _jsx(Link, { to: "/", style: logoStyles, children: _jsx("img", { src: "/photos/logo.svg", alt: "TOP IT SCHOOL", style: logoImageStyles, onError: (e) => {
                    e.currentTarget.style.display = 'none';
                    const textSpan = e.currentTarget.nextElementSibling;
                    if (textSpan) textSpan.style.display = 'block';
                } }) 
            }),
            // Бургер-кнопка - больше нет инлайн-стиля display, он в burgerStyles
            _jsxs("button", { style: burgerStyles, onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "burger-button", "aria-label": "Меню", children: [
                _jsx("span", { style: burgerLineStyles }),
                _jsx("span", { style: burgerLineStyles }),
                _jsx("span", { style: burgerLineStyles })
            ] }),
            _jsxs("nav", { style: navStyles, className: "desktop-nav", children: [
                _jsx(Link, { to: "/courses", style: { fontWeight: 500 }, children: "Каталог" }),
                user ? (_jsxs(_Fragment, { children: [
                    _jsxs(Link, { to: "/cart", style: cartLinkStyles, children: ["Корзина", items.length > 0 && _jsx("span", { style: badgeStyles, children: items.length })] }),
                    _jsx(Link, { to: "/profile", style: profileLinkStyles, children: _jsx("img", { src: "/photos/ava.svg", alt: "Профиль", style: { width: '24px', height: '24px', display: 'block' } }) })
                ] })) : (_jsxs(_Fragment, { children: [
                    _jsx(Link, { to: "/login", children: _jsx(Button, { variant: "outline", size: "small", children: "Войти" }) }),
                    _jsx(Link, { to: "/register", children: _jsx(Button, { size: "small", children: "Регистрация" }) })
                ] }))
            ] })
        ] }),
        _jsxs("div", { style: mobileMenuStyles, children: [
            _jsx(Link, { to: "/courses", style: { fontWeight: 500 }, onClick: () => setIsMobileMenuOpen(false), children: "Каталог" }),
            user ? (_jsxs(_Fragment, { children: [
                _jsxs(Link, { to: "/cart", style: cartLinkStyles, onClick: () => setIsMobileMenuOpen(false), children: ["Корзина", items.length > 0 && _jsx("span", { style: badgeStyles, children: items.length })] }),
                _jsxs(Link, { to: "/profile", style: profileLinkStyles, onClick: () => setIsMobileMenuOpen(false), children: [
                    _jsx("img", { src: "/photos/ava.svg", alt: "Профиль", style: { width: '24px', height: '24px', display: 'block' } }),
                    "Профиль"
                ] })
            ] })) : (_jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }, children: [
                _jsx(Link, { to: "/login", onClick: () => setIsMobileMenuOpen(false), children: _jsx(Button, { variant: "outline", size: "small", children: "Войти" }) }),
                _jsx(Link, { to: "/register", onClick: () => setIsMobileMenuOpen(false), children: _jsx(Button, { size: "small", children: "Регистрация" }) })
            ] }))
        ] }),
        _jsx("style", { children: `
            /* Мобильные (по умолчанию) - бургер виден, десктопное меню скрыто */
            .burger-button { display: flex !important; }
            .desktop-nav { display: none !important; }
            
            /* Планшеты и десктопы (768px и шире) - скрываем бургер, показываем десктопное меню */
            @media (min-width: 768px) {
                .burger-button { display: none !important; }
                .desktop-nav { display: flex !important; }
            }
            
            /* Для экранов меньше 640px оставляем бургер (уже есть) */
        ` })
    ] }));
};