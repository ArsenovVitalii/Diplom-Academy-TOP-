import { jsx as _jsx } from "react/jsx-runtime";
export const Card = ({ children, padding = '20px', style = {} }) => {
    const styles = {
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        ...style,
    };
    return _jsx("div", { style: styles, children: children });
};
