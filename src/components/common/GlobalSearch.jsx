// src/components/common/GlobalSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient'; // Import API của bạn
import { useLanguage } from "@/context/LanguageContext"; // Context ngôn ngữ
import { formatCurrency } from '@/utils/formatCurrency'; // Helper format tiền

const GlobalSearch = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]); // Dữ liệu gốc cho Fuse
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const { language } = useLanguage(); // 'vi' hoặc 'en'
  const inputRef = useRef(null);

  // 1. Fetch dữ liệu khi component được mount (chỉ làm 1 lần)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        // Giả sử API này lấy all products hoặc lấy số lượng lớn
        const data = await apiClient.getProducts({ limit: 1000 }); 
        setProducts(data);
      } catch (error) {
        console.error("Error fetching search data:", error);
      } finally {
        setIsLoading(false);
        // Focus vào input ngay khi mở
        if (inputRef.current) inputRef.current.focus();
      }
    };
    fetchAllProducts();
  }, []);

  // 2. Cấu hình Fuse.js
  const fuseOptions = {
    // Tìm kiếm trên cả tên tiếng Việt và tiếng Anh
    keys: ['name', 'name_en', 'sku'], 
    threshold: 0.3, // Độ nhạy (0.0: chính xác tuyệt đối, 1.0: rất lỏng lẻo)
    includeScore: true
  };

  const fuse = new Fuse(products, fuseOptions);

  // 3. Handle Search (Real-time)
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) { // Chỉ tìm khi gõ > 1 ký tự
      const fuseResults = fuse.search(value);
      // Fuse trả về mảng [{ item, score, ... }] -> map lại lấy item
      const formattedResults = fuseResults.map(result => result.item).slice(0, 5); // Chỉ lấy 5 kết quả đầu
      setResults(formattedResults);
    } else {
      setResults([]);
    }
  };

  // 4. Handle Click Result
  const handleResultClick = (slug) => {
    navigate(`/${slug}.html`);
    if (onClose) onClose(); // Đóng thanh search sau khi chọn
  };

  // Helper hiển thị tên đúng ngôn ngữ
  const getProductName = (product) => {
    return language === 'en' && product.name_en ? product.name_en : product.name;
  };

  return (
    // top-full: nằm ngay dưới header
    // left-0 w-full: Tràn màn hình
    <div className="absolute top-full left-0 w-full bg-white shadow-xl z-50 border-t border-gray-100 animate-fade-in-down">
      <div className="container mx-auto px-4 py-4"> {/* Dùng px-4 để hở lề mobile chút cho đẹp */}
        
        {/* Input Area */}
        <div className="relative flex items-center mb-4">
          <i className="fa fa-search text-gray-400 absolute left-4 text-lg"></i>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-gray-100 rounded-lg py-3 pl-12 pr-10 outline-none border border-transparent focus:border-orange-500 focus:bg-white transition-all text-gray-800 text-base" // text-base để mobile không bị zoom khi focus
            placeholder={language === 'en' ? "Search products..." : "Tìm kiếm sản phẩm..."}
            value={query}
            onChange={handleSearch}
            autoFocus
          />
          <button 
            onClick={onClose} 
            className="absolute right-3 p-1 text-gray-400 hover:text-red-500"
          >
            <i className="fa fa-times text-lg"></i>
          </button>
        </div>

        {/* Results Dropdown */}
        {query.length > 1 && (
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar"> {/* Giới hạn chiều cao để scroll được trên mobile */}
            {results.length > 0 ? (
              // grid-cols-1 để đảm bảo luôn là 1 cột dọc
              <div className="grid grid-cols-1 gap-2"> 
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  {language === 'en' ? "Result" : "Kết quả"}
                </h3>
                {results.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => handleResultClick(product.slug)}
                    // flex-row để ảnh và chữ nằm ngang
                    className="flex flex-row items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="w-14 h-14 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-white">
                      <img 
                        src={product.images_card[0]} 
                        alt={getProductName(product)} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0"> {/* min-w-0 giúp text truncate hoạt động */}
                      <div className="font-medium text-gray-800 text-sm truncate">
                        {getProductName(product)}
                      </div>
                      <div className="text-sm font-bold text-red-600 mt-1">
                         {formatCurrency(product.price, language)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-6 text-sm">
                {language === 'en' ? `No results for "${query}"` : `Không tìm thấy sản phẩm nào cho "${query}"`}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;