import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Input = ({ label, type = 'text', value, onChange, placeholder, name, required }) => {
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px' }, children: [label && (_jsxs("label", { style: { fontSize: '14px', fontWeight: 500 }, children: [label, required && _jsx("span", { style: { color: 'var(--color-accent)' }, children: " *" })] })), _jsx("input", { type: type, value: value, onChange: onChange, placeholder: placeholder, name: name, required: required, style: {
                    padding: '12px 16px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    fontSize: '16px',
                } })] }));
};
