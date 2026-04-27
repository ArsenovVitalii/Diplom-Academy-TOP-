import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../api/client';
import { useAuth } from './AuthContext';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

interface CartItem {
  id: string;
  course_id: string;
  course: Course;
}

interface CartContextType {
  items: CartItem[];
  addItem: (courseId: string) => Promise<void>;
  removeItem: (courseId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      loadCart();
    } else {
      setItems([]);
    }
  }, [token]);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      const cartItems = await api.cart.get();
      setItems(cartItems);
    } catch {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (courseId: string) => {
    await api.cart.add(courseId);
    await loadCart();
  };

  const removeItem = async (courseId: string) => {
    await api.cart.remove(courseId);
    await loadCart();
  };

  const clearCart = async () => {
    await api.cart.clear();
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.course.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
