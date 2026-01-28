import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.radius': 'Radius',
    'common.category': 'Category',
    'common.all': 'All',
    'common.open': 'Open',
    'common.closed': 'Closed',
    'common.logout': 'Logout',
    'common.login': 'Log in',
    'common.settings': 'Settings',
    'common.language': 'Language',
    'common.theme': 'Theme',
    'common.light': 'Light',
    'common.dark': 'Dark',
    'common.english': 'English',
    'common.bangla': 'বাংলা',
    'common.home': 'Home',
    'common.dashboard': 'Dashboard',
    'common.back': 'Back',
    
    // Categories
    'category.all': 'All Shops',
    'category.grocery': 'Grocery',
    'category.medicine': 'Medicine',
    'category.cosmetics': 'Cosmetics',
    'category.clothing': 'Women Clothing',
    'category.handmade': 'Handmade',
    
    // Dashboard
    'dashboard.shopsNearby': 'Shops Nearby',
    'dashboard.withinRadius': 'Within {radius}km radius',
    'dashboard.shopsFound': '{count} shops found within {radius}km',
    'dashboard.searchPlaceholder': 'Search shops or products...',
    'dashboard.legend': 'Legend',
    'dashboard.regularShop': 'Regular Shop',
    'dashboard.womenLed': 'Women-Led',
    'dashboard.yourLocation': 'Your Location',
    'dashboard.inStock': 'In Stock',
    
    // Shopkeeper Dashboard
    'shopkeeper.title': 'Shopkeeper Dashboard',
    'shopkeeper.todaySales': "Today's Sales",
    'shopkeeper.weeklySales': 'Weekly Sales',
    'shopkeeper.monthlySales': 'Monthly Sales',
    'shopkeeper.inventory': 'Inventory',
    'shopkeeper.lowStock': 'Low Stock Alerts',
    'shopkeeper.expiryAlerts': 'Expiry Alerts',
    'shopkeeper.dueAmount': 'Due Amount',
    'shopkeeper.profit': 'Profit',
    'shopkeeper.bestSelling': 'Best Selling Products',
    'shopkeeper.slowMoving': 'Slow Moving Products',
    'shopkeeper.reorderSuggestions': 'AI Reorder Suggestions',
    'shopkeeper.orderProducts': 'Order Products',
    'shopkeeper.viewInventory': 'View Inventory',
    'shopkeeper.cashSales': 'Cash Sales',
    'shopkeeper.digitalSales': 'Digital Sales',
    
    // Brand Dashboard
    'brand.title': 'Brand Dashboard',
    'brand.salesHeatmap': 'Sales Heatmap',
    'brand.regionalPerformance': 'Regional Performance',
    'brand.demandAnalysis': 'Demand Analysis',
    'brand.productPerformance': 'Product Performance',
    'brand.marketInsights': 'Market Insights',
    'brand.shopReach': 'Shop Reach',
    'brand.customerInsights': 'Customer Insights',
    'brand.runCampaign': 'Run Campaign',
    'brand.viewAnalytics': 'View Analytics',
    
    // Company Dashboard
    'company.title': 'Company Dashboard',
    'company.supplyChain': 'Supply Chain',
    'company.productTracking': 'Product Tracking',
    'company.authenticity': 'Authenticity Score',
    'company.impactMetrics': 'SDG Impact Metrics',
    'company.womenEmpowerment': 'Women Empowerment',
    'company.ruralReach': 'Rural Reach',
    'company.wasteReduction': 'Waste Reduction',
    'company.shopNetwork': 'Shop Network',
    'company.systemHealth': 'System Health',
    'company.iotDevices': 'IoT Devices',
  },
  bn: {
    // Common
    'common.search': 'অনুসন্ধান',
    'common.filter': 'ফিল্টার',
    'common.radius': 'ব্যাসার্ধ',
    'common.category': 'বিভাগ',
    'common.all': 'সব',
    'common.open': 'খোলা',
    'common.closed': 'বন্ধ',
    'common.logout': 'লগ আউট',
    'common.login': 'লগ ইন',
    'common.settings': 'সেটিংস',
    'common.language': 'ভাষা',
    'common.theme': 'থিম',
    'common.light': 'লাইট',
    'common.dark': 'ডার্ক',
    'common.english': 'English',
    'common.bangla': 'বাংলা',
    'common.home': 'হোম',
    'common.dashboard': 'ড্যাশবোর্ড',
    'common.back': 'ফিরে যান',
    
    // Categories
    'category.all': 'সব দোকান',
    'category.grocery': 'মুদি',
    'category.medicine': 'ওষুধ',
    'category.cosmetics': 'প্রসাধনী',
    'category.clothing': 'মহিলা পোশাক',
    'category.handmade': 'হস্তনির্মিত',
    
    // Dashboard
    'dashboard.shopsNearby': 'কাছের দোকান',
    'dashboard.withinRadius': '{radius} কিমি ব্যাসার্ধের মধ্যে',
    'dashboard.shopsFound': '{radius} কিমি এর মধ্যে {count}টি দোকান পাওয়া গেছে',
    'dashboard.searchPlaceholder': 'দোকান বা পণ্য খুঁজুন...',
    'dashboard.legend': 'লেজেন্ড',
    'dashboard.regularShop': 'সাধারণ দোকান',
    'dashboard.womenLed': 'নারী-পরিচালিত',
    'dashboard.yourLocation': 'আপনার অবস্থান',
    'dashboard.inStock': 'স্টকে আছে',
    
    // Shopkeeper Dashboard
    'shopkeeper.title': 'দোকানদার ড্যাশবোর্ড',
    'shopkeeper.todaySales': 'আজকের বিক্রয়',
    'shopkeeper.weeklySales': 'সাপ্তাহিক বিক্রয়',
    'shopkeeper.monthlySales': 'মাসিক বিক্রয়',
    'shopkeeper.inventory': 'ইনভেন্টরি',
    'shopkeeper.lowStock': 'কম স্টক সতর্কতা',
    'shopkeeper.expiryAlerts': 'মেয়াদ শেষ সতর্কতা',
    'shopkeeper.dueAmount': 'বকেয়া পরিমাণ',
    'shopkeeper.profit': 'লাভ',
    'shopkeeper.bestSelling': 'সেরা বিক্রিত পণ্য',
    'shopkeeper.slowMoving': 'ধীর গতির পণ্য',
    'shopkeeper.reorderSuggestions': 'AI রিঅর্ডার সাজেশন',
    'shopkeeper.orderProducts': 'পণ্য অর্ডার করুন',
    'shopkeeper.viewInventory': 'ইনভেন্টরি দেখুন',
    'shopkeeper.cashSales': 'নগদ বিক্রয়',
    'shopkeeper.digitalSales': 'ডিজিটাল বিক্রয়',
    
    // Brand Dashboard
    'brand.title': 'ব্র্যান্ড ড্যাশবোর্ড',
    'brand.salesHeatmap': 'বিক্রয় হিটম্যাপ',
    'brand.regionalPerformance': 'আঞ্চলিক পারফরম্যান্স',
    'brand.demandAnalysis': 'চাহিদা বিশ্লেষণ',
    'brand.productPerformance': 'পণ্যের পারফরম্যান্স',
    'brand.marketInsights': 'বাজার অন্তর্দৃষ্টি',
    'brand.shopReach': 'দোকান পৌঁছানো',
    'brand.customerInsights': 'গ্রাহক অন্তর্দৃষ্টি',
    'brand.runCampaign': 'ক্যাম্পেইন চালান',
    'brand.viewAnalytics': 'বিশ্লেষণ দেখুন',
    
    // Company Dashboard
    'company.title': 'কোম্পানি ড্যাশবোর্ড',
    'company.supplyChain': 'সাপ্লাই চেইন',
    'company.productTracking': 'পণ্য ট্র্যাকিং',
    'company.authenticity': 'প্রামাণিকতা স্কোর',
    'company.impactMetrics': 'SDG প্রভাব মেট্রিক্স',
    'company.womenEmpowerment': 'নারী ক্ষমতায়ন',
    'company.ruralReach': 'গ্রামীণ পৌঁছানো',
    'company.wasteReduction': 'বর্জ্য হ্রাস',
    'company.shopNetwork': 'দোকান নেটওয়ার্ক',
    'company.systemHealth': 'সিস্টেম স্বাস্থ্য',
    'company.iotDevices': 'IoT ডিভাইস',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('shopsync-language') as Language;
      return stored || 'en';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('shopsync-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
