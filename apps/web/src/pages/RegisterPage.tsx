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
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const { register, verifyEmail, resendVerificationCode } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent) => {
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
      setRegistrationComplete(true);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (verificationCode.length !== 6) {
      setError('Код должен состоять из 6 цифр');
      return;
    }
    
    setVerifying(true);
    try {
      await verifyEmail(email, verificationCode);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка подтверждения');
    } finally {
      setVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setResending(true);
    try {
      await resendVerificationCode(email);
      setError('');
      alert('Новый код отправлен на вашу почту!');
      setVerificationCode('');
    } catch (err: any) {
      setError(err.message || 'Ошибка отправки кода');
    } finally {
      setResending(false);
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
            {!registrationComplete ? (
              <>
                <h1 style={titleStyles}>Регистрация</h1>
                <form onSubmit={handleRegistration} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              </>
            ) : (
              <>
                <h1 style={titleStyles}>Подтверждение email</h1>
                <p style={{ textAlign: 'center', marginBottom: '24px', fontSize: '14px', color: '#666' }}>
                  Мы отправили 6-значный код на <strong>{email}</strong><br />
                  Проверьте консоль сервера или письмо на почте
                </p>
                <form onSubmit={handleVerification} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Input
                    label="Код подтверждения"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    required
                    maxLength={6}
                  />
                  {error && (
                    <div style={{ color: 'var(--color-accent)', fontSize: '14px', textAlign: 'center' }}>
                      {error}
                    </div>
                  )}
                  <Button type="submit" fullWidth disabled={verifying}>
                    {verifying ? 'Подтверждение...' : 'Подтвердить'}
                  </Button>
                  <Button 
                    type="button" 
                    fullWidth 
                    variant="secondary"
                    onClick={handleResendCode}
                    disabled={resending}
                  >
                    {resending ? 'Отправка...' : 'Отправить код повторно'}
                  </Button>
                </form>
                <div style={linkStyles}>
                  <Link to="/login" style={{ color: 'var(--color-accent)' }}>Вернуться ко входу</Link>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};
