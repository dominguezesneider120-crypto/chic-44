
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const esMessages = {
  "nav_woman": "Mujer",
  "nav_man": "Hombre",
  "nav_discounts": "Descuentos",
  "brand_subtitle": "Bolsos & Moda",
  "category_bags": "Bolsos",
  "category_clothing": "Ropa",
  "category_accessories": "Accesorios",
  "category_item": "Categoría {number}",
  "view_all": "Ver todo",
  "cart_aria_label": "Ver carrito con {count} artículos",
  "footer_social": "Redes Sociales",
  "footer_about": "Acerca de Chic 44",
  "footer_info": "Información",
  "footer_contact": "Contacto",
  "footer_company": "La empresa",
  "footer_work_with_us": "Trabaje con nosotros",
  "footer_our_stores": "Nuestras tiendas",
  "footer_terms": "Términos y condiciones",
  "footer_warranties": "Garantías y devoluciones",
  "footer_customer_service": "Servicio al cliente y PQRS",
  "footer_data_policy": "Tratamiento de datos personales",
  "home_featured_products": "Productos Destacados",
  "product_back_to_products": "Volver a productos",
  "product_reference": "Referencia",
  "product_color": "Color",
  "product_size_bags": "Tamaño",
  "product_size_clothes": "Talla",
  "product_add_to_cart": "Añadir al carrito",
  "product_buy_now": "Comprar",
  "product_added_alert": "{quantity} x {name} ({color}, {size}) añadido al carrito!",
  "cart_title": "Tu Carrito de Compras",
  "cart_empty_title": "Tu carrito está vacío",
  "cart_empty_text": "Parece que no has añadido nada a tu carrito todavía.",
  "cart_continue_shopping": "Seguir comprando",
  "cart_item_color": "Color",
  "cart_item_size_bags": "Tamaño",
  "cart_item_size_clothes": "Talla",
  "cart_remove_item_aria": "Eliminar {name}",
  "cart_summary_title": "Resumen del Pedido",
  "cart_summary_subtotal": "Subtotal",
  "cart_summary_shipping": "Envío",
  "cart_summary_shipping_cost": "Gratis",
  "cart_summary_total": "Total",
  "cart_summary_checkout": "Proceder al Pago",
  "cart_summary_clear": "Vaciar Carrito",
  "checkout_back_to_cart": "Volver al carrito",
  "checkout_title": "Métodos de pago",
  "checkout_pay_with_qr": "Pagar con QR",
  "checkout_qr_instructions": "Escanea el siguiente código QR con tu aplicación de pagos para completar la compra.",
  "checkout_terms_agreement": "Al continuar, aceptas nuestros {link}.",
  "checkout_terms_link": "Términos y Condiciones",
  "footer_copyright": "© {year} Chic 44. Todos los derechos reservados. El contenido de este sitio web no puede ser reproducido sin el consentimiento expreso del titular.",

  "profile_title": "Mi Cuenta",
  "profile_sidebar_details": "Mis Datos",
  "profile_sidebar_orders": "Mis Pedidos",
  "profile_sidebar_addresses": "Mis Direcciones",
  "profile_sidebar_logout": "Cerrar Sesión",
  "profile_details_title": "Datos Personales",
  "profile_details_name": "Nombre",
  "profile_details_email": "Correo Electrónico",
  "profile_details_phone": "Teléfono",
  "profile_addresses_title": "Direcciones de Envío",
  "profile_addresses_default": "Predeterminada",
  "profile_addresses_add_new": "Añadir nueva dirección",
  "profile_orders_title": "Historial de Pedidos",
  "profile_orders_number": "Pedido N°",
  "profile_orders_date": "Fecha",
  "profile_orders_total": "Total",
  "profile_orders_status": "Estado",
  "profile_orders_view_details": "Ver detalles",
  "profile_orders_status_processing": "Procesando",
  "profile_orders_status_shipped": "Enviado",
  "profile_orders_status_delivered": "Entregado",
  "profile_orders_status_cancelled": "Cancelado",
  "profile_orders_empty": "Aún no tienes pedidos."
};

