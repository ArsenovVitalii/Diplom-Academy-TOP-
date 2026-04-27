import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/ui/Card';
import { api } from '../api/client';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({ courses: 0, users: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const courses = await api.courses.getAll();
        const users = await api.users.getAll();
        setStats({ courses: courses.length, users: users.length });
      } catch (err) {
        console.error(err);
      }
    };
    loadStats();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active="dashboard" />
      <main style={{ flex: 1, padding: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Дашборд</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>📚</div>
              <div style={{ fontSize: '36px', fontWeight: 700 }}>{stats.courses}</div>
              <div style={{ color: 'var(--color-text-secondary)' }}>Курсов</div>
            </div>
          </Card>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>👥</div>
              <div style={{ fontSize: '36px', fontWeight: 700 }}>{stats.users}</div>
              <div style={{ color: 'var(--color-text-secondary)' }}>Пользователей</div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
