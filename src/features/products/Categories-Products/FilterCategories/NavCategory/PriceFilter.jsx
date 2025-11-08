import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PriceFilter() {
    const navigate = useNavigate();
    const location = useLocation();

    const MAX_PRICE = 20000000;
    const STEP = 10000;

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

    const [minInput, setMinInput] = useState("0");
    const [maxInput, setMaxInput] = useState(MAX_PRICE.toString());

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const priceParam = params.get("price");
        if (priceParam) {
            const [min, max] = priceParam.split(":").map(Number);
            if (!isNaN(min) && !isNaN(max)) {
                setMinPrice(min);
                setMaxPrice(max);
                setMinInput(min.toString());
                setMaxInput(max.toString());
            }
        }
    }, [location]);

    // --- Hàm xử lý nhập input ---
    const handleMinChange = (e) => setMinInput(e.target.value);
    const handleMaxChange = (e) => setMaxInput(e.target.value);

    const validateMin = () => {
        let value = Number(minInput);
        if (isNaN(value)) value = 0;
        if (value < 0) value = 0;
        if (value > maxPrice) value = maxPrice;
        setMinPrice(value);
        setMinInput(value.toString());
    };

    const validateMax = () => {
        let value = Number(maxInput);
        if (isNaN(value)) value = 0;
        if (value < minPrice) value = minPrice;
        if (value > MAX_PRICE) value = MAX_PRICE;
        setMaxPrice(value);
        setMaxInput(value.toString());
    };

    // --- Range slider ---
    const handleRangeChange = (e, type) => {
        const value = Number(e.target.value);

        if (type === "min") {
            // Chỉ cập nhật nếu nhỏ hơn maxPrice
            if (value <= maxPrice) {
                setMinPrice(value);
            }
        } else {
            // Chỉ cập nhật nếu lớn hơn minPrice
            if (value >= minPrice) {
                setMaxPrice(value);
            }
        }
    };

    const handleSearch = () => {
        validateMin();
        validateMax();
        if (minPrice > maxPrice) return;
        const params = `?price=${minPrice}:${maxPrice}`;
        navigate(params, { replace: false });
        window.location.href = params;
    };

    // --- Input focus behavior ---
    const handleFocus = (e, type) => {
        if (e.target.value === "0") {
            type === "min" ? setMinInput("") : setMaxInput("");
        }
    };

    const handleBlur = (e, type) => {
        if (e.target.value.trim() === "") {
            if (type === "min") {
                setMinInput("0");
                setMinPrice(0);
            } else {
                setMaxInput(MAX_PRICE.toString());
                setMaxPrice(MAX_PRICE);
            }
        } else {
            type === "min" ? validateMin() : validateMax();
        }
    };

    return (
        <>
            {/* --- Thanh trượt --- */}
            <div className="relative my-4 h-2">
                <span className="absolute block w-full h-[3px] bg-[#dae1e8] rounded"></span>

                <span
                    className="absolute block h-[3px] bg-gray-700 rounded"
                    style={{
                        left: `${(minPrice / MAX_PRICE) * 100}%`,
                        right: `${100 - (maxPrice / MAX_PRICE) * 100}%`,
                    }}
                ></span>

                {/* Min range */}
                <input
                    type="range"
                    min="0"
                    max={MAX_PRICE}
                    step={STEP}
                    value={minPrice}
                    onChange={(e) => handleRangeChange(e, "min")}
                    onMouseUp={handleSearch}
                    onTouchEnd={handleSearch}
                    className="absolute w-full appearance-none bg-transparent pointer-events-auto range-thumb"
                    style={{
                        zIndex: minPrice > maxPrice - STEP ? 7 : 6,
                    }}
                />

                {/* Max range */}
                <input
                    type="range"
                    min="0"
                    max={MAX_PRICE}
                    step={STEP}
                    value={maxPrice}
                    onChange={(e) => handleRangeChange(e, "max")}
                    onMouseUp={handleSearch}
                    onTouchEnd={handleSearch}
                    className="absolute w-full appearance-none bg-transparent pointer-events-auto range-thumb"
                    style={{
                        zIndex: 5,
                    }}
                />
            </div>

            {/* --- Giá hiển thị --- */}
            <div className="flex justify-between text-sm mb-2">
                <span>{minPrice.toLocaleString()}đ</span>
                <span>{maxPrice.toLocaleString()}đ</span>
            </div>

            {/* --- Ô input nhập giá --- */}
            <div className="flex flex-col items-center gap-2 mb-3 stop-event-text  ">
                <input
                    type="number"
                    value={minInput}
                    onChange={handleMinChange}
                    onFocus={(e) => handleFocus(e, "min")}
                    onBlur={(e) => handleBlur(e, "min")}
                    min="0"
                    max={maxPrice}
                    step={STEP}
                    className="w-full border border-gray-300 px-2 py-1 text-left text-sm focus:outline-none no-spinner"
                />
                <span>-</span>
                <input
                    type="number"
                    value={maxInput}
                    onChange={handleMaxChange}
                    onFocus={(e) => handleFocus(e, "max")}
                    onBlur={(e) => handleBlur(e, "max")}
                    min={minPrice}
                    max={MAX_PRICE}
                    step={STEP}
                    className="w-full border border-gray-300 px-2 py-1 text-left text-sm focus:outline-none no-spinner"
                />
            </div>

            {/* --- Nút Search --- */}
            <button
                onClick={handleSearch}
                className="w-full border border-black text-black uppercase text-sm font-semibold py-2 hover:bg-black hover:text-white transition-all"
            >
                Search
            </button>
        </>
    );
}