const enMessages = {
  "nav_woman": "Woman",
  "nav_man": "Man",
  "nav_discounts": "Discounts",
  "brand_subtitle": "Bags & Fashion",
  "category_bags": "Bags",
  "category_clothing": "Clothing",
  "category_accessories": "Accessories",
  "category_item": "Category {number}",
  "view_all": "View all",
  "cart_aria_label": "View cart with {count} items",
  "footer_social": "Social Media",
  "footer_about": "About Chic 44",
  "footer_info": "Information",
  "footer_contact": "Contact",
  "footer_company": "The company",
  "footer_work_with_us": "Work with us",
  "footer_our_stores": "Our stores",
  "footer_terms": "Terms and conditions",
  "footer_warranties": "Warranties and returns",
  "footer_customer_service": "Customer service and PQRS",
  "footer_data_policy": "Personal data treatment",
  "home_featured_products": "Featured Products",
  "product_back_to_products": "Back to products",
  "product_reference": "Reference",
  "product_color": "Color",
  "product_size_bags": "Size",
  "product_size_clothes": "Size",
  "product_add_to_cart": "Add to cart",
  "product_buy_now": "Buy Now",
  "product_added_alert": "{quantity} x {name} ({color}, {size}) added to cart!",
  "cart_title": "Your Shopping Cart",
  "cart_empty_title": "Your cart is empty",
  "cart_empty_text": "It seems you haven't added anything to your cart yet.",
  "cart_continue_shopping": "Continue Shopping",
  "cart_item_color": "Color",
  "cart_item_size_bags": "Size",
  "cart_item_size_clothes": "Size",
  "cart_remove_item_aria": "Remove {name}",
  "cart_summary_title": "Order Summary",
  "cart_summary_subtotal": "Subtotal",
  "cart_summary_shipping": "Shipping",
  "cart_summary_shipping_cost": "Free",
  "cart_summary_total": "Total",
  "cart_summary_checkout": "Proceed to Checkout",
  "cart_summary_clear": "Clear Cart",
  "checkout_back_to_cart": "Back to cart",
  "checkout_title": "Payment Methods",
  "checkout_pay_with_qr": "Pay with QR",
  "checkout_qr_instructions": "Scan the following QR code with your payment application to complete the purchase.",
  "checkout_terms_agreement": "By continuing, you agree to our {link}.",
  "checkout_terms_link": "Terms and Conditions",
  "footer_copyright": "© {year} Chic 44. All rights reserved. The content of this website may not be reproduced without the express consent of the owner.",

  "profile_title": "My Account",
  "profile_sidebar_details": "My Details",
  "profile_sidebar_orders": "My Orders",
  "profile_sidebar_addresses": "My Addresses",
  "profile_sidebar_logout": "Log Out",
  "profile_details_title": "Personal Details",
  "profile_details_name": "Name",
  "profile_details_email": "Email",
  "profile_details_phone": "Phone",
  "profile_addresses_title": "Shipping Addresses",
  "profile_addresses_default": "Default",
  "profile_addresses_add_new": "Add new address",
  "profile_orders_title": "Order History",
  "profile_orders_number": "Order #",
  "profile_orders_date": "Date",
  "profile_orders_total": "Total",
  "profile_orders_status": "Status",
  "profile_orders_view_details": "View details",
  "profile_orders_status_processing": "Processing",
  "profile_orders_status_shipped": "Shipped",
  "profile_orders_status_delivered": "Delivered",
  "profile_orders_status_cancelled": "Cancelled",
  "profile_orders_empty": "You don't have any orders yet."
};

const translations: Record<string, Record<string, string>> = {
  es: esMessages,
  en: enMessages,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
