const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('token');

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = `${API_BASE}${endpoint}`;
  console.log('API Request:', { url, method: options.method, body: options.body });

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (networkError) {
    console.error('Network Error:', networkError);
    throw new Error('Network error: ' + (networkError as Error).message);
  }

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: 'Request failed' };
    }

    console.error('API Error:', { status: response.status, data: errorData });
    
    // Передаём детальное сообщение об ошибке
    const errorMessage = errorData.detail || `HTTP ${response.status}: Request failed`;
    const error = new Error(errorMessage);
    (error as any).status = response.status;
    (error as any).data = errorData;
    throw error;
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
    register: (email: string, password: string) =>
      request<{ access_token: string; user: any }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    verify: (email: string, code: string) =>
      request<{ detail: string; verified: boolean }>('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ email, verification_code: code }),
      }),
    resendCode: (email: string) =>
      request<{ detail: string }>('/auth/resend-code', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    me: () => request<any>('/auth/me'),
  },
  courses: {
    getAll: () => request<any[]>('/courses'),
    getById: (id: string) => request<any>(`/courses/${id}`),
    create: (data: any) => request<any>('/courses', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<any>(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<any>(`/courses/${id}`, { method: 'DELETE' }),
    getReviews: (courseId: string) => request<any[]>(`/reviews/course/${courseId}`),
    createReview: (courseId: string, data: { rating: number; text: string }) =>
      request<any>('/reviews', { method: 'POST', body: JSON.stringify({ course_id: courseId, ...data }) }),
    getRecommendations: (excludeIds: string[], limit: number = 3) =>
      request<any[]>(`/courses/random/recommendations?limit=${limit}&exclude_ids=${excludeIds.join(',')}`),
  },
  cart: {
    get: () => request<any[]>('/cart'),
    add: (courseId: string) => request<any>('/cart', { method: 'POST', body: JSON.stringify({ course_id: courseId }) }),
    remove: (courseId: string) => request<any>(`/cart/${courseId}`, { method: 'DELETE' }),
    clear: () => request<any>('/cart', { method: 'DELETE' }),
  },
  orders: {
    getAll: () => request<any[]>('/orders'),
    getById: (id: string) => request<any>(`/orders/${id}`),
    create: (data: { customer_name: string; phone: string }) => 
      request<any>('/orders', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (orderId: string, status: string) =>
      request<any>(`/orders/${orderId}/status`, { 
        method: 'PATCH', 
        body: JSON.stringify({ status }) 
      }),
},
  users: {
    getAll: () => request<any[]>('/users'),
    getById: (id: string) => request<any>(`/users/${id}`),
    delete: (id: string) => request<any>(`/users/${id}`, { method: 'DELETE' }),
    getProfile: () => request<any>('/public/my-profile'),
    updateProfile: (data: { name?: string; phone?: string; avatar_url?: string }) =>
      request<any>('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
    uploadAvatar: (avatarUrl: string) =>
      request<any>('/users/profile/avatar', { method: 'PATCH', body: JSON.stringify({ avatar_url: avatarUrl }) }),
  },
  settings: {
    getHero: () => request<any>('/settings/hero'),
    updateHero: (data: any) => request<any>('/settings/hero', { method: 'PUT', body: JSON.stringify(data) }),
  },
};
