import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { api } from '../api/client';

export const HeroSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    slogan: '',
    subtitle: '',
    cta_text: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.settings.getHero();
        setSettings(data);
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await api.settings.updateHero(settings);
      setMessage('Настройки сохранены!');
    } catch (err) {
      console.error('Error saving settings:', err);
      setMessage('Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };

  const styles: React.CSSProperties = {
    padding: '32px',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '24px',
  };

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
  };

  const previewStyles: React.CSSProperties = {
    marginTop: '40px',
    padding: '24px',
    backgroundColor: 'var(--color-block)',
    borderRadius: '8px',
  };

  const previewTitleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '12px',
  };

  const previewSubtitleStyles: React.CSSProperties = {
    fontSize: '18px',
    color: 'var(--color-text-secondary)',
    marginBottom: '20px',
  };

  if (loading) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active="hero-settings" />
      <main style={{ flex: 1, padding: '40px' }}>
        <h1 style={titleStyles}>Настройки хиро-панели</h1>
      
      <Card>
        <div style={formStyles}>
          <Input
            name="slogan"
            label="Слоган"
            value={settings.slogan}
            onChange={handleChange}
            placeholder="TOP IT SCHOOL"
          />
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Подзаголовок
            </label>
            <textarea
              name="subtitle"
              value={settings.subtitle}
              onChange={handleChange}
              placeholder="Школа с углубленным изучением IT..."
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '12px',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>
          
          <Input
            name="cta_text"
            label="Текст кнопки"
            value={settings.cta_text}
            onChange={handleChange}
            placeholder="Смотреть курсы"
          />
          
          {message && (
            <p style={{ 
              color: message.includes('Ошибка') ? 'red' : 'green',
              fontWeight: 500 
            }}>
              {message}
            </p>
          )}
          
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Сохранение...' : 'Сохранить настройки'}
          </Button>
        </div>
      </Card>

      <div style={previewStyles}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Предпросмотр</h3>
        <h1 style={previewTitleStyles}>{settings.slogan || 'TOP IT SCHOOL'}</h1>
        <p style={previewSubtitleStyles}>{settings.subtitle || 'Подзаголовок...'}</p>
        <button style={{
          padding: '12px 24px',
          backgroundColor: 'var(--color-accent)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 500,
          cursor: 'pointer',
        }}>
          {settings.cta_text || 'Смотреть курсы'}
        </button>
      </div>
      </main>
    </div>
  );
};
