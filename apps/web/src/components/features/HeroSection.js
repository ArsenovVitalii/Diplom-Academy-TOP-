import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
export const HeroSection = ({ settings }) => {
    const styles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '60px',
        padding: '80px 0',
        minHeight: '500px',
    };
    const contentStyles = {
        flex: 1,
        maxWidth: '600px',
    };
    const titleStyles = {
        fontSize: 'clamp(32px, 5vw, 56px)',
        fontWeight: 700,
        marginBottom: '24px',
        lineHeight: 1.1,
    };
    const subtitleStyles = {
        fontSize: 'clamp(16px, 2.5vw, 22px)',
        color: 'var(--color-text-secondary)',
        marginBottom: '40px',
        lineHeight: 1.6,
    };
    const imageContainerStyles = {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const imagePlaceholderStyles = {
        width: 'clamp(200px, 40vw, 400px)',
        height: 'clamp(200px, 40vw, 400px)',
        backgroundColor: 'var(--color-block)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(60px, 12vw, 120px)',
        background: settings.image_url
            ? `url(${settings.image_url}) center/cover`
            : 'linear-gradient(135deg, var(--color-block) 0%, #b8b8b8 100%)',
    };
    return (_jsxs("div", { style: styles, className: "hero-section", children: [_jsxs("div", { style: contentStyles, children: [_jsx("h1", { style: titleStyles, children: settings.slogan }), _jsx("p", { style: subtitleStyles, children: settings.subtitle }), _jsx(Link, { to: "/catalog", children: _jsx(Button, { size: "large", children: settings.cta_text }) })] }), _jsxs("div", { style: imageContainerStyles, children: [!settings.image_url && _jsx("div", { style: imagePlaceholderStyles, children: "\uD83C\uDF93" }), settings.image_url && (_jsx("img", { src: settings.image_url, alt: "Hero", className: "hero-image", style: {
                            width: 'clamp(200px, 40vw, 400px)',
                            height: 'clamp(200px, 40vw, 400px)',
                            objectFit: 'cover',
                            borderRadius: '50%',
                        } }))] }), _jsx("style", { children: `
        @media (max-width: 900px) {
          .hero-section {
            flex-direction: column !important;
            text-align: center;
            padding: 40px 0 !important;
          }
          .hero-section > div:first-child {
            max-width: 100% !important;
          }
          .hero-image {
            width: 250px !important;
            height: 250px !important;
          }
        }
      ` })] }));
};
