import React, { useState } from 'react';
import { mockUser } from '../data/mockData';
import { useTranslation } from '../context/LanguageContext';
import { Icon } from '../components/Icon';
import type { Address, Order } from '../types';

type ProfileTab = 'details' | 'orders' | 'addresses';

const ProfileDetails: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-white p-8 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">{t('profile_details_title')}</h2>
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-semibold text-gray-600">{t('profile_details_name')}</label>
                    <p className="text-lg">{mockUser.name}</p>
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-600">{t('profile_details_email')}</label>
                    <p className="text-lg">{mockUser.email}</p>
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-600">{t('profile_details_phone')}</label>
                    <p className="text-lg">{mockUser.phone}</p>
                </div>
            </div>
        </div>
    );
};

const ProfileAddressCard: React.FC<{ address: Address }> = ({ address }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white p-6 border rounded-lg shadow-sm relative">
            {address.isDefault && (
                <span className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">{t('profile_addresses_default')}</span>
            )}
            <p className="font-semibold">{address.street}</p>
            <p>{address.city}, {address.state} {address.zip}</p>
            <p>{address.country}</p>
        </div>
    );
};

const ProfileAddresses: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t('profile_addresses_title')}</h2>
                <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors">
                    {t('profile_addresses_add_new')}
                </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {mockUser.addresses.map(addr => <ProfileAddressCard key={addr.id} address={addr} />)}
            </div>
        </div>
    );
};

const OrderStatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
    const { t } = useTranslation();
    const statusMap = {
        Processing: { text: t('profile_orders_status_processing'), color: 'bg-blue-100 text-blue-800' },
        Shipped: { text: t('profile_orders_status_shipped'), color: 'bg-yellow-100 text-yellow-800' },
        Delivered: { text: t('profile_orders_status_delivered'), color: 'bg-green-100 text-green-800' },
        Cancelled: { text: t('profile_orders_status_cancelled'), color: 'bg-red-100 text-red-800' },
    };
    return (
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusMap[status].color}`}>
            {statusMap[status].text}
        </span>
    );
};

const ProfileOrders: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">{t('profile_orders_title')}</h2>
            <div className="space-y-4">
                {mockUser.orders.length === 0 ? (
                    <p className="text-gray-600 text-center py-10">{t('profile_orders_empty')}</p>
                ) : (
                    mockUser.orders.map(order => (
                        <div key={order.id} className="bg-white p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div className="flex-1 mb-4 sm:mb-0">
                                <p className="font-bold text-lg">{t('profile_orders_number')} {order.id}</p>
                                <p className="text-sm text-gray-500">{t('profile_orders_date')}: {order.date}</p>
                                <p className="text-sm text-gray-500">{t('profile_orders_total')}: <span className="font-semibold">${order.total.toFixed(2)}</span></p>
                            </div>
                            <div className="w-full sm:w-auto flex items-center justify-between">
                                <OrderStatusBadge status={order.status} />
                                <button className="ml-4 text-sm font-semibold text-gray-700 hover:underline">{t('profile_orders_view_details')}</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};


export const ProfilePage: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<ProfileTab>('details');
    
    const sidebarItems: { id: ProfileTab; label: string; icon: 'user' | 'package' | 'mapPin' }[] = [
        { id: 'details', label: t('profile_sidebar_details'), icon: 'user' },
        { id: 'orders', label: t('profile_sidebar_orders'), icon: 'package' },
        { id: 'addresses', label: t('profile_sidebar_addresses'), icon: 'mapPin' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'details': return <ProfileDetails />;
            case 'orders': return <ProfileOrders />;
            case 'addresses': return <ProfileAddresses />;
            default: return null;
        }
    };

    return (
        <div className="bg-gray-50 -m-8 p-8 min-h-[calc(100vh-128px)]">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8">{t('profile_title')}</h1>
                <div className="grid md:grid-cols-4 gap-8 items-start">
                    <aside className="md:col-span-1 bg-white p-4 border rounded-lg shadow-sm">
                        <div className="flex items-center p-4 mb-4">
                            <img src={mockUser.avatar} alt="User Avatar" className="w-16 h-16 rounded-full mr-4" />
                            <div>
                                <p className="font-bold text-lg">{mockUser.name}</p>
                                <p className="text-sm text-gray-500 truncate">{mockUser.email}</p>
                            </div>
                        </div>
                        <nav className="flex flex-col space-y-2">
                            {sidebarItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`flex items-center p-3 rounded-md text-left text-sm font-medium transition-colors ${
                                        activeTab === item.id 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon type={item.icon} className="h-5 w-5 mr-3" />
                                    {item.label}
                                </button>
                            ))}
                            <button className="flex items-center p-3 rounded-md text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                                <Icon type="logout" className="h-5 w-5 mr-3" />
                                {t('profile_sidebar_logout')}
                            </button>
                        </nav>
                    </aside>
                    <main className="md:col-span-3">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};
