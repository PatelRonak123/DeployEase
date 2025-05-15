export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}
