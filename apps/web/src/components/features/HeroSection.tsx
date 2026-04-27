import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

interface HeroSettings {
  id: number;
  slogan: string;
  subtitle: string;
  cta_text: string;
  image_url: string;
}

interface HeroSectionProps {
  settings: HeroSettings;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const styles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '60px',
    padding: '80px 0',
    minHeight: '500px',
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    maxWidth: '600px',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: 700,
    marginBottom: '24px',
    lineHeight: 1.1,
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: 'clamp(16px, 2.5vw, 22px)',
    color: 'var(--color-text-secondary)',
    marginBottom: '40px',
    lineHeight: 1.6,
  };

  const imageContainerStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imagePlaceholderStyles: React.CSSProperties = {
    width: 'clamp(200px, 40vw, 400px)',
    height: 'clamp(200px, 40vw, 400px)',
    backgroundColor: 'var(--color-block)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'clamp(60px, 12vw, 120px)',
    background: settings.image_url 
      ? `url(${settings.image_url}) center/cover` 
      : 'linear-gradient(135deg, var(--color-block) 0%, #b8b8b8 100%)',
  };

  return (
    <div style={styles} className="hero-section">
      <div style={contentStyles}>
        <h1 style={titleStyles}>{settings.slogan}</h1>
        <p style={subtitleStyles}>{settings.subtitle}</p>
        <Link to="/catalog">
          <Button size="large">{settings.cta_text}</Button>
        </Link>
      </div>
      <div style={imageContainerStyles}>
        {!settings.image_url && <div style={imagePlaceholderStyles}>🎓</div>}
        {settings.image_url && (
          <img 
            src={settings.image_url} 
            alt="Hero" 
            className="hero-image"
            style={{ 
              width: 'clamp(200px, 40vw, 400px)', 
              height: 'clamp(200px, 40vw, 400px)', 
              objectFit: 'cover',
              borderRadius: '50%',
            }} 
          />
        )}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-section {
            flex-direction: column !important;
            text-align: center;
            padding: 40px 0 !important;
          }
          .hero-section > div:first-child {
            max-width: 100% !important;
          }
          .hero-image {
            width: 250px !important;
            height: 250px !important;
          }
        }
      `}</style>
    </div>
  );
};
