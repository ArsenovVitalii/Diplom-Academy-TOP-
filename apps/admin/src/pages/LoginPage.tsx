import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { api } from '../api/client';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.auth.login(email, password);
      if (response.user.role !== 'admin') {
        setError('Доступ только для администраторов');
        return;
      }
      localStorage.setItem('adminToken', response.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card padding="40px">
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>Админ-панель</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <div style={{ color: 'var(--color-accent)', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
          <Button type="submit" disabled={loading}>{loading ? 'Вход...' : 'Войти'}</Button>
        </form>
      </Card>
    </div>
  );
};
