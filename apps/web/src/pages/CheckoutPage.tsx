import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export const CheckoutPage: React.FC = () => {
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
    } else if (items.length === 0) {
      navigate('/cart');
    }
  }, [token, items.length, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      } catch (err) {
        console.error('Checkout failed:', err);
        alert('Ошибка при оформлении заказа');
        setShowPaymentModal(false);
      } finally {
        setProcessing(false);
      }
    }, 2500);
  };

  const styles: React.CSSProperties = {
    padding: 'clamp(30px, 5vw, 60px) 0',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(24px, 5vw, 32px)',
    fontWeight: 700,
    marginBottom: 'clamp(20px, 4vw, 32px)',
    textAlign: 'center',
  };

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px',
  };

  const summaryStyles: React.CSSProperties = {
    marginBottom: '24px',
    paddingTop: '24px',
    borderTop: '1px solid var(--color-border)',
  };

  const rowStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '14px',
  };

  const totalStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 0',
    fontSize: 'clamp(20px, 4vw, 24px)',
    fontWeight: 700,
    borderTop: '1px solid var(--color-border)',
    marginTop: '8px',
  };

  const infoStyles: React.CSSProperties = {
    padding: '16px',
    backgroundColor: 'var(--color-block)',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: 'clamp(13px, 2vw, 14px)',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
  };

  // Стили модального окна
  const modalOverlayStyles: React.CSSProperties = {
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

  const modalStyles: React.CSSProperties = {
    backgroundColor: 'white',
    padding: 'clamp(24px, 5vw, 40px)',
    borderRadius: '16px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
  };

  const spinnerStyles: React.CSSProperties = {
    width: '60px',
    height: '60px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid var(--color-accent)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  };

  return (
    <Layout>
      <div className="container" style={styles}>
        <h1 style={titleStyles}>Оформление заказа</h1>
        <Card>
          <div style={formStyles}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Контактные данные</h3>
            <Input
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={summaryStyles}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Ваш заказ</h3>
            {items.map((item) => (
              <div key={item.id} style={rowStyles}>
                <span>{item.course.title}</span>
                <span style={{ fontWeight: 600 }}>{item.course.price.toLocaleString()} ₽</span>
              </div>
            ))}
          </div>

          <div style={totalStyles}>
            <span>Итого:</span>
            <span style={{ color: 'var(--color-accent)' }}>{total.toLocaleString()} ₽</span>
          </div>

          <div style={infoStyles}>
            💳 Оплата банковской картой<br />
            После оформления с вами свяжется менеджер
          </div>

          <Button fullWidth size="large" onClick={handleCheckout} disabled={processing}>
            {processing ? 'Обработка...' : 'Оплатить'}
          </Button>
        </Card>
      </div>

      {/* Модальное окно оплаты */}
      {showPaymentModal && (
        <div style={modalOverlayStyles}>
          <div style={modalStyles}>
            {paymentSuccess ? (
              <>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
                  Заказ успешно оформлен!
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Наш менеджер свяжется с вами в ближайшее время.
                </p>
              </>
            ) : (
              <>
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
                <div style={spinnerStyles}></div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
                  Обработка платежа...
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Пожалуйста, подождите
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};
