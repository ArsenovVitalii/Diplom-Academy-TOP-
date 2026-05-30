import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { api } from '../api/client';

export const HomePage: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [heroSettings, setHeroSettings] = useState({
    slogan: 'TOP IT SCHOOL',
    subtitle: 'Школа с углубленным изучением IT для будущих профессионалов',
    cta_text: 'Смотреть курсы',
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await api.settings.getHero();
        console.log('Loaded hero settings:', data);
        setHeroSettings({
          slogan: data.slogan || heroSettings.slogan,
          subtitle: data.subtitle || heroSettings.subtitle,
          cta_text: data.cta_text || heroSettings.cta_text,
        });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

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

  const styles = {
    padding: '0 0 clamp(30px, 5vw, 60px) 0',
  };

  const heroStyles = {
    backgroundImage: 'url(/photos/hero.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: 'clamp(60px, 10vw, 120px) 0',
    textAlign: 'center',
    position: 'relative' as const,
  };

  const heroTitleStyles = {
    fontSize: 'clamp(32px, 6vw, 56px)',
    fontWeight: 800,
    marginBottom: 'clamp(12px, 2vw, 16px)',
    lineHeight: 1.2,
    color: '#FFFFFF',
  };

  const heroSubtitleStyles = {
    fontSize: 'clamp(16px, 3vw, 24px)',
    color: '#FFFFFF',
    marginBottom: 'clamp(24px, 4vw, 40px)',
  };

  const sectionTitleStyles = {
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: 700,
    textAlign: 'center' as const,
    marginBottom: 'clamp(24px, 5vw, 48px)',
  };

  const whyUsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  };

  const whyUsCardStyles = {
    padding: 'clamp(20px, 4vw, 32px)',
    backgroundColor: 'var(--color-block)',
    borderRadius: '16px',
    textAlign: 'center' as const,
  };

  const numbersStyles = {
    backgroundColor: 'var(--color-accent)',
    padding: 'clamp(40px, 8vw, 60px) 0',
    color: 'white',
  };

  const numbersGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 'clamp(16px, 4vw, 24px)',
    textAlign: 'center' as const,
  };

  const numberValueStyles = {
    fontSize: 'clamp(32px, 6vw, 48px)',
    fontWeight: 800,
    marginBottom: '8px',
  };

  const learningGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(16px, 3vw, 24px)',
  };

  const learningCardStyles = {
    padding: 'clamp(24px, 4vw, 40px)',
    border: '2px solid var(--color-border)',
    borderRadius: '16px',
    textAlign: 'center' as const,
  };

  const reviewsStyles = {
    padding: 'clamp(40px, 8vw, 80px) 0',
    backgroundColor: 'var(--color-block)',
  };

  const reviewsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(16px, 3vw, 24px)',
  };

  const reviewCardStyles = {
    padding: 'clamp(16px, 3vw, 24px)',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  };

  const reviewTextStyles = {
    fontSize: 'clamp(14px, 2vw, 16px)',
    lineHeight: 1.6,
    marginBottom: '16px',
    fontStyle: 'italic' as const,
  };

  const reviewAuthorStyles = {
    fontSize: 'clamp(13px, 2vw, 14px)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
  };

  const ctaStyles = {
    padding: 'clamp(40px, 8vw, 80px) 0',
    textAlign: 'center' as const,
  };

  const ctaTitleStyles = {
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: 700,
    marginBottom: 'clamp(20px, 4vw, 32px)',
  };

  const ctaButtonsStyles = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  };

  return (
    <Layout>
      <div style={styles}>
        {/* Hero Section */}
        <section style={heroStyles} className="hero-section">
          <div className="hero-overlay" />
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
              <h1 style={heroTitleStyles}>{heroSettings.slogan}</h1>
              <p style={heroSubtitleStyles}>{heroSettings.subtitle}</p>
              <a href="tel:+74951234567">
                <Button size="large" style={{ backgroundColor: 'var(--color-accent)', color: 'white', boxShadow: '0 4px 14px rgba(205, 37, 50, 0.4)' }}>
                  {heroSettings.cta_text}
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
        <section style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
          <div className="container">
            <h2 style={sectionTitleStyles}>Почему мы?</h2>
            <div style={whyUsGridStyles}>
              <div style={whyUsCardStyles}>
                <img src="/photos/lamp.svg" alt="Образование без границ" style={{ width: 'clamp(40px, 8vw, 64px)', height: 'clamp(40px, 8vw, 64px)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600, marginBottom: '12px' }}>Образование без границ</h3>
                <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--color-text-secondary)' }}>142 филиала по всему миру, 250 000+ выпускников</p>
              </div>
              <div style={whyUsCardStyles}>
                <img src="/photos/note.svg" alt="Практика с первого дня" style={{ width: 'clamp(40px, 8vw, 64px)', height: 'clamp(40px, 8vw, 64px)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600, marginBottom: '12px' }}>Практика с первого дня</h3>
                <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--color-text-secondary)' }}>90% времени — реальные проекты. Преподаватели — действующие IT-специалисты</p>
              </div>
              <div style={whyUsCardStyles}>
                <img src="/photos/rocket.svg" alt="Старт карьеры до диплома" style={{ width: 'clamp(40px, 8vw, 64px)', height: 'clamp(40px, 8vw, 64px)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600, marginBottom: '12px' }}>Старт карьеры до диплома</h3>
                <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--color-text-secondary)' }}>Помогаем с трудоустройством в ведущие IT-компании</p>
              </div>
              <div style={whyUsCardStyles}>
                <img src="/photos/earth.svg" alt="Международные дипломы" style={{ width: 'clamp(40px, 8vw, 64px)', height: 'clamp(40px, 8vw, 64px)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600, marginBottom: '12px' }}>Международные дипломы</h3>
                <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--color-text-secondary)' }}>Дипломы на русском и английском</p>
              </div>
              <div style={whyUsCardStyles}>
                <img src="/photos/tech.svg" alt="Актуальные технологии" style={{ width: 'clamp(40px, 8vw, 64px)', height: 'clamp(40px, 8vw, 64px)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600, marginBottom: '12px' }}>Актуальные технологии</h3>
                <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--color-text-secondary)' }}>Изучаем Python, JavaScript, нейросети, DevOps, Unity</p>
              </div>
              <div style={whyUsCardStyles}>
                <img src="/photos/doc.svg" alt="Помощь с портфолио" style={{ width: 'clamp(40px, 8vw, 64px)', height: 'clamp(40px, 8vw, 64px)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600, marginBottom: '12px' }}>Помощь с портфолио</h3>
                <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--color-text-secondary)' }}>Собираем сильное портфолио из реальных проектов</p>
              </div>
            </div>
          </div>
        </section>

        {/* Цифры */}
        <section style={numbersStyles}>
          <div className="container">
            <div style={numbersGridStyles}>
              <div><div style={numberValueStyles}>250 000+</div><div style={{ opacity: 0.9 }}>выпускников</div></div>
              <div><div style={numberValueStyles}>72 000</div><div style={{ opacity: 0.9 }}>студентов</div></div>
              <div><div style={numberValueStyles}>380</div><div style={{ opacity: 0.9 }}>филиалов</div></div>
              <div><div style={numberValueStyles}>10</div><div style={{ opacity: 0.9 }}>стран</div></div>
            </div>
          </div>
        </section>

        {/* Как проходит обучение */}
        <section style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
          <div className="container">
            <h2 style={sectionTitleStyles}>Как проходит обучение</h2>
            <div style={learningGridStyles}>
              <div style={learningCardStyles}>
                <img src="/photos/campus.svg" alt="Очно в кампусах" style={{ width: 'clamp(40px, 8vw, 64px)', height: 'clamp(40px, 8vw, 64px)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 600, marginBottom: '12px' }}>Очно в кампусах</h3>
                <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: 'var(--color-text-secondary)' }}>Современное оборудование, живое общение с преподавателями и однокурсниками</p>
              </div>
              <div style={learningCardStyles}>
                <img src="/photos/online.svg" alt="Онлайн из любой точки мира" style={{ width: 'clamp(40px, 8vw, 64px)', height: 'clamp(40px, 8vw, 64px)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 600, marginBottom: '12px' }}>Онлайн из любой точки мира</h3>
                <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: 'var(--color-text-secondary)' }}>Лекции в реальном времени, без скучных записей, интерактивные задания</p>
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
                <p style={reviewTextStyles}>"Учусь на разработке ПО. Очень много практики, преподаватели из IT-компаний, всё по делу. Уже делаю реальные проекты!"</p>
                <p style={reviewAuthorStyles}>— Читак Хакерский</p>
              </div>
              <div style={reviewCardStyles}>
                <p style={reviewTextStyles}>"Отличный колледж, сын учится на программиста, с первого курса уже начали изучать профильные дисциплины, участвовал в хакатоне. Преподаватели-практики!"</p>
                <p style={reviewAuthorStyles}>— Татьяна</p>
              </div>
              <div style={reviewCardStyles}>
                <p style={reviewTextStyles}>"Колледж оправдал все ожидания. Преподаватели профессионалы своего дела, современное оборудование. Рекомендую!"</p>
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
            .hero-image {
              max-width: 448px;
              width: 100%;
              border-radius: 8px;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
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
              .hero-section .container {
                flex-direction: column !important;
                text-align: center;
              }
              .hero-section .container > div:first-child {
                text-align: center !important;
              }
              .hero-image {
                width: 250px !important;
              }
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