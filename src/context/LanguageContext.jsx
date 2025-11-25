import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resources } from '../i18n/locales'; // Import nguồn ngôn ngữ

const LanguageContext = createContext();

// URL mapping giữa tiếng Việt và tiếng Anh
const URL_MAPPINGS = {
    // Men
    '/do-nam': '/men',
    '/ao-chay-bo-nam': '/men/shirt',
    '/quan-chay-bo-nam': '/men/pants',
    '/giay-chay-bo-nam': '/men/run-shoes',
    '/giay-chay-dia-hinh-nam': '/men/trail-shoes',
    
    // Women
    '/do-nu': '/women',
    '/ao-chay-bo-nu': '/women/shirt',
    '/quan-chay-bo-nu': '/women/pants',
    '/giay-chay-bo-nu': '/women/run-shoes',
    '/giay-chay-dia-hinh-nu': '/women/trail-shoes',
    
    // Watch
    '/dong-ho': '/watch',
    '/dong-ho-suunto': '/watch/suunto',
    '/dong-ho-garmin': '/watch/garmin',
    '/dong-ho-coros': '/watch/coros',
};

// Tạo reverse mapping (English -> Vietnamese)
const REVERSE_URL_MAPPINGS = Object.fromEntries(
    Object.entries(URL_MAPPINGS).map(([vi, en]) => [en, vi])
);

// Component wrapper để sử dụng hooks
const LanguageProviderWrapper = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('appLanguage') || 'vi';
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);

    const switchLanguage = (lang) => {
        const currentPath = location.pathname;
        
        // Chuyển đổi URL tương ứng
        let newPath = currentPath;
        if (lang === 'en' && URL_MAPPINGS[currentPath]) {
            // Chuyển từ tiếng Việt sang tiếng Anh
            newPath = URL_MAPPINGS[currentPath];
        } else if (lang === 'vi' && REVERSE_URL_MAPPINGS[currentPath]) {
            // Chuyển từ tiếng Anh sang tiếng Việt
            newPath = REVERSE_URL_MAPPINGS[currentPath];
        }
        
        setLanguage(lang);
        
        // Navigate nếu URL thay đổi
        if (newPath !== currentPath) {
            navigate(newPath, { replace: true });
        }
    };

    /**
     * Hàm dịch đa năng t()
     * Sử dụng 1: t("header.menu.home") -> Dịch UI từ locales.js
     * Sử dụng 2: t(product, "name") -> Dịch dữ liệu từ API (product.name hoặc product.name_en)
     */
    const t = (arg1, arg2) => {
        // === TRƯỜNG HỢP 1: Dịch UI (arg1 là string key, ví dụ: "header.menu.about") ===
        if (typeof arg1 === 'string') {
            const keys = arg1.split('.');
            let translation = resources[language];
            
            for (const key of keys) {
                if (translation && translation[key]) {
                    translation = translation[key];
                } else {
                    // Nếu không tìm thấy key, trả về chính key đó để dễ debug
                    return arg1;
                }
            }
            return translation;
        }

        // === TRƯỜNG HỢP 2: Dịch Data (arg1 là object, arg2 là field name) ===
        if (typeof arg1 === 'object' && arg1 !== null && typeof arg2 === 'string') {
            const obj = arg1;
            const field = arg2;
            const value = obj[field];

            // Data kiểu { vi: "...", en: "..." }
            if (value && typeof value === 'object' && !Array.isArray(value) && ('vi' in value || 'en' in value)) {
                return value[language] || value['vi'] || "";
            }

            // Data kiểu phẳng (name, name_en)
            if (language === 'vi') {
                return value;
            }
            // Nếu tiếng Anh, tìm field_en, nếu không có thì fallback về tiếng Việt
            return obj[`${field}_en`] || value;
        }

        return "";
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Export chính là wrapper component
export const LanguageProvider = LanguageProviderWrapper;

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};