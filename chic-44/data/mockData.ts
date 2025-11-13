
import type { Product, User, Order, Address } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Bolso de Cuero Clásico',
    description: 'Un bolso elegante y atemporal, perfecto para cualquier ocasión. Hecho con cuero de alta calidad.',
    price: 189.99,
    reference: 'CHC-B-001',
    colors: ['Negro', 'Café', 'Rojo'],
    sizes: ['Pequeño', 'Mediano', 'Grande'],
    images: [
      'https://res.cloudinary.com/dt1rhz43z/image/upload/v1762976063/2_sjgw7w.png',
      'https://res.cloudinary.com/dt1rhz43z/image/upload/v1762976063/6_crgzlk.png',
      'https://res.cloudinary.com/dt1rhz43z/image/upload/v1762976062/4_rnqwrm.png',
    ],
    category: 'Bolsos',
    stock: 10,
    status: 'active',
  },
  {
    id: 2,
    name: 'Vestido de Verano Floral',
    description: 'Ligero y fresco, este vestido es ideal para los días soleados. Estampado floral vibrante.',
    price: 89.99,
    reference: 'CHC-R-002',
    colors: ['Azul Floral', 'Rosa Floral'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://picsum.photos/seed/product2/800/800',
      'https://picsum.photos/seed/product2-2/800/800',
    ],
    category: 'Ropa',
    stock: 15,
    status: 'active',
  },
  {
    id: 3,
    name: 'Gafas de Sol Aviador',
    description: 'Protege tus ojos con estilo. Un diseño clásico que nunca pasa de moda.',
    price: 59.99,
    reference: 'CHC-A-003',
    colors: ['Dorado', 'Plata', 'Negro'],
    sizes: ['Única'],
    images: [
      'https://picsum.photos/seed/product3/800/800',
    ],
    category: 'Accesorios',
    stock: 25,
    status: 'active',
  },
  {
    id: 4,
    name: 'Mochila Urbana Resistente',
    description: 'Perfecta para el día a día, con múltiples compartimentos y material resistente al agua.',
    price: 120.00,
    reference: 'CHC-B-004',
    colors: ['Gris', 'Negro'],
    sizes: ['Única'],
    images: [
      'https://picsum.photos/seed/product4/800/800',
      'https://picsum.photos/seed/product4-2/800/800',
    ],
    category: 'Bolsos',
    stock: 8,
    status: 'active',
  },
   {
    id: 5,
    name: 'Chaqueta de Jean',
    description: 'Un clásico indispensable en cualquier guardarropa. Versátil y duradera.',
    price: 110.50,
    reference: 'CHC-R-005',
    colors: ['Azul Claro', 'Azul Oscuro'],
    sizes: ['S', 'M', 'L'],
    images: [
      'https://picsum.photos/seed/product5/800/800',
    ],
    category: 'Ropa',
    stock: 12,
    status: 'active',
  },
  {
    id: 6,
    name: 'Cinturón de Cuero Reversible',
    description: 'Dos cinturones en uno. Negro por un lado, café por el otro. Hebilla metálica elegante.',
    price: 45.00,
    reference: 'CHC-A-006',
    colors: ['Negro/Café'],
    sizes: ['32', '34', '36'],
    images: [
      'https://picsum.photos/seed/product6/800/800',
    ],
    category: 'Accesorios',
    stock: 30,
    status: 'active',
  },
];

const mockUserAddresses: Address[] = [
  {
    id: 1,
    street: 'Calle Falsa 123',
    city: 'Bogotá',
    state: 'Cundinamarca',
    zip: '110111',
    country: 'Colombia',
    isDefault: true,
  },
  {
    id: 2,
    street: 'Avenida Siempre Viva 742',
    city: 'Medellín',
    state: 'Antioquia',
    zip: '050030',
    country: 'Colombia',
    isDefault: false,
  },
];

const mockUserOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-07-15',
    items: [
      { product: mockProducts[0], quantity: 1, selectedColor: 'Negro', selectedSize: 'Mediano' },
      { product: mockProducts[2], quantity: 1, selectedColor: 'Dorado', selectedSize: 'Única' },
    ],
    total: mockProducts[0].price + mockProducts[2].price,
    status: 'Delivered',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-07-28',
    items: [
      { product: mockProducts[1], quantity: 1, selectedColor: 'Azul Floral', selectedSize: 'M' },
    ],
    total: mockProducts[1].price,
    status: 'Shipped',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-08-01',
    items: [
      { product: mockProducts[4], quantity: 2, selectedColor: 'Azul Claro', selectedSize: 'L' },
    ],
    total: mockProducts[4].price * 2,
    status: 'Processing',
  },
];


export const mockUser: User = {
  name: 'Ana García',
  email: 'ana.garcia@example.com',
  phone: '+57 300 123 4567',
  avatar: 'https://i.pravatar.cc/150?u=anagarcia',
  addresses: mockUserAddresses,
  orders: mockUserOrders,
};
