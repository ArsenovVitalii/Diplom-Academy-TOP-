import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ children, variant = 'primary', size = 'medium', onClick, type = 'button', disabled = false, }) => {
    const styles = {
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
    return (_jsx("button", { style: styles, onClick: onClick, type: type, disabled: disabled, children: children }));
};
