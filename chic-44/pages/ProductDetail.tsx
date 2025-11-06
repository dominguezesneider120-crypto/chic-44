import React, { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/LanguageContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onNavigateToCart: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onNavigateToCart }) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    alert(
        t('product_added_alert')
        .replace('{quantity}', quantity.toString())
        .replace('{name}', product.name)
        .replace('{color}', selectedColor)
        .replace('{size}', selectedSize)
    );
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    onNavigateToCart();
  };

  return (
    <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="text-sm text-gray-600 hover:underline mb-6">&larr; {t('product_back_to_products')}</button>
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
                {product.images.map((img, idx) => (
                    <img 
                        key={idx}
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className={`w-20 h-20 object-cover cursor-pointer border-2 ${mainImage === img ? 'border-black' : 'border-transparent'}`}
                        onClick={() => setMainImage(img)}
                    />
                ))}
            </div>
            <div className="flex-1 aspect-w-1 aspect-h-1 bg-gray-100">
                <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="border-t border-gray-200 pt-4 mb-6">
              <p className="text-sm text-gray-500">{t('product_reference')}: {product.reference}</p>
          </div>

          {/* Color Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">{t('product_color')}: <span className="font-normal">{selectedColor}</span></h3>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <button 
                  key={color} 
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 w-8 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                  style={{ backgroundColor: color.toLowerCase() === 'negro' ? 'black' : (color.toLowerCase() === 'café' ? '#8B4513' : color.toLowerCase()) }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">
                {product.category === 'Bolsos' ? t('product_size_bags') : t('product_size_clothes')}:
            </h3>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity and Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex border rounded-md items-center">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg">-</button>
                  <span className="px-4 py-2 text-md w-12 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-4 py-2 text-lg">+</button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 bg-white border border-black text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  {t('product_add_to_cart')}
              </button>
          </div>
          <button onClick={handleBuyNow} className="mt-4 w-full bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
              {t('product_buy_now')}
          </button>
        </div>
      </div>
    </div>
  );
};