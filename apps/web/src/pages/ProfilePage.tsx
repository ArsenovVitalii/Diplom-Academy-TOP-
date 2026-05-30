import { useEffect, useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export const ProfilePage = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [nameValue, setNameValue] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const profileData = await api.users.getProfile();
                setProfile(profileData);
                setNameValue(profileData.name || '');
                
                if (profileData.avatar_url) {
                    const fullAvatarUrl = profileData.avatar_url.startsWith('http') 
                        ? profileData.avatar_url 
                        : `http://localhost:8000${profileData.avatar_url}`;
                    setAvatarPreview(fullAvatarUrl);
                }
                
                const ordersData = await api.orders.getAll();
                setOrders(ordersData);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            alert('Размер файла должен быть не более 2 МБ');
            return;
        }
        
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            alert('Разрешены только форматы JPG и PNG');
            return;
        }
        
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleUploadAvatar = async () => {
        if (!avatarFile || !token) return;
        setUploadingAvatar(true);
        try {
            const base64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(avatarFile);
            });
            
            const response = await api.users.uploadAvatar(base64 as string);
            
            if (response.avatar_url) {
                const fullAvatarUrl = `http://localhost:8000${response.avatar_url}`;
                setAvatarPreview(fullAvatarUrl);
                setProfile((prev: any) => prev ? { ...prev, avatar_url: response.avatar_url } : null);
            }
            
            setAvatarFile(null);
            alert('Аватарка успешно загружена!');
        } catch (err: any) {
            console.error('Error uploading avatar:', err);
            alert('Не удалось загрузить аватарку: ' + (err.message || 'Неизвестная ошибка'));
        } finally {
            setUploadingAvatar(false);
        }
    };

    const handleSaveProfile = async () => {
        setSavingProfile(true);
        try {
            const data = { name: nameValue };
            const updatedProfile = await api.users.updateProfile(data);
            setProfile(updatedProfile);
            setEditingName(false);
            alert('Профиль обновлён!');
        } catch (err: any) {
            console.error('Error saving profile:', err);
            alert('Не удалось сохранить профиль: ' + (err.message || 'Неизвестная ошибка'));
        } finally {
            setSavingProfile(false);
        }
    };

    const styles = {
        padding: 'clamp(30px, 5vw, 60px) 0',
        maxWidth: '800px',
        margin: '0 auto',
    };

    const titleStyles = {
        fontSize: 'clamp(24px, 5vw, 36px)',
        fontWeight: 700,
        marginBottom: 'clamp(20px, 4vw, 32px)',
    };

    const sectionStyles = {
        marginBottom: 'clamp(20px, 4vw, 32px)',
    };

    const sectionTitleStyles = {
        fontSize: 'clamp(18px, 3vw, 20px)',
        fontWeight: 600,
        marginBottom: 'clamp(12px, 2vw, 16px)',
    };

    const infoRowStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid var(--color-border)',
        flexWrap: 'wrap',
        gap: '8px',
    };

    const avatarContainerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '24px',
    };

    const avatarStyles = {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-block)',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        overflow: 'hidden',
    };

    const avatarInputStyles = {
        display: 'none',
    };

    const avatarButtonGroupStyles = {
        display: 'flex',
        gap: '12px',
    };

    const orderItemStyles = {
        padding: '16px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        marginBottom: '12px',
    };

    if (loading) {
        return (
            <Layout>
                <div className="container" style={{ padding: '100px', textAlign: 'center' }}>
                    <p>Загрузка...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container" style={styles}>
                <h1 style={titleStyles}>Личный кабинет</h1>

                <Card>
                    <div style={sectionStyles}>
                        <h2 style={sectionTitleStyles}>Профиль</h2>
                        
                        <div style={avatarContainerStyles}>
                            <div style={avatarStyles}>
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                ) : (
                                    <span>{(user?.email || '?').charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <div style={avatarButtonGroupStyles}>
                                <input id="avatar-upload" type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleAvatarChange} style={avatarInputStyles} />
                                <Button size="small" variant="outline" onClick={() => document.getElementById('avatar-upload')?.click()}>
                                    Выбрать фото
                                </Button>
                                {avatarFile && (
                                    <Button size="small" onClick={handleUploadAvatar} disabled={uploadingAvatar}>
                                        {uploadingAvatar ? 'Загрузка...' : 'Сохранить'}
                                    </Button>
                                )}
                            </div>
                            <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>JPG/PNG, до 2 МБ</p>
                        </div>
                        
                        <div style={infoRowStyles}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Имя</span>
                            {editingName ? (
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <input 
                                        type="text" 
                                        value={nameValue} 
                                        onChange={(e) => setNameValue(e.target.value)} 
                                        style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', minWidth: '200px' }} 
                                        autoFocus 
                                    />
                                    <Button size="small" onClick={handleSaveProfile} disabled={savingProfile}>
                                        {savingProfile ? '...' : 'OK'}
                                    </Button>
                                    <Button size="small" variant="outline" onClick={() => { setEditingName(false); setNameValue(profile?.name || ''); }}>
                                        Отмена
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <span>{profile?.name || 'Не указано'}</span>
                                    <Button size="small" variant="outline" onClick={() => setEditingName(true)}>Изменить</Button>
                                </>
                            )}
                        </div>
                        
                        <div style={infoRowStyles}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Email</span>
                            <span>{user?.email}</span>
                        </div>
                        
                        <div style={infoRowStyles}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Дата регистрации</span>
                            <span>{user?.created_at ? formatDate(user.created_at) : 'Неизвестно'}</span>
                        </div>
                        
                        <div style={{ marginTop: '24px', textAlign: 'center' }}>
                            <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>Выйти</Button>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div style={sectionStyles}>
                        <h2 style={sectionTitleStyles}>История заказов</h2>
                        {orders.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
                                <p style={{ marginBottom: '16px' }}>У вас пока нет заказов</p>
                                <Link to="/courses">
                                    <Button>Перейти в каталог</Button>
                                </Link>
                            </div>
                        ) : (
                            orders.map((order: any) => (
                                <div key={order.id} style={orderItemStyles}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <span style={{ fontWeight: 600 }}>Заказ #{order.id.slice(0, 8)}</span>
                                        <span style={{ color: order.status === 'paid' ? 'green' : 'orange', fontWeight: 500 }}>
                                            {order.status === 'paid' ? '✅ Оплачен' : '⏳ В ожидании'}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                                        {formatDate(order.created_at)}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {order.items?.map((item: any, idx: number) => (
                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>{item.course?.title || 'Курс'}</span>
                                                <span style={{ fontWeight: 500 }}>
                                                    {item.price_at_purchase?.toLocaleString()} ₽
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-border)', fontWeight: 700, fontSize: '18px' }}>
                                        Итого: {order.total_amount.toLocaleString()} ₽
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
