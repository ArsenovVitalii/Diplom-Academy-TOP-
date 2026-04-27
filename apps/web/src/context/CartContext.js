import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuth } from './AuthContext';
const CartContext = createContext(null);
export const CartProvider = ({ children }) => {
    const { token } = useAuth();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (token) {
            loadCart();
        }
        else {
            setItems([]);
        }
    }, [token]);
    const loadCart = async () => {
        try {
            setIsLoading(true);
            const cartItems = await api.cart.get();
            setItems(cartItems);
        }
        catch {
            setItems([]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const addItem = async (courseId) => {
        await api.cart.add(courseId);
        await loadCart();
    };
    const removeItem = async (courseId) => {
        await api.cart.remove(courseId);
        await loadCart();
    };
    const clearCart = async () => {
        await api.cart.clear();
        setItems([]);
    };
    const total = items.reduce((sum, item) => sum + item.course.price, 0);
    return (_jsx(CartContext.Provider, { value: { items, addItem, removeItem, clearCart, total, isLoading }, children: children }));
};
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
