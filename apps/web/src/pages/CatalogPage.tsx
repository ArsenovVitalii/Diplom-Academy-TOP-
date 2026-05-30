import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { CourseCard } from '../components/features/CourseCard';
import { api } from '../api/client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type SortOption = 'none' | 'price-asc' | 'price-desc';
type DurationFilter = 'all' | '3' | '6' | '12';

export const CatalogPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Фильтры и сортировка
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');
  
  const { addItem, isItemInCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  // Показываем кнопку "Наверх" при скролле
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    api.courses.getAll()
      .then(setCourses)
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  // Фильтрация и сортировка курсов
  useEffect(() => {
    let result = [...courses];

    // Поиск по названию и описанию
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      );
    }

    // Фильтр по длительности
    if (durationFilter !== 'all') {
      result = result.filter(course => {
        const durationText = (course.duration || '').toLowerCase();
        return durationText.includes(`${durationFilter} месяц`) ||
               durationText.includes(`${durationFilter} мес`);
      });
    }

    // Сортировка по цене
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredCourses(result);
  }, [courses, searchQuery, sortOption, durationFilter]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Стили для панели фильтров
  const filterPanelStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: 'clamp(20px, 4vw, 40px)',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    alignItems: 'center',
  };

  const searchInputStyles: React.CSSProperties = {
    flex: '1 1 250px',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const selectStyles: React.CSSProperties = {
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none',
    minWidth: '180px',
  };

  const durationButtonsStyles: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  };

  const durationButtonStyles = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: isActive ? 'var(--color-accent)' : '#e9ecef',
    color: isActive ? 'white' : '#333',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: isActive ? 600 : 400,
  });

  const handleAddToCart = async (courseId: string) => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    console.log('[CatalogPage] handleAddToCart called for courseId:', courseId);
    console.log('[CatalogPage] isItemInCart:', isItemInCart(courseId));
    
    try {
      const result = await addItem(courseId);
      
      console.log('[CatalogPage] addItem result:', result);
      
      if (result.alreadyInCart) {
        console.log('[CatalogPage] Showing already in cart notification');
        showNotification('⚠️ Этот курс уже в вашей корзине');
      } else if (result.success) {
        console.log('[CatalogPage] Showing success notification');
        showNotification('Курс добавлен в корзину');
      } else {
        console.log('[CatalogPage] Showing error notification');
        showNotification('Не удалось добавить курс в корзину');
      }
    } catch (err) {
      console.error('[CatalogPage] Failed to add to cart:', err);
      showNotification('Не удалось добавить курс в корзину');
    }
  };

  const styles: React.CSSProperties = {
    padding: 'clamp(30px, 5vw, 60px) 0',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: 700,
    marginBottom: 'clamp(20px, 4vw, 40px)',
    textAlign: 'center',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  };

  const loadingStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: '60px',
    fontSize: '18px',
  };

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

  return (
    <Layout>
      <div className="container" style={styles}>
        <h1 style={titleStyles}>Каталог курсов</h1>
        
        {/* Панель фильтров и поиска */}
        <div style={filterPanelStyles}>
          {/* Поиск */}
          <input
            type="text"
            placeholder="Поиск курсов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyles}
          />
          
          {/* Сортировка */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            style={selectStyles}
          >
            <option value="none">Без сортировки</option>
            <option value="price-asc">Сначала дешёвые</option>
            <option value="price-desc">Сначала дорогие</option>
          </select>
          
          {/* Фильтр по длительности */}
          <div style={durationButtonsStyles}>
            <span style={{ alignSelf: 'center', fontWeight: 500, marginRight: '8px' }}>Длительность:</span>
            {(['all', '3', '6', '12'] as DurationFilter[]).map((duration) => (
              <button
                key={duration}
                onClick={() => setDurationFilter(duration)}
                style={durationButtonStyles(durationFilter === duration)}
              >
                {duration === 'all' ? 'Все' : `${duration} мес.`}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div style={loadingStyles}>Загрузка...</div>
        ) : (
          <div style={gridStyles}>
            {filteredCourses.length === 0 ? (
              <div style={{ ...loadingStyles, gridColumn: '1 / -1' }}>
                Курсы не найдены
              </div>
            ) : (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onAddToCart={() => handleAddToCart(course.id)}
                  isInCart={isItemInCart(course.id)}
                />
              ))
            )}
          </div>
        )}
      </div>
      
      {/* Уведомление */}
      {notification && (
        <>
          <style>{`
            @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `}</style>
          <div style={notificationStyles}>{notification}</div>
        </>
      )}

      {/* Кнопка "Наверх" */}
      {showScrollButton && (
        <>
          <style>{`
            .scroll-to-top {
              position: fixed;
              bottom: 20px;
              right: 20px;
              width: 50px;
              height: 50px;
              background-color: var(--color-accent);
              color: white;
              border: none;
              border-radius: 50%;
              font-size: 24px;
              cursor: pointer;
              box-shadow: 0 4px 14px rgba(205, 37, 50, 0.4);
              transition: transform 0.2s, opacity 0.2s;
              z-index: 1000;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .scroll-to-top:hover {
              transform: scale(1.1);
            }
          `}</style>
          <button className="scroll-to-top" onClick={scrollToTop} title="Наверх">
            ↑
          </button>
        </>
      )}
    </Layout>
  );
};
