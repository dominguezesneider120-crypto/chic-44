import React from 'react';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/LanguageContext';
import type { Page, CartItem } from '../types';
import { Icon } from '../components/Icon';

interface CartPageProps {
  onNavigate: (page: Page) => void;
}

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const { t } = useTranslation();

    return (
        <div className="flex items-center py-4 border-b">
            <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
            <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{t('cart_item_color')}: {item.selectedColor}</p>
                <p className="text-sm text-gray-500">
                    {item.category === 'Bolsos' ? t('cart_item_size_bags') : t('cart_item_size_clothes')}: {item.selectedSize}
                </p>
            </div>
            <div className="flex border rounded-md items-center mx-4">
                <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)} className="px-3 py-1 text-lg">-</button>
                <span className="px-3 py-1 text-md w-10 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)} className="px-3 py-1 text-lg">+</button>
            </div>
            <p className="w-24 text-right font-semibold mx-4">${(item.price * item.quantity).toFixed(2)}</p>
            <button 
                onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                className="text-gray-500 hover:text-red-600"
                aria-label={t('cart_remove_item_aria').replace('{name}', item.name)}
            >
                <Icon type="trash" className="h-5 w-5" />
            </button>
        </div>
    );
};


export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, cartCount, clearCart } = useCart();
  const { t } = useTranslation();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartCount === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">{t('cart_empty_title')}</h1>
        <p className="text-gray-600 mb-8">{t('cart_empty_text')}</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
        >
          {t('cart_continue_shopping')}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t('cart_title')}</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            {cart.map(item => (
                <CartItemRow key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} item={item} />
            ))}
        </div>
        <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h2 className="text-xl font-bold mb-4">{t('cart_summary_title')}</h2>
                <div className="flex justify-between mb-2 text-gray-600">
                    <span>{t('cart_summary_subtotal')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between mb-4 text-gray-600">
                    <span>{t('cart_summary_shipping')}</span>
                    <span>{t('cart_summary_shipping_cost')}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>{t('cart_summary_total')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => onNavigate('checkout')}
                  className="mt-6 w-full bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                >
                  {t('cart_summary_checkout')}
                </button>
                 <button 
                  onClick={() => clearCart()}
                  className="mt-4 w-full text-center text-sm text-red-600 hover:underline"
                >
                  {t('cart_summary_clear')}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};