import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const styles: React.CSSProperties = {
    padding: size === 'small' ? '8px 16px' : size === 'large' ? '16px 32px' : '12px 24px',
    backgroundColor: variant === 'primary' ? 'var(--color-accent)' : variant === 'secondary' ? 'var(--color-block)' : variant === 'danger' ? '#dc3545' : 'transparent',
    color: variant === 'outline' ? 'var(--color-accent)' : 'white',
    border: variant === 'outline' ? '2px solid var(--color-accent)' : 'none',
    borderRadius: '4px',
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button style={styles} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
};
