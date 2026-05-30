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
  addItem: (courseId: string) => Promise<{ success: boolean; alreadyInCart?: boolean }>;
  removeItem: (courseId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  total: number;
  isLoading: boolean;
  isItemInCart: (courseId: string) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingCourseIds, setPendingCourseIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (token) {
      loadCart();
      setPendingCourseIds(new Set()); // Сброс pending при логине
    } else {
      setItems([]);
      setPendingCourseIds(new Set()); // Сброс pending при логауте
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

  const addItem = async (courseId: string): Promise<{ success: boolean; alreadyInCart: boolean }> => {
    console.log('[CartContext] addItem called for courseId:', courseId);
    console.log('[CartContext] Current items:', items);
    console.log('[CartContext] Pending course IDs:', Array.from(pendingCourseIds));
    
    // Проверяем, есть ли уже курс в корзине ИЛИ в процессе добавления
    const isAlreadyInCart = items.some(item => item.course_id === courseId) || pendingCourseIds.has(courseId);
    console.log('[CartContext] isAlreadyInCart (local check):', isAlreadyInCart);
    
    if (isAlreadyInCart) {
      console.log('[CartContext] Course already in cart or pending (local), returning alreadyInCart: true');
      return { success: false, alreadyInCart: true };
    }
    
    // Добавляем в pending
    setPendingCourseIds(prev => new Set(prev).add(courseId));
    
    try {
      await api.cart.add(courseId);
      await loadCart();
      console.log('[CartContext] Course added successfully');
      
      // Отправляем событие об изменении корзины
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { action: 'add', courseId } }));
      
      return { success: true, alreadyInCart: false };
    } catch (error: any) {
      const errorMessage = error?.message || '';
      console.log('[CartContext] Caught error, message:', errorMessage);
      
      // Проверяем, является ли ошибка "уже в корзине"
      const isAlreadyInCartError = errorMessage.toLowerCase().includes('already in cart') || 
                                    errorMessage.includes('duplicate') ||
                                    errorMessage.includes('exists');
      
      console.log('[CartContext] isAlreadyInCartError:', isAlreadyInCartError);
      
      if (isAlreadyInCartError) {
        return { success: false, alreadyInCart: true };
      }
      
      return { success: false, alreadyInCart: false };
    } finally {
      // Удаляем из pending
      setPendingCourseIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(courseId);
        return newSet;
      });
    }
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

  const isItemInCart = (courseId: string) => {
    return items.some(item => item.course_id === courseId);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, loadCart, total, isLoading, isItemInCart }}>
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
