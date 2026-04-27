import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const Card = ({ children, padding = '20px', hover = false, style = {} }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const styles = {
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding,
        boxShadow: isHovered && hover ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s ease',
        ...style,
    };
    return (_jsx("div", { style: styles, onMouseEnter: () => hover && setIsHovered(true), onMouseLeave: () => hover && setIsHovered(false), children: children }));
};
