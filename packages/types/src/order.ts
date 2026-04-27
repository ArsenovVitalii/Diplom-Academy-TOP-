import { Course } from './course';

export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export interface CartItem {
  courseId: string;
  addedAt: Date;
}

export interface CartItemWithCourse extends CartItem {
  course: Course;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface OrderWithCourses {
  id: string;
  userId: string;
  items: CartItemWithCourse[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
}
