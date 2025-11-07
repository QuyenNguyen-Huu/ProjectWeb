import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SizeFilter({ products = [] }) {

    const [searchParams, setSearchParams] = useSearchParams();
    const selectedSizes = searchParams.get("size")?.split(",") || [];

    const toggleSelect = (size) => {
        const isSelected = selectedSizes.includes(size);
        let newSelectedSizes = [];

        if (isSelected) {
            // Nếu đã chọn -> Bỏ chọn
            newSelectedSizes = selectedSizes.filter((s) => s !== size);
        } else {
            // Nếu chưa chọn -> Thêm vào
            newSelectedSizes = [...selectedSizes, size];
        }

        // Cập nhật lại URL
        if (newSelectedSizes.length > 0) {
            searchParams.set("size", newSelectedSizes.join(","));
        } else {
            searchParams.delete("size");
        }
        setSearchParams(searchParams, { replace: true });
    };

    return (
        <div className="block">
            <ul className="grid grid-cols-2 gap-2 max-h-40 filter-group overflow-auto pr-2">
                {products.map((size, index) => {
                    const isActive = selectedSizes.includes(size);
                    return (
                        <li key={index} className="w-full h-full size-container" >
                            <a
                                style={{
                                    fontSize: "clamp(0.9rem, 5cqw, 1rem)",
                                }}
                                onClick={() => toggleSelect(size)}
                                className={`select-none focus:outline-none block border font-bold text-center border-white shadow-[0_0_0_1px_#000] m-[5px] p-[5px] cursor-pointer transition-all 
                                ${isActive
                                        ? "bg-[#673ab7] !text-white"
                                        : "hover:bg-[#673ab7] hover:!text-white"}
                                `}
                            >
                                {size}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
