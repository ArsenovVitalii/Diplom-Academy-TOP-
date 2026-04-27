import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, padding = '20px', style = {} }) => {
  const styles: React.CSSProperties = {
    backgroundColor: 'var(--color-background)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    ...style,
  };
  return <div style={styles}>{children}</div>;
};
