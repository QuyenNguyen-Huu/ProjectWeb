// src/features/home/Collections/components/Products/SortBar.jsx
import React from "react";

const SortBar = ({ total, selectedOption, onChange }) => {
    return (
        <div className="sortPagiBar mb-8 border-b border-[#ebebeb] pb-4">
            <div className="flex flex-wrap items-center">
                <div className="w-full sm:w-2/3 lg:w-4/5">
                    <h1 className="text-2xl font-semibold inline-block uppercase">Men</h1>
                    <span className="ml-3 hidden sm:inline-block">
                        ({total} Sản phẩm)
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
                            <option value="">-- Chọn sắp xếp --</option>
                            <option value="new">Sản phẩm mới nhất</option>
                            <option value="priceDesc">Giá giảm dần</option>
                            <option value="priceAsc">Giá tăng dần</option>
                            <option value="discount">Giảm giá</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortBar;
