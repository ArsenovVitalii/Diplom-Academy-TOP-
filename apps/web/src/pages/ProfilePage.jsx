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
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const ordersData = await api.orders.getAll();
                setOrders(ordersData);
            } catch (err) {
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
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
                        <div style={infoRowStyles}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Email</span>
                            <span>{user?.email}</span>
                        </div>
                        <div style={infoRowStyles}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Дата регистрации</span>
                            <span>{user?.created_at ? formatDate(user.created_at) : 'Неизвестно'}</span>
                        </div>
                        <div style={{ marginTop: '24px', textAlign: 'center' }}>
                            <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>
                                Выйти
                            </Button>
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
                            orders.map((order) => (
                                <div key={order.id} style={orderItemStyles}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <span style={{ fontWeight: 600 }}>Заказ #{order.id.slice(0, 8)}</span>
                                        <span style={{
                                            color: order.status === 'paid' ? 'green' : 'orange',
                                            fontWeight: 500
                                        }}>
                                            {order.status === 'paid' ? '✅ Оплачен' : '⏳ В ожидании'}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                                        {formatDate(order.created_at)}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>{item.course?.title || 'Курс'}</span>
                                                <span style={{ fontWeight: 500 }}>
                                                    {item.price_at_purchase?.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginTop: '12px',
                                        paddingTop: '12px',
                                        borderTop: '1px solid var(--color-border)',
                                        fontWeight: 700,
                                        fontSize: '18px'
                                    }}>
                                        Итого: {order.total_amount.toLocaleString()}
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