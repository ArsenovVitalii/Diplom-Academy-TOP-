import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  duration: string;
  age_badge: string;
}

interface CourseCardProps {
  course: Course;
  showAddToCart?: boolean;
  onAddToCart?: (e?: React.MouseEvent) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onAddToCart }) => {
  const styles: React.CSSProperties = {
    padding: '0',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: 'clamp(120px, 20vw, 160px)',
    backgroundColor: 'var(--color-block)',
    backgroundImage: course.image_url ? `url(${course.image_url})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'clamp(32px, 6vw, 48px)',
    position: 'relative',
  };

  const badgeStyles: React.CSSProperties = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'var(--color-accent)',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
  };

  const contentStyles: React.CSSProperties = {
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(16px, 3vw, 18px)',
    fontWeight: 600,
    marginBottom: '8px',
    minHeight: 'auto',
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: 'clamp(13px, 2vw, 14px)',
    color: 'var(--color-text-secondary)',
    marginBottom: '12px',
    flex: 1,
  };

  const metaStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
  };

  const metaItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const footerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid var(--color-border)',
  };

  const priceStyles: React.CSSProperties = {
    fontSize: 'clamp(18px, 3vw, 20px)',
    fontWeight: 700,
    color: 'var(--color-accent)',
  };

  const getEmoji = () => {
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

  return (
    <Card hover style={styles}>
      <div style={imageStyles}>
        {!course.image_url && <span>{getEmoji()}</span>}
        <span style={badgeStyles}>{course.age_badge}</span>
      </div>
      <div style={contentStyles}>
        <h3 style={titleStyles}>{course.title}</h3>
        <p style={descriptionStyles}>{course.description}</p>
        <div style={metaStyles}>
          <span style={metaItemStyles}>⏱️ {course.duration}</span>
        </div>
        <div style={footerStyles}>
          <span style={priceStyles}>{course.price.toLocaleString()} ₽</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {onAddToCart && (
              <Button size="small" onClick={() => onAddToCart()}>
                В корзину
              </Button>
            )}
            <Link to={`/course/${course.id}`}>
              <Button variant="outline" size="small">Подробнее</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};
