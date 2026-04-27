import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
export const CheckoutPage = () => {
    const { items, total, clearCart } = useCart();
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: user?.email || '',
    });
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        else if (items.length === 0) {
            navigate('/cart');
        }
    }, [token, items.length, navigate]);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleCheckout = async () => {
        if (!formData.name || !formData.phone || !formData.email) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        // Показываем модальное окно с фейковой оплатой
        setShowPaymentModal(true);
        setProcessing(true);
        // Имитация обработки платежа (2-3 секунды)
        setTimeout(async () => {
            try {
                await api.orders.create({
                    customer_name: formData.name,
                    phone: formData.phone,
                });
                setPaymentSuccess(true);
                await clearCart();
                // Показываем сообщение об успехе и переходим
                setTimeout(() => {
                    setShowPaymentModal(false);
                    setPaymentSuccess(false);
                    navigate('/success');
                }, 2000);
            }
            catch (err) {
                console.error('Checkout failed:', err);
                alert('Ошибка при оформлении заказа');
                setShowPaymentModal(false);
            }
            finally {
                setProcessing(false);
            }
        }, 2500);
    };
    const styles = {
        padding: 'clamp(30px, 5vw, 60px) 0',
        maxWidth: '600px',
        margin: '0 auto',
    };
    const titleStyles = {
        fontSize: 'clamp(24px, 5vw, 32px)',
        fontWeight: 700,
        marginBottom: 'clamp(20px, 4vw, 32px)',
        textAlign: 'center',
    };
    const formStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px',
    };
    const summaryStyles = {
        marginBottom: '24px',
        paddingTop: '24px',
        borderTop: '1px solid var(--color-border)',
    };
    const rowStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        fontSize: '14px',
    };
    const totalStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px 0',
        fontSize: 'clamp(20px, 4vw, 24px)',
        fontWeight: 700,
        borderTop: '1px solid var(--color-border)',
        marginTop: '8px',
    };
    const infoStyles = {
        padding: '16px',
        backgroundColor: 'var(--color-block)',
        borderRadius: '8px',
        marginBottom: '24px',
        fontSize: 'clamp(13px, 2vw, 14px)',
        color: 'var(--color-text-secondary)',
        textAlign: 'center',
    };
    // Стили модального окна
    const modalOverlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    };
    const modalStyles = {
        backgroundColor: 'white',
        padding: 'clamp(24px, 5vw, 40px)',
        borderRadius: '16px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%',
    };
    const spinnerStyles = {
        width: '60px',
        height: '60px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid var(--color-accent)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px',
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "container", style: styles, children: [_jsx("h1", { style: titleStyles, children: "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430" }), _jsxs(Card, { children: [_jsxs("div", { style: formStyles, children: [_jsx("h3", { style: { fontSize: '18px', fontWeight: 600, marginBottom: '8px' }, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" }), _jsx(Input, { name: "name", placeholder: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F", value: formData.name, onChange: handleChange, required: true }), _jsx(Input, { name: "phone", placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", value: formData.phone, onChange: handleChange, required: true }), _jsx(Input, { name: "email", type: "email", placeholder: "Email", value: formData.email, onChange: handleChange, required: true })] }), _jsxs("div", { style: summaryStyles, children: [_jsx("h3", { style: { fontSize: '18px', fontWeight: 600, marginBottom: '12px' }, children: "\u0412\u0430\u0448 \u0437\u0430\u043A\u0430\u0437" }), items.map((item) => (_jsxs("div", { style: rowStyles, children: [_jsx("span", { children: item.course.title }), _jsxs("span", { style: { fontWeight: 600 }, children: [item.course.price.toLocaleString(), " \u20BD"] })] }, item.id)))] }), _jsxs("div", { style: totalStyles, children: [_jsx("span", { children: "\u0418\u0442\u043E\u0433\u043E:" }), _jsxs("span", { style: { color: 'var(--color-accent)' }, children: [total.toLocaleString(), " \u20BD"] })] }), _jsxs("div", { style: infoStyles, children: ["\uD83D\uDCB3 \u041E\u043F\u043B\u0430\u0442\u0430 \u0431\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u043E\u0439 \u043A\u0430\u0440\u0442\u043E\u0439", _jsx("br", {}), "\u041F\u043E\u0441\u043B\u0435 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0441 \u0432\u0430\u043C\u0438 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440"] }), _jsx(Button, { fullWidth: true, size: "large", onClick: handleCheckout, disabled: processing, children: processing ? 'Обработка...' : 'Оплатить' })] })] }), showPaymentModal && (_jsx("div", { style: modalOverlayStyles, children: _jsx("div", { style: modalStyles, children: paymentSuccess ? (_jsxs(_Fragment, { children: [_jsx("div", { style: { fontSize: '48px', marginBottom: '16px' }, children: "\u2705" }), _jsx("h2", { style: { fontSize: '24px', fontWeight: 700, marginBottom: '12px' }, children: "\u0417\u0430\u043A\u0430\u0437 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D!" }), _jsx("p", { style: { color: 'var(--color-text-secondary)' }, children: "\u041D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F." })] })) : (_jsxs(_Fragment, { children: [_jsx("style", { children: `
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                ` }), _jsx("div", { style: spinnerStyles }), _jsx("h2", { style: { fontSize: '20px', fontWeight: 600, marginBottom: '12px' }, children: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u0430..." }), _jsx("p", { style: { color: 'var(--color-text-secondary)' }, children: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435" })] })) }) }))] }));
};
