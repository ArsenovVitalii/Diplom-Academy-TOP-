import React from 'react';

export const Footer: React.FC = () => {
  const styles: React.CSSProperties = {
    backgroundColor: 'var(--color-block)',
    padding: 'clamp(24px, 5vw, 40px) 0',
    marginTop: 'auto',
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 clamp(16px, 3vw, 20px)',
  };

  const contentStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'clamp(24px, 5vw, 40px)',
    marginBottom: 'clamp(20px, 4vw, 30px)',
  };

  const sectionStyles: React.CSSProperties = {
    marginBottom: '16px',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(14px, 2vw, 16px)',
    fontWeight: 600,
    marginBottom: '12px',
    color: 'var(--color-text)',
  };

  const textStyles: React.CSSProperties = {
    fontSize: 'clamp(13px, 2vw, 14px)',
    color: 'var(--color-text-secondary)',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    wordBreak: 'break-word',
  };

  const copyrightStyles: React.CSSProperties = {
    borderTop: '1px solid var(--color-border)',
    paddingTop: 'clamp(16px, 3vw, 20px)',
    marginTop: 'clamp(16px, 3vw, 20px)',
    textAlign: 'center',
  };

  return (
    <footer style={styles}>
      <div style={containerStyles}>
        <div style={contentStyles}>
          <div>
            <div style={sectionStyles}>
              <h3 style={titleStyles}>Контакты</h3>
              <p style={textStyles}>
                📞 <a href="tel:+74922499939">+7 492 249-99-39</a>
              </p>
              <p style={textStyles}>
                ✉️ <a href="mailto:school@top-academy.ru">school@top-academy.ru</a>
              </p>
            </div>
          </div>

          <div>
            <div style={sectionStyles}>
              <h3 style={titleStyles}>Учебная часть</h3>
              <p style={textStyles}>
                📍 г. Владимир, ул. Горького д.25
              </p>
              <p style={textStyles}>
                🕐 Пн-Пт: 9:00 - 18:00
              </p>
            </div>
          </div>

          <div>
            <div style={sectionStyles}>
              <h3 style={titleStyles}>TOP IT SCHOOL</h3>
              <p style={{ ...textStyles, marginBottom: '0' }}>
                Школа с углубленным изучением IT для будущих профессионалов
              </p>
              <p style={textStyles}>
                📋 <a 
                  href="https://top-academy-msk.ru/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                >
                  Сведения об образовательной организации
                </a>
              </p>
            </div>
          </div>
        </div>

        <div style={copyrightStyles}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            © 2026 TOP IT SCHOOL. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};