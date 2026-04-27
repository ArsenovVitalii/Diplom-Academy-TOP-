import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
export const CourseCard = ({ course, onAddToCart }) => {
    const styles = {
        padding: '0',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    };
    const imageStyles = {
        width: '100%',
        height: 'clamp(120px, 20vw, 160px)',
        backgroundColor: 'var(--color-block)',
        backgroundImage: course.image_url ? `url(${course.image_url})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(32px, 6vw, 48px)',
        position: 'relative',
    };
    const badgeStyles = {
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: 'var(--color-accent)',
        color: 'white',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
    };
    const contentStyles = {
        padding: '20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    };
    const titleStyles = {
        fontSize: 'clamp(16px, 3vw, 18px)',
        fontWeight: 600,
        marginBottom: '8px',
        minHeight: 'auto',
    };
    const descriptionStyles = {
        fontSize: 'clamp(13px, 2vw, 14px)',
        color: 'var(--color-text-secondary)',
        marginBottom: '12px',
        flex: 1,
    };
    const metaStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        fontSize: '13px',
        color: 'var(--color-text-secondary)',
    };
    const metaItemStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    };
    const footerStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '12px',
        borderTop: '1px solid var(--color-border)',
    };
    const priceStyles = {
        fontSize: 'clamp(18px, 3vw, 20px)',
        fontWeight: 700,
        color: 'var(--color-accent)',
    };
    const getEmoji = () => {
        const title = course.title.toLowerCase();
        if (title.includes('python'))
            return '🐍';
        if (title.includes('веб') || title.includes('фронт') || title.includes('бэк') || title.includes('javascript'))
            return '🌐';
        if (title.includes('ии') || title.includes('нейро'))
            return '🤖';
        if (title.includes('цифр'))
            return '💻';
        if (title.includes('android'))
            return '📱';
        if (title.includes('ios') || title.includes('iphone'))
            return '🍎';
        if (title.includes('unity') || title.includes('игр'))
            return '🎮';
        if (title.includes('devops'))
            return '⚙️';
        return '📚';
    };
    return (_jsxs(Card, { hover: true, style: styles, children: [_jsxs("div", { style: imageStyles, children: [!course.image_url && _jsx("span", { children: getEmoji() }), _jsx("span", { style: badgeStyles, children: course.age_badge })] }), _jsxs("div", { style: contentStyles, children: [_jsx("h3", { style: titleStyles, children: course.title }), _jsx("p", { style: descriptionStyles, children: course.description }), _jsx("div", { style: metaStyles, children: _jsxs("span", { style: metaItemStyles, children: ["\u23F1\uFE0F ", course.duration] }) }), _jsxs("div", { style: footerStyles, children: [_jsxs("span", { style: priceStyles, children: [course.price.toLocaleString(), " \u20BD"] }), _jsxs("div", { style: { display: 'flex', gap: '8px' }, children: [onAddToCart && (_jsx(Button, { size: "small", onClick: () => onAddToCart(), children: "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" })), _jsx(Link, { to: `/course/${course.id}`, children: _jsx(Button, { variant: "outline", size: "small", children: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435" }) })] })] })] })] }));
};
