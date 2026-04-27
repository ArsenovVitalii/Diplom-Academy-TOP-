import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  required?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  required = false,
  error,
}) => {
  const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  };

  const inputStyles: React.CSSProperties = {
    padding: '12px 16px',
    border: `1px solid ${error ? 'var(--color-accent)' : 'var(--color-border)'}`,
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-text)',
    outline: 'none',
    minHeight: '44px',
    width: '100%',
  };

  return (
    <>
      <div style={styles} className="input-wrapper">
        {label && (
          <label style={{ fontSize: '14px', fontWeight: 500 }}>
            {label}
            {required && <span style={{ color: 'var(--color-accent)' }}> *</span>}
          </label>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          required={required}
          style={inputStyles}
        />
        {error && (
          <span style={{ fontSize: '12px', color: 'var(--color-accent)' }}>
            {error}
          </span>
        )}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .input-wrapper input {
            min-height: 48px !important;
            padding: 14px 16px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
    </>
  );
};
