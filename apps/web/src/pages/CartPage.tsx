import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CartPage: React.FC = () => {
  const { items, removeItem, total } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    return (
      <Layout>
        <div className="container" style={{ padding: '60px', textAlign: 'center' }}>
          <p style={{ marginBottom: '20px', fontSize: '18px' }}>Войдите, чтобы просмотреть корзину</p>
          <Link to="/login">
            <Button>Войти</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const styles: React.CSSProperties = {
    padding: 'clamp(30px, 5vw, 60px) 0',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: 700,
    marginBottom: 'clamp(20px, 4vw, 40px)',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: items.length > 0 ? '1fr minmax(250px, 350px)' : '1fr',
    gap: '24px',
    alignItems: 'start',
  };

  const itemsStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const itemStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
  };

  const summaryStyles: React.CSSProperties = {
    padding: '24px',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    position: 'sticky',
    top: '100px',
  };

  const emptyStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: '60px',
  };

  return (
    <Layout>
      <div className="container" style={styles}>
        <h1 style={titleStyles}>Корзина</h1>
        {items.length === 0 ? (
          <Card>
            <div style={emptyStyles}>
              <p style={{ fontSize: '20px', marginBottom: '20px' }}>Корзина пуста</p>
              <Link to="/catalog">
                <Button>Перейти в каталог</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div style={gridStyles}>
            <div style={itemsStyles}>
              {items.map((item) => (
                <Card key={item.id}>
                  <div style={itemStyles}>
                    <div>
                      <h3 style={{ fontWeight: 600, marginBottom: '4px' }}>{item.course.title}</h3>
                      <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
                        {item.course.price.toLocaleString()} ₽
                      </span>
                    </div>
                    <Button variant="outline" size="small" onClick={() => removeItem(item.course_id)}>
                      Удалить
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <Card>
              <div style={summaryStyles}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Итого</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span>Курсов:</span>
                  <span style={{ fontWeight: 600 }}>{items.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 700 }}>Сумма:</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-accent)' }}>
                    {total.toLocaleString()} ₽
                  </span>
                </div>
                <Button fullWidth onClick={() => navigate('/checkout')}>
                  Оформить заказ
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .container > div > div { grid-template-columns: 1fr !important; }
          .container > div > div > div:last-child { position: static !important; }
        }
      `}</style>
    </Layout>
  );
};
