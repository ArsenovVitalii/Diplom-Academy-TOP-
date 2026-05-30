import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Sidebar } from '../components/layout/Sidebar';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await api.orders.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
      alert('Ошибка загрузки заказов');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.orders.updateStatus(orderId, newStatus);
      alert(`Статус заказа изменён на ${newStatus === 'paid' ? 'Оплачен' : 'Отменён'}`);
      loadOrders();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Ошибка обновления статуса');
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return '⏳ В ожидании';
      case 'paid': return '✅ Оплачен';
      case 'cancelled': return '❌ Отменён';
      default: return status;
    }
  };

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'pending': return '#ff9800';
      case 'paid': return '#4caf50';
      case 'cancelled': return '#f44336';
      default: return '#999';
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar active="orders" />
        <main style={{ flex: 1, padding: '40px', textAlign: 'center' }}>
          <p>Загрузка...</p>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active="orders" />
      <main style={{ flex: 1, padding: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>Управление заказами</h1>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => setFilter('all')} style={{ padding: '8px 16px', backgroundColor: filter === 'all' ? '#cd2532' : '#e0e0e0', color: filter === 'all' ? 'white' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Все</button>
          <button onClick={() => setFilter('pending')} style={{ padding: '8px 16px', backgroundColor: filter === 'pending' ? '#ff9800' : '#e0e0e0', color: filter === 'pending' ? 'white' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>В ожидании</button>
          <button onClick={() => setFilter('paid')} style={{ padding: '8px 16px', backgroundColor: filter === 'paid' ? '#4caf50' : '#e0e0e0', color: filter === 'paid' ? 'white' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Оплаченные</button>
          <button onClick={() => setFilter('cancelled')} style={{ padding: '8px 16px', backgroundColor: filter === 'cancelled' ? '#f44336' : '#e0e0e0', color: filter === 'cancelled' ? 'white' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Отменённые</button>
        </div>

        {filteredOrders.length === 0 ? (
          <p>Нет заказов</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #ddd' }}>ID</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #ddd' }}>Пользователь</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #ddd' }}>Сумма</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #ddd' }}>Статус</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #ddd' }}>Дата</th>
                  <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #ddd' }}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{order.id.slice(0, 8)}...</td>
                    <td style={{ padding: '12px' }}>{order.user?.email || order.customer_name || '—'}</td>
                    <td style={{ padding: '12px' }}>{order.total_amount} ₽</td>
                    <td style={{ padding: '12px', color: getStatusColor(order.status), fontWeight: 500 }}>
                      {getStatusText(order.status)}
                    </td>
                    <td style={{ padding: '12px' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>
                      {order.status === 'pending' && (
                        <>
                          <button onClick={() => updateStatus(order.id, 'paid')} style={{ marginRight: '8px', padding: '6px 12px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Оплачен</button>
                          <button onClick={() => updateStatus(order.id, 'cancelled')} style={{ padding: '6px 12px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Отменить</button>
                        </>
                      )}
                      {order.status === 'paid' && (
                        <button onClick={() => updateStatus(order.id, 'cancelled')} style={{ padding: '6px 12px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Отменить</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};