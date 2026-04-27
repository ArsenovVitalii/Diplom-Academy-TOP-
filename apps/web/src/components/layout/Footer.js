import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Footer = () => {
    const styles = {
        backgroundColor: 'var(--color-block)',
        padding: 'clamp(24px, 5vw, 40px) 0',
        marginTop: 'auto',
    };
    const containerStyles = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(16px, 3vw, 20px)',
    };
    const contentStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'clamp(24px, 5vw, 40px)',
        marginBottom: 'clamp(20px, 4vw, 30px)',
    };
    const sectionStyles = {
        marginBottom: '16px',
    };
    const titleStyles = {
        fontSize: 'clamp(14px, 2vw, 16px)',
        fontWeight: 600,
        marginBottom: '12px',
        color: 'var(--color-text)',
    };
    const textStyles = {
        fontSize: 'clamp(13px, 2vw, 14px)',
        color: 'var(--color-text-secondary)',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        wordBreak: 'break-word',
    };
    const copyrightStyles = {
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'clamp(16px, 3vw, 20px)',
        marginTop: 'clamp(16px, 3vw, 20px)',
        textAlign: 'center',
    };
    return (_jsx("footer", { style: styles, children: _jsxs("div", { style: containerStyles, children: [_jsxs("div", { style: contentStyles, children: [_jsx("div", { children: _jsxs("div", { style: sectionStyles, children: [_jsx("h3", { style: titleStyles, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B" }), _jsxs("p", { style: textStyles, children: ["\uD83D\uDCDE ", _jsx("a", { href: "tel:+74922499939", children: "+7 492 249-99-39" })] }), _jsxs("p", { style: textStyles, children: ["\u2709\uFE0F ", _jsx("a", { href: "mailto:school@top-academy.ru", children: "school@top-academy.ru" })] })] }) }), _jsx("div", { children: _jsxs("div", { style: sectionStyles, children: [_jsx("h3", { style: titleStyles, children: "\u0423\u0447\u0435\u0431\u043D\u0430\u044F \u0447\u0430\u0441\u0442\u044C" }), _jsx("p", { style: textStyles, children: "\uD83D\uDCCD \u0433. \u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440, \u0443\u043B. \u0413\u043E\u0440\u044C\u043A\u043E\u0433\u043E \u0434.25" }), _jsx("p", { style: textStyles, children: "\uD83D\uDD50 \u041F\u043D-\u041F\u0442: 9:00 - 18:00" })] }) }), _jsx("div", { children: _jsxs("div", { style: sectionStyles, children: [_jsx("h3", { style: titleStyles, children: "TOP IT SCHOOL" }), _jsx("p", { style: { ...textStyles, marginBottom: '0' }, children: "\u0428\u043A\u043E\u043B\u0430 \u0441 \u0443\u0433\u043B\u0443\u0431\u043B\u0435\u043D\u043D\u044B\u043C \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0435\u043C IT \u0434\u043B\u044F \u0431\u0443\u0434\u0443\u0449\u0438\u0445 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u043E\u0432" }), _jsxs("p", { style: textStyles, children: ["\uD83D\uDCCB ", _jsx("a", { href: "https://top-academy-msk.ru/", target: "_blank", rel: "noopener noreferrer", style: { color: 'var(--color-accent)', textDecoration: 'none' }, children: "\u0421\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043E\u0431 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438" })] })] }) })] }), _jsx("div", { style: copyrightStyles, children: _jsx("p", { style: { color: 'var(--color-text-secondary)', fontSize: '14px' }, children: "\u00A9 2026 TOP IT SCHOOL. \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B." }) })] }) }));
};
