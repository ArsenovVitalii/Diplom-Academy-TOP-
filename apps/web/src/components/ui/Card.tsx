import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, padding = '20px', hover = false, style = {} }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const styles: React.CSSProperties = {
    backgroundColor: 'var(--color-background)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding,
    boxShadow: isHovered && hover ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.2s ease',
    ...style,
  };

  return (
    <div
      style={styles}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
    >
      {children}
    </div>
  );
};
