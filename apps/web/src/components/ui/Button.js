import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export const Button = ({ children, variant = 'primary', size = 'medium', onClick, type = 'button', disabled = false, fullWidth = false, style, }) => {
    const baseStyles = {
        padding: size === 'small' ? '8px 16px' : size === 'large' ? '16px 32px' : '12px 24px',
        backgroundColor: variant === 'primary' ? 'var(--color-accent)' : variant === 'secondary' ? 'var(--color-block)' : 'transparent',
        color: variant === 'outline' ? 'var(--color-accent)' : 'var(--color-background)',
        border: variant === 'outline' ? '2px solid var(--color-accent)' : 'none',
        borderRadius: '4px',
        fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: 'opacity 0.2s',
        minHeight: '44px',
    };
    const combinedStyles = { ...baseStyles, ...style };
    return (_jsxs(_Fragment, { children: [_jsx("button", { style: combinedStyles, onClick: onClick, type: type, disabled: disabled, className: "responsive-button", children: children }), _jsx("style", { children: `
        @media (max-width: 640px) {
          .responsive-button {
            min-height: 48px !important;
            padding: 14px 20px !important;
          }
        }
      ` })] }));
};
