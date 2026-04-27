import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const styles: React.CSSProperties = {
    backgroundColor: 'var(--color-background)',
    borderBottom: '1px solid var(--color-border)',
    padding: '12px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  };

  const logoImageStyles: React.CSSProperties = {
    height: '40px',
    width: 'auto',
  };

  const logoTextStyles: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--color-accent)',
  };

  const navStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const cartLinkStyles: React.CSSProperties = {
    position: 'relative',
    fontSize: '16px',
    fontWeight: 500,
  };

  const badgeStyles: React.CSSProperties = {
    position: 'absolute',
    top: '-8px',
    right: '-12px',
    backgroundColor: 'var(--color-accent)',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  };

  const profileLinkStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
  };

  const burgerStyles: React.CSSProperties = {
    display: 'none',
    flexDirection: 'column',
    gap: '5px',
    cursor: 'pointer',
    padding: '8px',
    background: 'none',
    border: 'none',
  };

  const burgerLineStyles: React.CSSProperties = {
    width: '24px',
    height: '2px',
    backgroundColor: 'var(--color-text)',
    transition: '0.3s',
  };

  const mobileMenuStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'var(--color-background)',
    borderBottom: '1px solid var(--color-border)',
    flexDirection: 'column',
    padding: '16px 20px',
    gap: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    opacity: isMenuOpen ? 1 : 0,
    visibility: isMenuOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
  };

  return (
    <header style={styles}>
      <div style={containerStyles}>
        <Link to="/" style={logoStyles}>
          <img 
            src="/photos/logo.svg" 
            alt="TOP IT SCHOOL" 
            style={logoImageStyles}
            onError={(e) => {
              // Fallback to text if image fails to load
              e.currentTarget.style.display = 'none';
              const textSpan = e.currentTarget.nextElementSibling as HTMLElement;
              if (textSpan) textSpan.style.display = 'block';
            }}
          />
        </Link>
        
        {/* Бургер-кнопка */}
        <button 
          style={burgerStyles} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="burger-button"
          aria-label="Меню"
          aria-expanded={isMenuOpen}
        >
          <span style={burgerLineStyles}></span>
          <span style={burgerLineStyles}></span>
          <span style={burgerLineStyles}></span>
        </button>

        <nav style={navStyles} className="desktop-nav">
          <Link to="/courses" style={{ fontWeight: 500 }}>Каталог</Link>
          {user ? (
            <>
              <Link to="/cart" style={cartLinkStyles}>
                Корзина
                {items.length > 0 && <span style={badgeStyles}>{items.length}</span>}
              </Link>
              <Link to="/profile" style={profileLinkStyles}>
                <img 
                  src="/photos/ava.svg" 
                  alt="Профиль" 
                  style={{ 
                    width: '24px', 
                    height: '24px', 
                    display: 'block'
                  }} 
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="small">Войти</Button>
              </Link>
              <Link to="/register">
                <Button size="small">Регистрация</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
      
      {/* Мобильное меню */}
      <div style={mobileMenuStyles} ref={menuRef}>
        <Link to="/courses" style={{ fontWeight: 500 }} onClick={closeMenu}>
          Каталог
        </Link>
        {user ? (
          <>
            <Link to="/cart" style={cartLinkStyles} onClick={closeMenu}>
              Корзина
              {items.length > 0 && <span style={badgeStyles}>{items.length}</span>}
            </Link>
            <Link to="/profile" style={profileLinkStyles} onClick={closeMenu}>
              <img 
                src="/photos/ava.svg" 
                alt="Профиль" 
                style={{ 
                  width: '24px', 
                  height: '24px', 
                  display: 'block'
                }} 
              />
              Профиль
            </Link>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Link to="/login" onClick={closeMenu}>
              <Button variant="outline" size="small">Войти</Button>
            </Link>
            <Link to="/register" onClick={closeMenu}>
              <Button size="small">Регистрация</Button>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .burger-button {
          transition: transform 0.2s ease;
        }
        .burger-button:hover {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger-button { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
