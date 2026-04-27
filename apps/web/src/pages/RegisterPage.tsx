import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }
    
    setLoading(true);
    try {
      await register(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
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
            <h1 style={titleStyles}>Регистрация</h1>
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
                placeholder="Минимум 6 символов"
                required
              />
              <Input
                label="Подтвердите пароль"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите пароль"
                required
              />
              {error && (
                <div style={{ color: 'var(--color-accent)', fontSize: '14px', textAlign: 'center' }}>
                  {error}
                </div>
              )}
              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
              </Button>
            </form>
            <div style={linkStyles}>
              Уже есть аккаунт? <Link to="/login" style={{ color: 'var(--color-accent)' }}>Войти</Link>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
