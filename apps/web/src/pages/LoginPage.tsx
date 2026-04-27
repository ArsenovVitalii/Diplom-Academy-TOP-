import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const styles: React.CSSProperties = {
    padding: 'clamp(30px, 5vw, 60px) 0',
    display: 'flex',
    justifyContent: 'center',
  };

  const formStyles: React.CSSProperties = {
    maxWidth: '400px',
    width: '100%',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(22px, 5vw, 28px)',
    fontWeight: 700,
    marginBottom: 'clamp(16px, 3vw, 24px)',
    textAlign: 'center',
  };

  const linkStyles: React.CSSProperties = {
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '14px',
  };

  return (
    <Layout>
      <div className="container" style={styles}>
        <Card>
          <div style={formStyles}>
            <h1 style={titleStyles}>Вход</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.ru"
                required
              />
              <Input
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              {error && (
                <div style={{ color: 'var(--color-accent)', fontSize: '14px', textAlign: 'center' }}>
                  {error}
                </div>
              )}
              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Вход...' : 'Войти'}
              </Button>
            </form>
            <div style={linkStyles}>
              Нет аккаунта? <Link to="/register" style={{ color: 'var(--color-accent)' }}>Зарегистрироваться</Link>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
