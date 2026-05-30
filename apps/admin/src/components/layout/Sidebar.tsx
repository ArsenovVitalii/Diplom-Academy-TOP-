import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface SidebarProps {
  active: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const openWebsite = () => {
    window.open('http://localhost:3000', '_blank');
  };

  const styles: React.CSSProperties = {
    width: '240px',
    backgroundColor: 'var(--color-block)',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  };

  const logoStyles: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--color-accent)',
    marginBottom: '40px',
    textAlign: 'center',
  };

  const navStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  };

  const linkStyles = (isActive: boolean): React.CSSProperties => ({
    padding: '12px 16px',
    borderRadius: '4px',
    fontWeight: 500,
    backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
    color: isActive ? 'white' : 'var(--color-text)',
    transition: 'background-color 0.2s',
  });

  const buttonStyles: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: '4px',
    fontWeight: 500,
    backgroundColor: 'transparent',
    color: 'var(--color-text)',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <aside style={styles}>
      <div style={logoStyles}>ADMIN</div>
      <nav style={navStyles}>
        <Link to="/dashboard" style={linkStyles(active === 'dashboard')}>📊 Дашборд</Link>
        <Link to="/courses" style={linkStyles(active === 'courses')}>📚 Курсы</Link>
        <Link to="/users" style={linkStyles(active === 'users')}>👥 Пользователи</Link>
        <Link to="/orders" style={linkStyles(active === 'orders')}>📦 Заказы</Link>
        <Link to="/hero-settings" style={linkStyles(active === 'hero-settings')}>🎨 Хиро-панель</Link>
        <button onClick={openWebsite} style={buttonStyles}>
          🌐 На сайт
        </button>
      </nav>
      <button onClick={logout} style={{ marginTop: 'auto', padding: '12px', color: 'var(--color-accent)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
        Выйти
      </button>
    </aside>
  );
};
