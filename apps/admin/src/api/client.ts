const API_BASE = 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('adminToken');

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || 'Request failed');
  }

  return response.json();
};

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ access_token: string; user: any }>('/auth/login/json', {
        method: 'POST',
        body: JSON.stringify({ username: email, password }),
        headers: { 'Content-Type': 'application/json' },
      }),
    me: () => request<any>('/auth/me'),
  },
  courses: {
    getAll: () => request<any[]>('/courses'),
    getById: (id: string) => request<any>(`/courses/${id}`),
    create: (data: any) => request<any>('/courses', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<any>(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<any>(`/courses/${id}`, { method: 'DELETE' }),
  },
  users: {
    getAll: () => request<any[]>('/users'),
    delete: (id: string) => request<any>(`/users/${id}`, { method: 'DELETE' }),
  },
  settings: {
    getHero: () => request<any>('/settings/hero'),
    updateHero: (data: any) => request<any>('/settings/hero', { method: 'PUT', body: JSON.stringify(data) }),
  },
};
