import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  const styles: React.CSSProperties = {
    padding: '0 0 clamp(30px, 5vw, 60px) 0',
  };

  // Hero Section
  const heroStyles: React.CSSProperties = {
    backgroundImage: 'url(/photos/hero.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: 'clamp(60px, 10vw, 120px) 0',
    textAlign: 'center',
    position: 'relative',
  };

  const heroTitleStyles: React.CSSProperties = {
    fontSize: 'clamp(32px, 6vw, 56px)',
    fontWeight: 800,
    marginBottom: 'clamp(12px, 2vw, 16px)',
    lineHeight: 1.2,
    color: '#FFFFFF',
  };

  const heroSubtitleStyles: React.CSSProperties = {
    fontSize: 'clamp(16px, 3vw, 24px)',
    color: '#FFFFFF',
    marginBottom: 'clamp(24px, 4vw, 40px)',
  };

  // Почему мы
  const whyUsStyles: React.CSSProperties = {
    padding: 'clamp(40px, 8vw, 80px) 0',
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 'clamp(24px, 5vw, 48px)',
  };

  const whyUsGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  };

  const whyUsCardStyles: React.CSSProperties = {
    padding: 'clamp(20px, 4vw, 32px)',
    backgroundColor: 'var(--color-block)',
    borderRadius: '16px',
    textAlign: 'center',
  };

  const whyUsIconStyles: React.CSSProperties = {
    fontSize: 'clamp(36px, 6vw, 48px)',
    marginBottom: '16px',
  };

  const whyUsTitleStyles: React.CSSProperties = {
    fontSize: 'clamp(16px, 3vw, 20px)',
    fontWeight: 600,
    marginBottom: '12px',
  };

  const whyUsDescStyles: React.CSSProperties = {
    fontSize: 'clamp(13px, 2vw, 15px)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
  };

  // Цифры
  const numbersStyles: React.CSSProperties = {
    backgroundColor: 'var(--color-accent)',
    padding: 'clamp(40px, 8vw, 60px) 0',
    color: 'white',
  };

  const numbersGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 'clamp(16px, 4vw, 24px)',
    textAlign: 'center',
  };

  const numberValueStyles: React.CSSProperties = {
    fontSize: 'clamp(32px, 6vw, 48px)',
    fontWeight: 800,
    marginBottom: '8px',
  };

  const numberLabelStyles: React.CSSProperties = {
    fontSize: 'clamp(13px, 2vw, 16px)',
    opacity: 0.9,
  };

  // Как проходит обучение
  const learningStyles: React.CSSProperties = {
    padding: 'clamp(40px, 8vw, 80px) 0',
  };

  const learningGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(16px, 3vw, 24px)',
  };

  const learningCardStyles: React.CSSProperties = {
    padding: 'clamp(24px, 4vw, 40px)',
    border: '2px solid var(--color-border)',
    borderRadius: '16px',
    textAlign: 'center',
  };

  const learningIconStyles: React.CSSProperties = {
    fontSize: 'clamp(40px, 8vw, 64px)',
    marginBottom: '20px',
  };

  const learningTitleStyles: React.CSSProperties = {
    fontSize: 'clamp(18px, 3vw, 24px)',
    fontWeight: 600,
    marginBottom: '12px',
  };

  const learningDescStyles: React.CSSProperties = {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: 'var(--color-text-secondary)',
  };

  // Отзывы
  const reviewsStyles: React.CSSProperties = {
    padding: 'clamp(40px, 8vw, 80px) 0',
    backgroundColor: 'var(--color-block)',
  };

  const reviewsGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(16px, 3vw, 24px)',
  };

  const reviewCardStyles: React.CSSProperties = {
    padding: 'clamp(16px, 3vw, 24px)',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  };

  const reviewTextStyles: React.CSSProperties = {
    fontSize: 'clamp(14px, 2vw, 16px)',
    lineHeight: 1.6,
    marginBottom: '16px',
    fontStyle: 'italic',
  };

  const reviewAuthorStyles: React.CSSProperties = {
    fontSize: 'clamp(13px, 2vw, 14px)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
  };

  // CTA Section
  const ctaStyles: React.CSSProperties = {
    padding: 'clamp(40px, 8vw, 80px) 0',
    textAlign: 'center',
  };

  const ctaTitleStyles: React.CSSProperties = {
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: 700,
    marginBottom: 'clamp(20px, 4vw, 32px)',
  };

  const ctaButtonsStyles: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  return (
    <Layout>
      <div style={styles}>
        {/* Hero Section */}
        <section style={heroStyles} className="hero-section">
          <div className="hero-overlay" />
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
              <h1 style={heroTitleStyles}>Твой старт в IT с TOP IT SCHOOL</h1>
              <p style={heroSubtitleStyles}>Образование, которое меняет будущее</p>
              <a href="tel:+74951234567">
                <Button size="large" style={{ backgroundColor: 'var(--color-accent)', color: 'white', boxShadow: '0 4px 14px rgba(205, 37, 50, 0.4)' }}>
                  Записаться на консультацию
                </Button>
              </a>
            </div>
            <div style={{ flex: '0 0 auto' }} className="hero-image-container">
              <img 
                src="/photos/kaf.svg" 
                alt="Hero" 
                className="hero-image"
              />
            </div>
          </div>
        </section>

        {/* Почему мы */}
        <section style={whyUsStyles}>
          <div className="container">
            <h2 style={sectionTitleStyles}>Почему мы?</h2>
            <div style={whyUsGridStyles}>
              <div style={whyUsCardStyles}>
                <img 
                  src="/photos/lamp.svg" 
                  alt="Образование без границ" 
                  style={{ 
                    width: 'clamp(40px, 8vw, 64px)', 
                    height: 'clamp(40px, 8vw, 64px)',
                    marginBottom: '16px'
                  }} 
                />
                <h3 style={whyUsTitleStyles}>Образование без границ</h3>
                <p style={whyUsDescStyles}>142 филиала по всему миру, 250 000+ выпускников</p>
              </div>
              <div style={whyUsCardStyles}>
                <img 
                  src="/photos/note.svg" 
                  alt="Практика с первого дня" 
                  style={{ 
                    width: 'clamp(40px, 8vw, 64px)', 
                    height: 'clamp(40px, 8vw, 64px)',
                    marginBottom: '16px'
                  }} 
                />
                <h3 style={whyUsTitleStyles}>Практика с первого дня</h3>
                <p style={whyUsDescStyles}>90% времени — реальные проекты. Преподаватели — действующие IT-специалисты</p>
              </div>
              <div style={whyUsCardStyles}>
                <img 
                  src="/photos/rocket.svg" 
                  alt="Старт карьеры до диплома" 
                  style={{ 
                    width: 'clamp(40px, 8vw, 64px)', 
                    height: 'clamp(40px, 8vw, 64px)',
                    marginBottom: '16px'
                  }} 
                />
                <h3 style={whyUsTitleStyles}>Старт карьеры до диплома</h3>
                <p style={whyUsDescStyles}>Помогаем с трудоустройством в ведущие IT-компании. Выпускники работают в 36 странах</p>
              </div>
              <div style={whyUsCardStyles}>
                <img 
                  src="/photos/earth.svg" 
                  alt="Международные дипломы" 
                  style={{ 
                    width: 'clamp(40px, 8vw, 64px)', 
                    height: 'clamp(40px, 8vw, 64px)',
                    marginBottom: '16px'
                  }} 
                />
                <h3 style={whyUsTitleStyles}>Международные дипломы</h3>
                <p style={whyUsDescStyles}>Дипломы на русском и английском, сертификаты Cisco, Microsoft, Autodesk</p>
              </div>
              <div style={whyUsCardStyles}>
                <img 
                  src="/photos/tech.svg" 
                  alt="Актуальные технологии" 
                  style={{ 
                    width: 'clamp(40px, 8vw, 64px)', 
                    height: 'clamp(40px, 8vw, 64px)',
                    marginBottom: '16px'
                  }} 
                />
                <h3 style={whyUsTitleStyles}>Актуальные технологии</h3>
                <p style={whyUsDescStyles}>Изучаем Python, JavaScript, нейросети, DevOps, Unity</p>
              </div>
              <div style={whyUsCardStyles}>
                <img 
                  src="/photos/doc.svg" 
                  alt="Помощь с портфолио" 
                  style={{ 
                    width: 'clamp(40px, 8vw, 64px)', 
                    height: 'clamp(40px, 8vw, 64px)',
                    marginBottom: '16px'
                  }} 
                />
                <h3 style={whyUsTitleStyles}>Помощь с портфолио</h3>
                <p style={whyUsDescStyles}>Собираем сильное портфолио из реальных проектов</p>
              </div>
            </div>
          </div>
        </section>

        {/* Цифры */}
        <section style={numbersStyles}>
          <div className="container">
            <div style={numbersGridStyles}>
              <div>
                <div style={numberValueStyles}>250 000+</div>
                <div style={numberLabelStyles}>выпускников</div>
              </div>
              <div>
                <div style={numberValueStyles}>72 000</div>
                <div style={numberLabelStyles}>студентов</div>
              </div>
              <div>
                <div style={numberValueStyles}>380</div>
                <div style={numberLabelStyles}>филиалов</div>
              </div>
              <div>
                <div style={numberValueStyles}>10</div>
                <div style={numberLabelStyles}>стран</div>
              </div>
            </div>
          </div>
        </section>

        {/* Как проходит обучение */}
        <section style={learningStyles}>
          <div className="container">
            <h2 style={sectionTitleStyles}>Как проходит обучение</h2>
            <div style={learningGridStyles}>
              <div style={learningCardStyles}>
                <img 
                  src="/photos/campus.svg" 
                  alt="Очно в кампусах" 
                  style={{ 
                    width: 'clamp(40px, 8vw, 64px)', 
                    height: 'clamp(40px, 8vw, 64px)',
                    marginBottom: '16px'
                  }} 
                />
                <h3 style={learningTitleStyles}>Очно в кампусах</h3>
                <p style={learningDescStyles}>Современное оборудование, живое общение с преподавателями и однокурсниками</p>
              </div>
              <div style={learningCardStyles}>
                <img 
                  src="/photos/online.svg" 
                  alt="Онлайн из любой точки мира" 
                  style={{ 
                    width: 'clamp(40px, 8vw, 64px)', 
                    height: 'clamp(40px, 8vw, 64px)',
                    marginBottom: '16px'
                  }} 
                />
                <h3 style={learningTitleStyles}>Онлайн из любой точки мира</h3>
                <p style={learningDescStyles}>Лекции в реальном времени, без скучных записей, интерактивные задания</p>
              </div>
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section style={reviewsStyles}>
          <div className="container">
            <h2 style={sectionTitleStyles}>Отзывы студентов</h2>
            <div style={reviewsGridStyles}>
              <div style={reviewCardStyles}>
                <p style={reviewTextStyles}>⭐ "Учусь на разработке ПО. Очень много практики, преподаватели из IT-компаний, всё по делу. Уже делаю реальные проекты!"</p>
                <p style={reviewAuthorStyles}>— Читак Хакерский</p>
              </div>
              <div style={reviewCardStyles}>
                <p style={reviewTextStyles}>⭐ "Отличный колледж, сын учится на программиста, с первого курса уже начали изучать профильные дисциплины, участвовал в хакатоне. Преподаватели-практики!"</p>
                <p style={reviewAuthorStyles}>— Татьяна</p>
              </div>
              <div style={reviewCardStyles}>
                <p style={reviewTextStyles}>⭐ "Колледж оправдал все ожидания. Преподаватели профессионалы своего дела, современное оборудование. Рекомендую!"</p>
                <p style={reviewAuthorStyles}>— Екатерина</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={ctaStyles}>
          <div className="container">
            <h2 style={ctaTitleStyles}>Начни сегодня</h2>
            <div style={ctaButtonsStyles}>
              <Link to="/courses">
                <Button size="large">Перейти к курсам</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Плавающая кнопка "Наверх" */}
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

      <style>{`
        .hero-image {
          max-width: 448px;
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .hero-image-container {
          flex: 0 0 auto;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 0;
        }
        @media (max-width: 768px) {
          section > div > h1 { font-size: 36px !important; }
          section > div > p { font-size: 18px !important; }
          .container > div { grid-template-columns: 1fr !important; }
          .container > div > div { grid-template-columns: 1fr !important; }
          .hero-section .container {
            flex-direction: column !important;
            text-align: center;
          }
          .hero-section .container > div:first-child {
            text-align: center !important;
          }
        }
      `}</style>
    </Layout>
  );
};
