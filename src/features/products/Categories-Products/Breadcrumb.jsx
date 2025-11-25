import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'

const Breadcrumb = ({ breadcrumbItems = [] }) => {
    const { t } = useLanguage();
    
    return (
        <div className="mx-auto w-full md:max-w-[750px] lg:max-w-[970px] xl:max-w-[1170px] 2xl:max-w-[1200px] px-4">
            <div className="flex flex-wrap -mx-[15px] row">
                <div className="w-full md:w-1/2 px-[15px]">
                    <ul className="m-0 p-0 text-[1em] bg-transparent rounded-none">
                        {breadcrumbItems.map((item, index) => {
                            // Lấy tên đã dịch, ưu tiên nameKey, fallback về name
                            const displayName = item.nameKey ? t(item.nameKey) : item.name;
                            
                            return (
                                <React.Fragment key={item.link}>
                                    <li className="inline">
                                        <Link 
                                            to={item.link} 
                                            className={`transition-colors duration-200 cursor-pointer ${
                                                index < breadcrumbItems.length - 1 
                                                    ? "hover:underline hover:text-purple-600" 
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {displayName}
                                        </Link>
                                    </li>

                                    {/* 3. Hiển thị dấu '/' nếu không phải item cuối cùng */}
                                    {index < breadcrumbItems.length - 1 && (
                                        <span className="px-[5px] text-[#ccc]">/</span>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb