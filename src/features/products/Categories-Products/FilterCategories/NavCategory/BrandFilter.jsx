import { useSearchParams } from "react-router-dom";

export default function BrandFilter({ products = [] }) {

    const uniqueBrands = [...new Set(products)];

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedBrands = searchParams.get("brand")?.split(",") || [];

    const toggleSelect = (brand) => {
        const isSelected = selectedBrands.includes(brand);
        let newSelectedBrands = [];

        if (isSelected) {
            newSelectedBrands = selectedBrands.filter((b) => b !== brand);
        } else {
            newSelectedBrands = [...selectedBrands, brand];
        }

        if (newSelectedBrands.length > 0) {
            searchParams.set("brand", newSelectedBrands.join(","));
        } else {
            searchParams.delete("brand");
        }
        setSearchParams(searchParams, { replace: true });
    };
    // ------------------------------------

    return (

        <ul className="
                space-y-1 
                h-[190px]          
                overflow-y-auto     
                filter-group       
                pr-2               
            ">
            {uniqueBrands.map((brand) => {
                const isActive = selectedBrands.includes(brand);

                return (
                    <li key={brand}>
                        <button
                            onClick={() => toggleSelect(brand)}
                            className={`
                                    block w-full text-left py-1 text-sm transition-all duration-300 rounded-sm
                                    ${isActive
                                    ? "bg-[#673ab7] text-white font-semibold pl-2 "
                                    : "text-gray-700 hover:text-purple-600"
                                }
                                `}
                        >
                            {brand}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}