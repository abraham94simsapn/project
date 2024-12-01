export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface User {
  id: number;
  email: string;
  role: 'user' | 'admin';
  balance: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}