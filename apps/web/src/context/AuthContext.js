import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const userData = await api.auth.me();
                    setUser(userData);
                    setToken(storedToken);
                }
                catch {
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);
    const login = async (email, password) => {
        const response = await api.auth.login(email, password);
        localStorage.setItem('token', response.access_token);
        setToken(response.access_token);
        setUser(response.user);
    };
    const register = async (email, password) => {
        const response = await api.auth.register(email, password);
        localStorage.setItem('token', response.access_token);
        setToken(response.access_token);
        setUser(response.user);
    };
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: { user, token, login, register, logout, isLoading }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
