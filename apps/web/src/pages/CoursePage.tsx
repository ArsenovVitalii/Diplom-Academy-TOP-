import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { api } from '../api/client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface Review {
  id: string;
  rating: number;
  text: string;
  created_at: string;
  user_name: string;
  user_avatar_url?: string;
}

export const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  const { addItem, isItemInCart } = useCart();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  // Проверяем, в корзине ли курс
  const isInCart = course?.id ? isItemInCart(course.id) : false;

  // Функция показа уведомлений (как в CatalogPage)
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    if (id) {
      api.courses.getById(id)
        .then(setCourse)
        .catch(() => setCourse(null))
        .finally(() => setLoading(false));
      
      // Загрузка отзывов
      api.courses.getReviews(id)
        .then(setReviews)
        .catch(() => setReviews([]));
    }
  }, [id]);

  const handleAddToCart = async (e?: React.MouseEvent) => {
    // Блокируем любые стандартные действия браузера
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('[CoursePage] ===== handleAddToCart START =====');
    console.log('[CoursePage] Course ID:', course?.id);
    console.log('[CoursePage] Token exists:', !!token);
    console.log('[CoursePage] isInCart:', isInCart);
    
    if (!token) {
      console.log('[CoursePage] No token, navigating to login');
      navigate('/login');
      return;
    }
    
    if (!course) {
      console.log('[CoursePage] No course, returning');
      return;
    }
    
    try {
      const result = await addItem(course.id);
      console.log('[CoursePage] addItem result:', result);
      
      if (result.alreadyInCart) {
        console.log('[CoursePage] Course already in cart, showing notification');
        showNotification('⚠️ Этот курс уже в вашей корзине');
      } else if (result.success) {
        console.log('[CoursePage] Course added successfully, showing notification');
        showNotification('Курс добавлен в корзину');
      } else {
        console.log('[CoursePage] Failed to add, showing error notification');
        showNotification('❌ Не удалось добавить курс в корзину');
      }
    } catch (err) {
      console.error('[CoursePage] Error in handleAddToCart:', err);
      showNotification('❌ Не удалось добавить курс в корзину');
    }
    
    console.log('[CoursePage] ===== handleAddToCart END =====');
  };

  const handleSubmitReview = async () => {
    if (!token || !id || !newReviewText.trim()) {
      if (!token) {
        showNotification('Пожалуйста, войдите в систему, чтобы оставить отзыв');
        navigate('/login');
      }
      return;
    };
    
    if (newReviewText.trim().length < 10) {
      showNotification('Текст отзыва должен быть не менее 10 символов');
      return;
    };
    
    setSubmittingReview(true);
    try {
      console.log('Submitting review:', { courseId: id, rating: newReviewRating, text: newReviewText });
      
      const response = await api.courses.createReview(id, {
        rating: newReviewRating,
        text: newReviewText.trim()
      });
      
      console.log('Review submitted successfully:', response);
      
      setNewReviewText('');
      setNewReviewRating(5);
      
      // Перезагрузка отзывов
      const updatedReviews = await api.courses.getReviews(id);
      setReviews(updatedReviews);
      
      showNotification('Отзыв успешно добавлен!');
    } catch (err: any) {
      console.error('Failed to submit review:', err);
      const errorMsg = err?.message || err?.data?.detail || 'Не удалось отправить отзыв';
      showNotification(`❌ Ошибка: ${errorMsg}`);
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => interactive && setNewReviewRating(i)}
          style={{
            cursor: interactive ? 'pointer' : 'default',
            fontSize: '20px',
            color: i <= rating ? '#ffc107' : '#e0e0e0'
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  // Стили для уведомлений (как в каталоге)
  const notificationStyles: React.CSSProperties = {
    position: 'fixed',
    top: '100px',
    right: '20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease',
    fontSize: '16px',
    fontWeight: 500,
  };

  const reviewsSectionStyles: React.CSSProperties = {
    marginTop: '40px',
    borderTop: '1px solid #eee',
    paddingTop: '40px',
  };

  const reviewsHeaderStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  };

  const reviewCardStyles: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
  };

  const reviewHeaderStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  };

  const avatarStyles: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 600,
    fontSize: '16px',
  };

  const reviewFormStyles: React.CSSProperties = {
    backgroundColor: '#f0f4f8',
    borderRadius: '12px',
    padding: '24px',
    marginTop: '30px',
  };

  const textareaStyles: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  const starRatingStyles: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
    marginBottom: '12px',
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
              <Button 
                size="large" 
                fullWidth 
                onClick={handleAddToCart}
                variant={isInCart ? 'outline' : 'primary'}
              >
                {isInCart ? '✓ В корзине' : 'Добавить в корзину'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Блок отзывов */}
        <Card style={reviewsSectionStyles}>
          <div style={reviewsHeaderStyles}>
            <h2>Отзывы ({reviews.length})</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px', color: '#ffc107' }}>★</span>
              <span style={{ fontSize: '20px', fontWeight: 600 }}>{averageRating}</span>
            </div>
          </div>

          {/* Форма добавления отзыва (только для залогиненных) */}
          {token && (
            <div style={reviewFormStyles}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Оставить отзыв</h3>
              <div style={starRatingStyles}>
                <span style={{ marginRight: '8px', fontSize: '14px', color: '#666' }}>Ваша оценка:</span>
                {renderStars(newReviewRating, true)}
              </div>
              <textarea
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder="Напишите ваш отзыв... (минимум 10 символов)"
                style={textareaStyles}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666', textAlign: 'right' }}>
                {newReviewText.length}/10 мин.
              </div>
              <div style={{ marginTop: '12px', textAlign: 'right' }}>
                <Button
                  size="small"
                  onClick={handleSubmitReview}
                  disabled={!newReviewText.trim() || submittingReview}
                >
                  {submittingReview ? 'Отправка...' : 'Отправить отзыв'}
                </Button>
              </div>
            </div>
          )}

          {/* Не залогинен */}
          {!token && reviews.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666' }}>
              Авторизируйтесь, чтобы оставить отзыв
            </p>
          )}

          {/* Список отзывов */}
          <div style={{ marginTop: '30px' }}>
            {reviews.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>Отзывов пока нет</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} style={reviewCardStyles}>
                  <div style={reviewHeaderStyles}>
                    <div style={avatarStyles}>
                      {review.user_avatar_url ? (
                        <img src={review.user_avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        review.user_name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{review.user_name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{formatDate(review.created_at)}</div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: '#333' }}>
                    {review.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
      
      {/* Уведомление как в каталоге */}
      {notification && (
        <>
          <style>{`
            @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `}</style>
          <div style={notificationStyles}>
            {notification}
          </div>
        </>
      )}
      
      <style>{`
        @media (max-width: 640px) {
          .container > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Layout>
  );
};