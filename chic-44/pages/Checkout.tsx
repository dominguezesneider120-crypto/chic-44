import React from 'react';
import { useTranslation } from '../context/LanguageContext';

interface CheckoutProps {
  onBack: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
    const { t } = useTranslation();
  return (
    <div className="max-w-2xl mx-auto text-center py-10">
      <button onClick={onBack} className="text-sm text-gray-600 hover:underline mb-6">&larr; {t('checkout_back_to_cart')}</button>
      <h1 className="text-3xl font-bold mb-6">{t('checkout_title')}</h1>
      
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="flex justify-center items-center mb-6">
            <div className="w-32 h-16 bg-indigo-900 flex items-center justify-center rounded-md">
                <span className="text-white text-3xl font-bold">BOLD</span>
            </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">{t('checkout_pay_with_qr')}</h2>
        <p className="text-gray-600 mb-6">{t('checkout_qr_instructions')}</p>
        
        <div className="flex justify-center">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://example.com/payment" alt="QR Code para pago" className="border-4 border-gray-200 p-2 rounded-lg" />
        </div>

        <p className="mt-6 text-sm text-gray-500">
          {t('checkout_terms_agreement').replace('{link}', '')}
          <a href="#" className="underline">{t('checkout_terms_link')}</a>.
        </p>
      </div>
    </div>
  );
};