import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const SuccessPage: React.FC = () => {
  const styles: React.CSSProperties = {
    padding: 'clamp(40px, 8vw, 80px) 0',
    textAlign: 'center',
  };

  const iconStyles: React.CSSProperties = {
    fontSize: 'clamp(48px, 10vw, 80px)',
    marginBottom: 'clamp(16px, 3vw, 24px)',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(24px, 5vw, 32px)',
    fontWeight: 700,
    marginBottom: 'clamp(12px, 2vw, 16px)',
    color: 'var(--color-accent)',
  };

  const messageStyles: React.CSSProperties = {
    fontSize: 'clamp(14px, 2vw, 18px)',
    color: 'var(--color-text-secondary)',
    marginBottom: 'clamp(20px, 4vw, 32px)',
    lineHeight: 1.6,
  };

  return (
    <Layout>
      <div className="container" style={styles}>
        <Card>
          <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
            <div style={iconStyles}>✅</div>
            <h1 style={titleStyles}>Заказ успешно создан!</h1>
            <p style={messageStyles}>
              Спасибо за ваш заказ!<br />
              С вами свяжется менеджер для подтверждения.<br />
              Информация о курсах будет отправлена на вашу почту.
            </p>
            <Link to="/courses">
              <Button>Вернуться в каталог</Button>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
