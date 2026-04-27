const API_BASE = 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('token');

const request = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
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
        login: (email, password) => request('/auth/login/json', {
            method: 'POST',
            body: JSON.stringify({ username: email, password }),
            headers: { 'Content-Type': 'application/json' },
        }),
        register: (email, password) => request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),
        me: () => request('/auth/me'),
    },
    courses: {
        getAll: () => request('/courses'),
        getById: (id) => request(`/courses/${id}`),
        create: (data) => request('/courses', { method: 'POST', body: JSON.stringify(data) }),
        update: (id, data) => request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        delete: (id) => request(`/courses/${id}`, { method: 'DELETE' }),
    },
    cart: {
        get: () => request('/cart'),
        // ИСПРАВЛЕНО: course_id передается как query-параметр
        add: (courseId) => request(`/cart?course_id=${courseId}`, { method: 'POST' }),
        remove: (courseId) => request(`/cart/${courseId}`, { method: 'DELETE' }),
        clear: () => request('/cart', { method: 'DELETE' }),
    },
    orders: {
        getAll: () => request('/orders'),
        getById: (id) => request(`/orders/${id}`),
        create: (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
    },
    users: {
        getAll: () => request('/users'),
        getById: (id) => request(`/users/${id}`),
        delete: (id) => request(`/users/${id}`, { method: 'DELETE' }),
    },
    settings: {
        getHero: () => request('/settings/hero'),
        updateHero: (data) => request('/settings/hero', { method: 'PUT', body: JSON.stringify(data) }),
    },
};