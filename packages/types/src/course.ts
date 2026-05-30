export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  duration: string;
  ageBadge: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseInput {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  duration?: string;
  ageBadge?: string;
}

export interface UpdateCourseInput {
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  duration?: string;
  ageBadge?: string;
}
