import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, type = 'text', value, onChange, placeholder, name, required }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
        style={{
          padding: '12px 16px',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          fontSize: '16px',
        }}
      />
    </div>
  );
};
