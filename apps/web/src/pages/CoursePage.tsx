import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { api } from '../api/client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.courses.getById(id)
        .then(setCourse)
        .catch(() => setCourse(null))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (course) {
      try {
        await addItem(course.id);
        navigate('/cart');
      } catch (err) {
        console.error('Failed to add to cart:', err);
      }
    }
  };

  const styles: React.CSSProperties = {
    padding: 'clamp(30px, 5vw, 60px) 0',
  };

  const contentStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '40px',
    alignItems: 'start',
  };

  const getEmoji = () => {
    if (!course) return '📚';
    const title = course.title.toLowerCase();
    if (title.includes('python')) return '🐍';
    if (title.includes('веб') || title.includes('фронт') || title.includes('бэк') || title.includes('javascript')) return '🌐';
    if (title.includes('ии') || title.includes('нейро')) return '🤖';
    if (title.includes('цифр')) return '💻';
    if (title.includes('android')) return '📱';
    if (title.includes('ios') || title.includes('iphone')) return '🍎';
    if (title.includes('unity') || title.includes('игр')) return '🎮';
    if (title.includes('devops')) return '⚙️';
    return '📚';
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: 'clamp(200px, 30vw, 300px)',
    backgroundColor: 'var(--color-block)',
    backgroundImage: course?.image_url ? `url(${course.image_url})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'clamp(48px, 10vw, 80px)',
  };

  const infoStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(24px, 5vw, 32px)',
    fontWeight: 700,
  };

  const priceStyles: React.CSSProperties = {
    fontSize: 'clamp(22px, 4vw, 28px)',
    fontWeight: 700,
    color: 'var(--color-accent)',
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: 'clamp(14px, 2vw, 16px)',
    lineHeight: 1.6,
    color: 'var(--color-text-secondary)',
  };

  if (loading) {
    return (
      <Layout>
        <div className="container" style={{ padding: '60px', textAlign: 'center' }}>
          Загрузка...
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container" style={{ padding: '60px', textAlign: 'center' }}>
          Курс не найден
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container" style={styles}>
        <Card>
          <div style={contentStyles}>
            <div style={imageStyles}>
              {!course.image_url && <span>{getEmoji()}</span>}
            </div>
            <div style={infoStyles}>
              <h1 style={titleStyles}>{course.title}</h1>
              <p style={descriptionStyles}>{course.description}</p>
              <span style={priceStyles}>{course.price.toLocaleString()} ₽</span>
              <Button size="large" fullWidth onClick={handleAddToCart}>
                Добавить в корзину
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .container > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Layout>
  );
};
