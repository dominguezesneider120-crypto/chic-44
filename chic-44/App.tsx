import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { ProfilePage } from './pages/ProfilePage';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import type { Product, Page, Category } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('productDetail');
  };
  
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    navigateTo('category');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onProductClick={handleProductClick} />;
      case 'category':
        return selectedCategory ? <CategoryPage category={selectedCategory} onProductClick={handleProductClick} /> : <Home onProductClick={handleProductClick} />;
      case 'productDetail':
        return selectedProduct ? <ProductDetail product={selectedProduct} onBack={() => navigateTo('home')} onNavigateToCart={() => navigateTo('cart')} /> : <Home onProductClick={handleProductClick} />;
      case 'cart':
        return <CartPage onNavigate={navigateTo} />;
      case 'checkout':
        return <Checkout onBack={() => navigateTo('cart')} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Home onProductClick={handleProductClick} />;
    }
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="bg-white text-gray-800 min-h-screen flex flex-col font-sans">
          <Header onNavigate={navigateTo} onCategoryClick={handleCategoryClick} />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderPage()}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;
