import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
export const HomePage = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    // Показываем кнопку "Наверх" при скролле
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const styles = {
        padding: '0 0 clamp(30px, 5vw, 60px) 0',
    };
    // Hero Section
    const heroStyles = {
        backgroundImage: 'url(/photos/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 'clamp(60px, 10vw, 120px) 0',
        textAlign: 'center',
        position: 'relative',
    };
    const heroTitleStyles = {
        fontSize: 'clamp(32px, 6vw, 56px)',
        fontWeight: 800,
        marginBottom: 'clamp(12px, 2vw, 16px)',
        lineHeight: 1.2,
        color: '#FFFFFF',
    };
    const heroSubtitleStyles = {
        fontSize: 'clamp(16px, 3vw, 24px)',
        color: '#FFFFFF',
        marginBottom: 'clamp(24px, 4vw, 40px)',
    };
    // Почему мы
    const whyUsStyles = {
        padding: 'clamp(40px, 8vw, 80px) 0',
    };
    const sectionTitleStyles = {
        fontSize: 'clamp(24px, 5vw, 36px)',
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 'clamp(24px, 5vw, 48px)',
    };
    const whyUsGridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
    };
    const whyUsCardStyles = {
        padding: 'clamp(20px, 4vw, 32px)',
        backgroundColor: 'var(--color-block)',
        borderRadius: '16px',
        textAlign: 'center',
    };
    const whyUsIconStyles = {
        fontSize: 'clamp(36px, 6vw, 48px)',
        marginBottom: '16px',
    };
    const whyUsTitleStyles = {
        fontSize: 'clamp(16px, 3vw, 20px)',
        fontWeight: 600,
        marginBottom: '12px',
    };
    const whyUsDescStyles = {
        fontSize: 'clamp(13px, 2vw, 15px)',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
    };
    // Цифры
    const numbersStyles = {
        backgroundColor: 'var(--color-accent)',
        padding: 'clamp(40px, 8vw, 60px) 0',
        color: 'white',
    };
    const numbersGridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 'clamp(16px, 4vw, 24px)',
        textAlign: 'center',
    };
    const numberValueStyles = {
        fontSize: 'clamp(32px, 6vw, 48px)',
        fontWeight: 800,
        marginBottom: '8px',
    };
    const numberLabelStyles = {
        fontSize: 'clamp(13px, 2vw, 16px)',
        opacity: 0.9,
    };
    // Как проходит обучение
    const learningStyles = {
        padding: 'clamp(40px, 8vw, 80px) 0',
    };
    const learningGridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(16px, 3vw, 24px)',
    };
    const learningCardStyles = {
        padding: 'clamp(24px, 4vw, 40px)',
        border: '2px solid var(--color-border)',
        borderRadius: '16px',
        textAlign: 'center',
    };
    const learningIconStyles = {
        fontSize: 'clamp(40px, 8vw, 64px)',
        marginBottom: '20px',
    };
    const learningTitleStyles = {
        fontSize: 'clamp(18px, 3vw, 24px)',
        fontWeight: 600,
        marginBottom: '12px',
    };
    const learningDescStyles = {
        fontSize: 'clamp(14px, 2vw, 16px)',
        color: 'var(--color-text-secondary)',
    };
    // Отзывы
    const reviewsStyles = {
        padding: 'clamp(40px, 8vw, 80px) 0',
        backgroundColor: 'var(--color-block)',
    };
    const reviewsGridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(16px, 3vw, 24px)',
    };
    const reviewCardStyles = {
        padding: 'clamp(16px, 3vw, 24px)',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    };
    const reviewTextStyles = {
        fontSize: 'clamp(14px, 2vw, 16px)',
        lineHeight: 1.6,
        marginBottom: '16px',
        fontStyle: 'italic',
    };
    const reviewAuthorStyles = {
        fontSize: 'clamp(13px, 2vw, 14px)',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
    };
    // CTA Section
    const ctaStyles = {
        padding: 'clamp(40px, 8vw, 80px) 0',
        textAlign: 'center',
    };
    const ctaTitleStyles = {
        fontSize: 'clamp(24px, 5vw, 36px)',
        fontWeight: 700,
        marginBottom: 'clamp(20px, 4vw, 32px)',
    };
    const ctaButtonsStyles = {
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap',
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { style: styles, children: [_jsxs("section", { style: heroStyles, className: "hero-section", children: [_jsx("div", { className: "hero-overlay" }), _jsxs("div", { className: "container", style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }, children: [_jsxs("div", { style: { flex: '1 1 500px', textAlign: 'left' }, children: [_jsx("h1", { style: heroTitleStyles, children: "\u0422\u0432\u043E\u0439 \u0441\u0442\u0430\u0440\u0442 \u0432 IT \u0441 TOP IT SCHOOL" }), _jsx("p", { style: heroSubtitleStyles, children: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043C\u0435\u043D\u044F\u0435\u0442 \u0431\u0443\u0434\u0443\u0449\u0435\u0435" }), _jsx("a", { href: "tel:+74951234567", children: _jsx(Button, { size: "large", style: { backgroundColor: 'var(--color-accent)', color: 'white', boxShadow: '0 4px 14px rgba(205, 37, 50, 0.4)' }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E" }) })] }), _jsx("div", { style: { flex: '0 0 auto' }, className: "hero-image-container", children: _jsx("img", { src: "/photos/kaf.svg", alt: "Hero", className: "hero-image" }) })] })] }), _jsx("section", { style: whyUsStyles, children: _jsxs("div", { className: "container", children: [_jsx("h2", { style: sectionTitleStyles, children: "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B?" }), _jsxs("div", { style: whyUsGridStyles, children: [_jsxs("div", { style: whyUsCardStyles, children: [_jsx("img", { src: "/photos/lamp.svg", alt: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0431\u0435\u0437 \u0433\u0440\u0430\u043D\u0438\u0446", style: {
                                                        width: 'clamp(40px, 8vw, 64px)',
                                                        height: 'clamp(40px, 8vw, 64px)',
                                                        marginBottom: '16px'
                                                    } }), _jsx("h3", { style: whyUsTitleStyles, children: "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0431\u0435\u0437 \u0433\u0440\u0430\u043D\u0438\u0446" }), _jsx("p", { style: whyUsDescStyles, children: "142 \u0444\u0438\u043B\u0438\u0430\u043B\u0430 \u043F\u043E \u0432\u0441\u0435\u043C\u0443 \u043C\u0438\u0440\u0443, 250 000+ \u0432\u044B\u043F\u0443\u0441\u043A\u043D\u0438\u043A\u043E\u0432" })] }), _jsxs("div", { style: whyUsCardStyles, children: [_jsx("img", { src: "/photos/note.svg", alt: "\u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0430 \u0441 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0434\u043D\u044F", style: {
                                                        width: 'clamp(40px, 8vw, 64px)',
                                                        height: 'clamp(40px, 8vw, 64px)',
                                                        marginBottom: '16px'
                                                    } }), _jsx("h3", { style: whyUsTitleStyles, children: "\u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0430 \u0441 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0434\u043D\u044F" }), _jsx("p", { style: whyUsDescStyles, children: "90% \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u2014 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B. \u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438 \u2014 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 IT-\u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B" })] }), _jsxs("div", { style: whyUsCardStyles, children: [_jsx("img", { src: "/photos/rocket.svg", alt: "\u0421\u0442\u0430\u0440\u0442 \u043A\u0430\u0440\u044C\u0435\u0440\u044B \u0434\u043E \u0434\u0438\u043F\u043B\u043E\u043C\u0430", style: {
                                                        width: 'clamp(40px, 8vw, 64px)',
                                                        height: 'clamp(40px, 8vw, 64px)',
                                                        marginBottom: '16px'
                                                    } }), _jsx("h3", { style: whyUsTitleStyles, children: "\u0421\u0442\u0430\u0440\u0442 \u043A\u0430\u0440\u044C\u0435\u0440\u044B \u0434\u043E \u0434\u0438\u043F\u043B\u043E\u043C\u0430" }), _jsx("p", { style: whyUsDescStyles, children: "\u041F\u043E\u043C\u043E\u0433\u0430\u0435\u043C \u0441 \u0442\u0440\u0443\u0434\u043E\u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E\u043C \u0432 \u0432\u0435\u0434\u0443\u0449\u0438\u0435 IT-\u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438. \u0412\u044B\u043F\u0443\u0441\u043A\u043D\u0438\u043A\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0432 36 \u0441\u0442\u0440\u0430\u043D\u0430\u0445" })] }), _jsxs("div", { style: whyUsCardStyles, children: [_jsx("img", { src: "/photos/earth.svg", alt: "\u041C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0435 \u0434\u0438\u043F\u043B\u043E\u043C\u044B", style: {
                                                        width: 'clamp(40px, 8vw, 64px)',
                                                        height: 'clamp(40px, 8vw, 64px)',
                                                        marginBottom: '16px'
                                                    } }), _jsx("h3", { style: whyUsTitleStyles, children: "\u041C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0435 \u0434\u0438\u043F\u043B\u043E\u043C\u044B" }), _jsx("p", { style: whyUsDescStyles, children: "\u0414\u0438\u043F\u043B\u043E\u043C\u044B \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u0438 \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u043C, \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u044B Cisco, Microsoft, Autodesk" })] }), _jsxs("div", { style: whyUsCardStyles, children: [_jsx("img", { src: "/photos/tech.svg", alt: "\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438", style: {
                                                        width: 'clamp(40px, 8vw, 64px)',
                                                        height: 'clamp(40px, 8vw, 64px)',
                                                        marginBottom: '16px'
                                                    } }), _jsx("h3", { style: whyUsTitleStyles, children: "\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438" }), _jsx("p", { style: whyUsDescStyles, children: "\u0418\u0437\u0443\u0447\u0430\u0435\u043C Python, JavaScript, \u043D\u0435\u0439\u0440\u043E\u0441\u0435\u0442\u0438, DevOps, Unity" })] }), _jsxs("div", { style: whyUsCardStyles, children: [_jsx("img", { src: "/photos/doc.svg", alt: "\u041F\u043E\u043C\u043E\u0449\u044C \u0441 \u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E", style: {
                                                        width: 'clamp(40px, 8vw, 64px)',
                                                        height: 'clamp(40px, 8vw, 64px)',
                                                        marginBottom: '16px'
                                                    } }), _jsx("h3", { style: whyUsTitleStyles, children: "\u041F\u043E\u043C\u043E\u0449\u044C \u0441 \u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E" }), _jsx("p", { style: whyUsDescStyles, children: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E \u0438\u0437 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432" })] })] })] }) }), _jsx("section", { style: numbersStyles, children: _jsx("div", { className: "container", children: _jsxs("div", { style: numbersGridStyles, children: [_jsxs("div", { children: [_jsx("div", { style: numberValueStyles, children: "250 000+" }), _jsx("div", { style: numberLabelStyles, children: "\u0432\u044B\u043F\u0443\u0441\u043A\u043D\u0438\u043A\u043E\u0432" })] }), _jsxs("div", { children: [_jsx("div", { style: numberValueStyles, children: "72 000" }), _jsx("div", { style: numberLabelStyles, children: "\u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432" })] }), _jsxs("div", { children: [_jsx("div", { style: numberValueStyles, children: "380" }), _jsx("div", { style: numberLabelStyles, children: "\u0444\u0438\u043B\u0438\u0430\u043B\u043E\u0432" })] }), _jsxs("div", { children: [_jsx("div", { style: numberValueStyles, children: "10" }), _jsx("div", { style: numberLabelStyles, children: "\u0441\u0442\u0440\u0430\u043D" })] })] }) }) }), _jsx("section", { style: learningStyles, children: _jsxs("div", { className: "container", children: [_jsx("h2", { style: sectionTitleStyles, children: "\u041A\u0430\u043A \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435" }), _jsxs("div", { style: learningGridStyles, children: [_jsxs("div", { style: learningCardStyles, children: [_jsx("img", { src: "/photos/campus.svg", alt: "\u041E\u0447\u043D\u043E \u0432 \u043A\u0430\u043C\u043F\u0443\u0441\u0430\u0445", style: {
                                                        width: 'clamp(40px, 8vw, 64px)',
                                                        height: 'clamp(40px, 8vw, 64px)',
                                                        marginBottom: '16px'
                                                    } }), _jsx("h3", { style: learningTitleStyles, children: "\u041E\u0447\u043D\u043E \u0432 \u043A\u0430\u043C\u043F\u0443\u0441\u0430\u0445" }), _jsx("p", { style: learningDescStyles, children: "\u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435, \u0436\u0438\u0432\u043E\u0435 \u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u044F\u043C\u0438 \u0438 \u043E\u0434\u043D\u043E\u043A\u0443\u0440\u0441\u043D\u0438\u043A\u0430\u043C\u0438" })] }), _jsxs("div", { style: learningCardStyles, children: [_jsx("img", { src: "/photos/online.svg", alt: "\u041E\u043D\u043B\u0430\u0439\u043D \u0438\u0437 \u043B\u044E\u0431\u043E\u0439 \u0442\u043E\u0447\u043A\u0438 \u043C\u0438\u0440\u0430", style: {
                                                        width: 'clamp(40px, 8vw, 64px)',
                                                        height: 'clamp(40px, 8vw, 64px)',
                                                        marginBottom: '16px'
                                                    } }), _jsx("h3", { style: learningTitleStyles, children: "\u041E\u043D\u043B\u0430\u0439\u043D \u0438\u0437 \u043B\u044E\u0431\u043E\u0439 \u0442\u043E\u0447\u043A\u0438 \u043C\u0438\u0440\u0430" }), _jsx("p", { style: learningDescStyles, children: "\u041B\u0435\u043A\u0446\u0438\u0438 \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438, \u0431\u0435\u0437 \u0441\u043A\u0443\u0447\u043D\u044B\u0445 \u0437\u0430\u043F\u0438\u0441\u0435\u0439, \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F" })] })] })] }) }), _jsx("section", { style: reviewsStyles, children: _jsxs("div", { className: "container", children: [_jsx("h2", { style: sectionTitleStyles, children: "\u041E\u0442\u0437\u044B\u0432\u044B \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432" }), _jsxs("div", { style: reviewsGridStyles, children: [_jsxs("div", { style: reviewCardStyles, children: [_jsx("p", { style: reviewTextStyles, children: "\u2B50 \"\u0423\u0447\u0443\u0441\u044C \u043D\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u041F\u041E. \u041E\u0447\u0435\u043D\u044C \u043C\u043D\u043E\u0433\u043E \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438, \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438 \u0438\u0437 IT-\u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439, \u0432\u0441\u0451 \u043F\u043E \u0434\u0435\u043B\u0443. \u0423\u0436\u0435 \u0434\u0435\u043B\u0430\u044E \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u044B!\"" }), _jsx("p", { style: reviewAuthorStyles, children: "\u2014 \u0427\u0438\u0442\u0430\u043A \u0425\u0430\u043A\u0435\u0440\u0441\u043A\u0438\u0439" })] }), _jsxs("div", { style: reviewCardStyles, children: [_jsx("p", { style: reviewTextStyles, children: "\u2B50 \"\u041E\u0442\u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u043E\u043B\u043B\u0435\u0434\u0436, \u0441\u044B\u043D \u0443\u0447\u0438\u0442\u0441\u044F \u043D\u0430 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0441\u0442\u0430, \u0441 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u043A\u0443\u0440\u0441\u0430 \u0443\u0436\u0435 \u043D\u0430\u0447\u0430\u043B\u0438 \u0438\u0437\u0443\u0447\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u044B\u0435 \u0434\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D\u044B, \u0443\u0447\u0430\u0441\u0442\u0432\u043E\u0432\u0430\u043B \u0432 \u0445\u0430\u043A\u0430\u0442\u043E\u043D\u0435. \u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438-\u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0438!\"" }), _jsx("p", { style: reviewAuthorStyles, children: "\u2014 \u0422\u0430\u0442\u044C\u044F\u043D\u0430" })] }), _jsxs("div", { style: reviewCardStyles, children: [_jsx("p", { style: reviewTextStyles, children: "\u2B50 \"\u041A\u043E\u043B\u043B\u0435\u0434\u0436 \u043E\u043F\u0440\u0430\u0432\u0434\u0430\u043B \u0432\u0441\u0435 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F. \u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044B \u0441\u0432\u043E\u0435\u0433\u043E \u0434\u0435\u043B\u0430, \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0435 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u0435. \u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u044E!\"" }), _jsx("p", { style: reviewAuthorStyles, children: "\u2014 \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430" })] })] })] }) }), _jsx("section", { style: ctaStyles, children: _jsxs("div", { className: "container", children: [_jsx("h2", { style: ctaTitleStyles, children: "\u041D\u0430\u0447\u043D\u0438 \u0441\u0435\u0433\u043E\u0434\u043D\u044F" }), _jsx("div", { style: ctaButtonsStyles, children: _jsx(Link, { to: "/courses", children: _jsx(Button, { size: "large", children: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043A\u0443\u0440\u0441\u0430\u043C" }) }) })] }) })] }), showScrollButton && (_jsxs(_Fragment, { children: [_jsx("style", { children: `
            .scroll-to-top {
              position: fixed;
              bottom: 20px;
              right: 20px;
              width: 50px;
              height: 50px;
              background-color: var(--color-accent);
              color: white;
              border: none;
              border-radius: 50%;
              font-size: 24px;
              cursor: pointer;
              box-shadow: 0 4px 14px rgba(205, 37, 50, 0.4);
              transition: transform 0.2s, opacity 0.2s;
              z-index: 1000;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .scroll-to-top:hover {
              transform: scale(1.1);
            }
          ` }), _jsx("button", { className: "scroll-to-top", onClick: scrollToTop, title: "\u041D\u0430\u0432\u0435\u0440\u0445", children: "\u2191" })] })), _jsx("style", { children: `
        .hero-image {
          max-width: 448px;
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .hero-image-container {
          flex: 0 0 auto;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 0;
        }
        @media (max-width: 768px) {
          section > div > h1 { font-size: 36px !important; }
          section > div > p { font-size: 18px !important; }
          .container > div { grid-template-columns: 1fr !important; }
          .container > div > div { grid-template-columns: 1fr !important; }
          .hero-section .container {
            flex-direction: column !important;
            text-align: center;
          }
          .hero-section .container > div:first-child {
            text-align: center !important;
          }
        }
      ` })] }));
};
