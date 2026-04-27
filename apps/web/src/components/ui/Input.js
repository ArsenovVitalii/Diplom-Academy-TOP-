import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export const Input = ({ label, type = 'text', value, onChange, placeholder, name, required = false, error, }) => {
    const styles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    };
    const inputStyles = {
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
    return (_jsxs(_Fragment, { children: [_jsxs("div", { style: styles, className: "input-wrapper", children: [label && (_jsxs("label", { style: { fontSize: '14px', fontWeight: 500 }, children: [label, required && _jsx("span", { style: { color: 'var(--color-accent)' }, children: " *" })] })), _jsx("input", { type: type, value: value, onChange: onChange, placeholder: placeholder, name: name, required: required, style: inputStyles }), error && (_jsx("span", { style: { fontSize: '12px', color: 'var(--color-accent)' }, children: error }))] }), _jsx("style", { children: `
        @media (max-width: 640px) {
          .input-wrapper input {
            min-height: 48px !important;
            padding: 14px 16px !important;
            font-size: 16px !important;
          }
        }
      ` })] }));
};
