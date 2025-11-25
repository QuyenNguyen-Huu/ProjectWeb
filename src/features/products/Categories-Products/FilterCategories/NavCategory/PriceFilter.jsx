import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export default function PriceFilter() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const MAX_PRICE = 20000000;
  const STEP = 10000;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  // input values tách biệt khỏi range
  const [minInput, setMinInput] = useState("0");
  const [maxInput, setMaxInput] = useState(formatNumber(MAX_PRICE));

  function formatNumber(value) {
    if (isNaN(value)) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function unformatNumber(value) {
    return value.replace(/\./g, "");
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const priceParam = params.get("price");
    if (priceParam) {
      const [min, max] = priceParam.split(":").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setMinPrice(min);
        setMaxPrice(max);
        setMinInput(formatNumber(min));
        setMaxInput(formatNumber(max));
      }
    }
  }, [location]);

  // --- Input change ---
  const handleMinChange = (e) => {
    const raw = e.target.value;
    const clean = unformatNumber(raw);
    if (!isNaN(clean)) {
      setMinInput(formatNumber(clean));
    }
  };

  const handleMaxChange = (e) => {
    const raw = e.target.value;
    const clean = unformatNumber(raw);
    if (!isNaN(clean)) {
      setMaxInput(formatNumber(clean));
    }
  };

  const handleFocus = (e, type) => {
    const raw = unformatNumber(e.target.value || "");
    if (type === "min") setMinInput(raw === "0" ? "" : raw);
    else setMaxInput(raw === "0" ? "" : raw);
  };

  const handleBlur = (e, type) => {
    const raw = unformatNumber(e.target.value);
    let num = Number(raw);
    if (isNaN(num)) num = 0;

    if (type === "min") {
      if (num < 0) num = 0;
      if (num > maxPrice) num = maxPrice;
      setMinPrice(num);
      setMinInput(formatNumber(num));
    } else {
      if (num < minPrice) num = minPrice;
      if (num > MAX_PRICE) num = MAX_PRICE;
      setMaxPrice(num);
      setMaxInput(formatNumber(num));
    }
  };

  // --- Range change ---
  const handleRangeChange = (e, type) => {
    const value = Number(e.target.value);

    if (type === "min" && value <= maxPrice) {
      setMinPrice(value);
      setMinInput(formatNumber(value));
    }

    if (type === "max" && value >= minPrice) {
      setMaxPrice(value);
      setMaxInput(formatNumber(value));
    }
  };

  // --- Search cho input ---
  const handleInputSearch = () => {
    let min = Number(unformatNumber(minInput));
    let max = Number(unformatNumber(maxInput));

    if (isNaN(min) || min < 0) min = 0;
    if (isNaN(max) || max > MAX_PRICE) max = MAX_PRICE;
    if (min > max) return;

    setMinPrice(min);
    setMaxPrice(max);

    const params = `?price=${min}:${max}`;
    navigate(params, { replace: false });
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

        <input
          type="range"
          min="0"
          max={MAX_PRICE}
          step={STEP}
          value={minPrice}
          onChange={(e) => handleRangeChange(e, "min")}
          className="absolute w-full appearance-none bg-transparent pointer-events-auto range-thumb"
          style={{ zIndex: minPrice > maxPrice - STEP ? 7 : 6 }}
        />

        <input
          type="range"
          min="0"
          max={MAX_PRICE}
          step={STEP}
          value={maxPrice}
          onChange={(e) => handleRangeChange(e, "max")}
          className="absolute w-full appearance-none bg-transparent pointer-events-auto range-thumb"
          style={{
            zIndex: maxPrice <= minPrice + STEP ? 7 : 6,
          }}
        />
      </div>

      {/* --- Giá hiển thị --- */}
      <div className="flex justify-between text-sm mb-2">
        <span>{formatNumber(minPrice)}đ</span>
        <span>{formatNumber(maxPrice)}đ</span>
      </div>

      {/* --- Ô input nhập giá --- */}
      <div className="flex flex-col items-center gap-2 mb-3 stop-event-text">
        <input
          type="text"
          value={minInput}
          onChange={handleMinChange}
          onFocus={(e) => handleFocus(e, "min")}
          onBlur={(e) => handleBlur(e, "min")}
          min="0"
          step={STEP}
          className="w-full border border-gray-300 px-2 py-1 text-left text-sm focus:outline-none no-spinner"
        />
        <span>-</span>
        <input
          type="text"
          value={maxInput}
          onChange={handleMaxChange}
          onFocus={(e) => handleFocus(e, "max")}
          onBlur={(e) => handleBlur(e, "max")}
          max={MAX_PRICE}
          step={STEP}
          className="w-full border border-gray-300 px-2 py-1 text-left text-sm focus:outline-none no-spinner"
        />
      </div>

      {/* --- Nút Search riêng biệt --- */}
      <button
        type="button"
        disabled={minPrice > maxPrice}
        onClick={handleInputSearch}
        className="cursor-pointer w-full border border-black text-black uppercase text-sm font-semibold py-2 hover:bg-black hover:text-white transition-all"
      >
        {t("product.filter.searchBtn")}
      </button>
    </>
  );
}
