import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { api } from '../api/client';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await api.users.getAll();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить пользователя?')) return;
    try {
      await api.users.delete(id);
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active="users" />
      <main style={{ flex: 1, padding: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>Пользователи</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {users.map((user) => (
            <Card key={user.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600 }}>{user.email}</p>
                  <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: user.role === 'admin' ? 'var(--color-accent)' : 'var(--color-block)', color: user.role === 'admin' ? 'white' : 'var(--color-text)', borderRadius: '4px' }}>
                    {user.role === 'admin' ? 'Админ' : 'Покупатель'}
                  </span>
                </div>
                <Button variant="danger" size="small" onClick={() => handleDelete(user.id)}>Удалить</Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
