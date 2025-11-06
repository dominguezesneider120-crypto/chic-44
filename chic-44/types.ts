export type Page = 'home' | 'productDetail' | 'checkout' | 'category' | 'cart' | 'profile';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  reference: string;
  colors: string[];
  sizes: string[];
  images: string[];
  category: Category;
  stock: number;
  status: 'active' | 'reserved' | 'sold';
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export type Category = 'Bolsos' | 'Ropa' | 'Accesorios';

export type MainCategory = string;

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
  orders: Order[];
}
