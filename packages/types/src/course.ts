export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseInput {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface UpdateCourseInput {
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}
