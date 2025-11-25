// src/features/home/Collections/components/Products/SortBar.jsx
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const SortBar = ({ total, selectedOption, onChange, categoryName }) => {
    const { t } = useLanguage();
    
    // Lấy tên danh mục đã dịch, fallback về "Products" nếu không có
    const displayTitle = categoryName ? t(categoryName) : t("product.sort.label");

    return (
        <div className="sortPagiBar mb-8 border-b border-[#ebebeb] pb-4">
            <div className="flex flex-wrap items-center">
                <div className="w-full sm:w-2/3 lg:w-4/5">
                    <h1 className="text-2xl font-semibold inline-block uppercase">{displayTitle}</h1>
                    <span className="ml-3 hidden sm:inline-block">
                        ({total} {t("product.sort.label")})
                    </span>
                </div>

                <div className="w-full sm:w-1/3 lg:w-1/5 text-left sm:text-right mt-2 sm:mt-0">
                    <div className="ml-auto text-sm">
                        <select
                            id="sortControl"
                            className={`border px-3 py-1.5 ${selectedOption === "" ? "text-gray-500" : "text-gray-900"
                                }`}
                            onChange={(e) => onChange(e.target.value)}
                            value={selectedOption}
                        >
                            <option value="">{t("product.sort.placeholder")}</option>
                            <option value="new">{t("product.sort.newest")}</option>
                            <option value="priceDesc">{t("product.sort.priceDesc")}</option>
                            <option value="priceAsc">{t("product.sort.priceAsc")}</option>
                            <option value="discount">{t("product.sort.discount")}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortBar;
