import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { api } from '../api/client';
export const HeroSettingsPage = () => {
    const [settings, setSettings] = useState({
        slogan: '',
        subtitle: '',
        cta_text: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await api.settings.getHero();
                setSettings(data);
            }
            catch (err) {
                console.error('Error fetching settings:', err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);
    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value,
        });
    };
    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await api.settings.updateHero(settings);
            setMessage('Настройки сохранены!');
        }
        catch (err) {
            console.error('Error saving settings:', err);
            setMessage('Ошибка при сохранении');
        }
        finally {
            setSaving(false);
        }
    };
    const styles = {
        padding: '32px',
    };
    const titleStyles = {
        fontSize: '28px',
        fontWeight: 700,
        marginBottom: '24px',
    };
    const formStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '600px',
    };
    const previewStyles = {
        marginTop: '40px',
        padding: '24px',
        backgroundColor: 'var(--color-block)',
        borderRadius: '8px',
    };
    const previewTitleStyles = {
        fontSize: '32px',
        fontWeight: 700,
        marginBottom: '12px',
    };
    const previewSubtitleStyles = {
        fontSize: '18px',
        color: 'var(--color-text-secondary)',
        marginBottom: '20px',
    };
    if (loading) {
        return (_jsx("div", { style: { padding: '100px', textAlign: 'center' }, children: _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." }) }));
    }
    return (_jsxs("div", { style: { display: 'flex', minHeight: '100vh' }, children: [_jsx(Sidebar, { active: "hero-settings" }), _jsxs("main", { style: { flex: 1, padding: '40px' }, children: [_jsx("h1", { style: titleStyles, children: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0445\u0438\u0440\u043E-\u043F\u0430\u043D\u0435\u043B\u0438" }), _jsx(Card, { children: _jsxs("div", { style: formStyles, children: [_jsx(Input, { name: "slogan", label: "\u0421\u043B\u043E\u0433\u0430\u043D", value: settings.slogan, onChange: handleChange, placeholder: "TOP IT SCHOOL" }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '8px', fontWeight: 500 }, children: "\u041F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" }), _jsx("textarea", { name: "subtitle", value: settings.subtitle, onChange: handleChange, placeholder: "\u0428\u043A\u043E\u043B\u0430 \u0441 \u0443\u0433\u043B\u0443\u0431\u043B\u0435\u043D\u043D\u044B\u043C \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0435\u043C IT...", style: {
                                                width: '100%',
                                                minHeight: '80px',
                                                padding: '12px',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '4px',
                                                fontSize: '14px',
                                                fontFamily: 'inherit',
                                                resize: 'vertical',
                                            } })] }), _jsx(Input, { name: "cta_text", label: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438", value: settings.cta_text, onChange: handleChange, placeholder: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0443\u0440\u0441\u044B" }), message && (_jsx("p", { style: {
                                        color: message.includes('Ошибка') ? 'red' : 'green',
                                        fontWeight: 500
                                    }, children: message })), _jsx(Button, { onClick: handleSave, disabled: saving, children: saving ? 'Сохранение...' : 'Сохранить настройки' })] }) }), _jsxs("div", { style: previewStyles, children: [_jsx("h3", { style: { marginBottom: '16px', fontSize: '18px' }, children: "\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440" }), _jsx("h1", { style: previewTitleStyles, children: settings.slogan || 'TOP IT SCHOOL' }), _jsx("p", { style: previewSubtitleStyles, children: settings.subtitle || 'Подзаголовок...' }), _jsx("button", { style: {
                                    padding: '12px 24px',
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                }, children: settings.cta_text || 'Смотреть курсы' })] })] })] }));
};
