// src/features/products/Categories-Products/Products/useProducts.js (BẢN HOÀN CHỈNH)
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiClient from '@/api/apiClient';
import { useLanguage } from '@/context/LanguageContext';

const ITEMS_PER_PAGE = 12;

// --- 1. NÂNG CẤP BỘ ĐIỀU HƯỚNG ---
// Nó sẽ trả về cả category CHÍNH và category PHỤ (để lọc client)
function getCategoryInfoFromPath(path) {
    // Trang chủ hoặc không xác định
    if (path === '/') return { main: null, sub: null };

    // === Xử lý nested routes (men/women) - English ===
    // Men routes - English
    if (path.startsWith("/men/shirt")) {
        return { main: 'clothing', sub: 'nam' };
    }
    if (path.startsWith("/men/pants")) {
        return { main: 'clothing', sub: 'nam' };
    }
    if (path.startsWith("/men/run-shoes")) {
        return { main: 'shoes', sub: 'road-nam' };
    }
    if (path.startsWith("/men/trail-shoes")) {
        return { main: 'shoes', sub: 'trail-nam' };
    }
    
    // Women routes - English
    if (path.startsWith("/women/shirt")) {
        return { main: 'clothing', sub: 'nu' };
    }
    if (path.startsWith("/women/pants")) {
        return { main: 'clothing', sub: 'nu' };
    }
    if (path.startsWith("/women/run-shoes")) {
        return { main: 'shoes', sub: 'road-nu' };
    }
    if (path.startsWith("/women/trail-shoes")) {
        return { main: 'shoes', sub: 'trail-nu' };
    }

    // Watch routes - English
    if (path.startsWith("/watch/suunto")) {
        return { main: 'watch', sub: 'suunto' };
    }
    if (path.startsWith("/watch/garmin")) {
        return { main: 'watch', sub: 'garmin' };
    }
    if (path.startsWith("/watch/coros")) {
        return { main: 'watch', sub: 'coros' };
    }

    // === Xử lý Vietnamese routes ===
    // Áo/Quần
    if (path.startsWith("/ao-chay-bo-nam")) return { main: 'clothing', sub: 'nam' };
    if (path.startsWith("/quan-chay-bo-nam")) return { main: 'clothing', sub: 'nam' };
    if (path.startsWith("/ao-chay-bo-nu")) return { main: 'clothing', sub: 'nu' };
    if (path.startsWith("/quan-chay-bo-nu")) return { main: 'clothing', sub: 'nu' };
    
    // Giày
    if (path.startsWith("/giay-chay-bo-nam")) return { main: 'shoes', sub: 'road-nam' };
    if (path.startsWith("/giay-chay-dia-hinh-nam")) return { main: 'shoes', sub: 'trail-nam' };
    if (path.startsWith("/giay-chay-bo-nu")) return { main: 'shoes', sub: 'road-nu' };
    if (path.startsWith("/giay-chay-dia-hinh-nu")) return { main: 'shoes', sub: 'trail-nu' };

    // Đồng hồ
    if (path.startsWith("/dong-ho-suunto")) return { main: 'watch', sub: 'suunto' };
    if (path.startsWith("/dong-ho-garmin")) return { main: 'watch', sub: 'garmin' };
    if (path.startsWith("/dong-ho-coros")) return { main: 'watch', sub: 'coros' };
    
    // Parent categories - Show ALL products for men/women (clothing + shoes)
    if (path === "/do-nam" || path === "/men") return { main: null, sub: 'all-nam' };
    if (path === "/do-nu" || path === "/women") return { main: null, sub: 'all-nu' };
    if (path.startsWith("/dong-ho") || path === "/watch") return { main: 'watch', sub: null };

    // Sale
    if (path.startsWith("/sale")) return { main: null, sub: 'sale' };

    // Mặc định
    if (path.startsWith("/shoes")) return { main: 'shoes', sub: null };
    if (path.startsWith("/clothing")) return { main: 'clothing', sub: null };
    
    // Fallback
    return { main: null, sub: null };
}

// --- 2. HELPER LỌC CON (NAM/NỮ, ROAD/TRAIL) ---
function filterBySubCategory(products, subCategory) {
    if (!subCategory) {
        return products; // Không cần lọc, trả về tất cả
    }

    // ALL Men products (clothing + shoes)
    if (subCategory === 'all-nam') {
        return products.filter(p => p.name.toLowerCase().includes('nam'));
    }
    
    // ALL Women products (clothing + shoes)
    if (subCategory === 'all-nu') {
        return products.filter(p => p.name.toLowerCase().includes('nữ'));
    }

    // Clothing - Nam
    if (subCategory === 'nam') {
        return products.filter(p => p.name.toLowerCase().includes('nam'));
    }
    
    // Clothing - Nữ
    if (subCategory === 'nu') {
        return products.filter(p => p.name.toLowerCase().includes('nữ'));
    }
    
    // Shoes - Road (chạy bộ) - chung
    if (subCategory === 'road') {
        return products.filter(p => 
            p.name.toLowerCase().includes('chạy bộ') && 
            !p.name.toLowerCase().includes('địa hình')
        );
    }
    
    // Shoes - Road Nam
    if (subCategory === 'road-nam') {
        return products.filter(p => 
            p.name.toLowerCase().includes('chạy bộ') && 
            !p.name.toLowerCase().includes('địa hình') &&
            p.name.toLowerCase().includes('nam')
        );
    }
    
    // Shoes - Road Nữ
    if (subCategory === 'road-nu') {
        return products.filter(p => 
            p.name.toLowerCase().includes('chạy bộ') && 
            !p.name.toLowerCase().includes('địa hình') &&
            p.name.toLowerCase().includes('nữ')
        );
    }
    
    // Shoes - Trail (địa hình) - chung
    if (subCategory === 'trail') {
        return products.filter(p => p.name.toLowerCase().includes('địa hình'));
    }
    
    // Shoes - Trail Nam
    if (subCategory === 'trail-nam') {
        return products.filter(p => 
            p.name.toLowerCase().includes('địa hình') &&
            p.name.toLowerCase().includes('nam')
        );
    }
    
    // Shoes - Trail Nữ
    if (subCategory === 'trail-nu') {
        return products.filter(p => 
            p.name.toLowerCase().includes('địa hình') &&
            p.name.toLowerCase().includes('nữ')
        );
    }

    // Watch brands
    if (subCategory === 'suunto') {
        return products.filter(p => p.brand && p.brand.toLowerCase().includes('suunto'));
    }
    if (subCategory === 'garmin') {
        return products.filter(p => p.brand && p.brand.toLowerCase().includes('garmin'));
    }
    if (subCategory === 'coros') {
        return products.filter(p => p.brand && p.brand.toLowerCase().includes('coros'));
    }

    // Sale
    if (subCategory === 'sale') {
        return products.filter(p => p.oldPrice && p.oldPrice > p.price);
    }

    return products; // Mặc định trả về ds gốc
}


export default function useProducts() {
    const location = useLocation();
    const { language } = useLanguage(); // Thêm language từ context

    // (State giữ nguyên)
    const [allProducts, setAllProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            
            const queryParams = new URLSearchParams(location.search);
            
            // 1. Lấy tham số từ URL
            const { main: category, sub: subCategory } = getCategoryInfoFromPath(location.pathname);
            const sortType = queryParams.get("show") || "new";
            const pageFromUrl = parseInt(queryParams.get("page") || "1", 10);
            const priceParam = queryParams.get("price");
            const brandParam = queryParams.get("brand");
            const sizeParam = queryParams.get("size");

            setSelectedOption(sortType);
            setCurrentPage(pageFromUrl);
            
            try {
                // 2. GỌI API (chỉ gọi theo category CHÍNH và sort)
                const apiParams = {
                    show: sortType,
                };
                
                // Only add category if it exists (for all-nam/all-nu, we want ALL products)
                if (category) {
                    apiParams.category = category;
                }
                
                // Lấy dữ liệu và chuẩn hóa
                const res = await apiClient.getProducts(apiParams);
                let productsFromApi = Array.isArray(res) ? res : (res?.items || []);

                console.log("🚀 API Response:", {
                    count: productsFromApi.length,
                    firstProductRaw: productsFromApi[0],
                    hasNameEn: !!productsFromApi[0]?.name_en
                });

                // Chuẩn hóa field ảnh để ProductCard nhận đúng prop `images`
                let transformedProducts = productsFromApi.map(p => ({
                    ...p, // Giữ lại tất cả data gốc (id, name, slug, price, sizes...)
                    
                    // Thêm các trường mà ProductCard cần
                    product: p, // Truyền product object để dùng với t()
                    title: p.name, // Thêm 'title' (lấy từ 'name')
                    href: `/${p.slug}.html`, // Thêm 'href' (lấy từ 'slug')
                    images: p.images_card || [], // Đảm bảo 'images' lấy từ 'images_card'
                }));
                
                console.log("🔄 Transformed Products:", {
                    count: transformedProducts.length,
                    firstTransformed: transformedProducts[0],
                    hasProductField: !!transformedProducts[0]?.product
                });

                // --- 3. LỌC Ở CLIENT (TOÀN BỘ) ---
                // BƯỚC 3.1: Lọc theo Category PHỤ (Nam/Nữ, Road/Trail)
                transformedProducts = filterBySubCategory(transformedProducts, subCategory);

                // BƯỚC 3.2: Lọc theo Giá
                if (priceParam) {
                    const [min, max] = priceParam.split(":").map(Number);
                    if (!isNaN(min) && !isNaN(max)) {
                        transformedProducts = transformedProducts.filter((p) => {
                            const price = p.price || 0;
                            return price >= min && price <= max;
                        });
                    }
                }
                
                // BƯỚC 3.3: Lọc theo Brand
                if (brandParam) {
                    const brands = brandParam.split(',').map(b => b.toLowerCase().trim());
                    transformedProducts = transformedProducts.filter(
                        (p) => p.brand && brands.includes(String(p.brand).toLowerCase())
                    );
                }

                // BƯỚC 3.4: Lọc theo Size
               if (sizeParam) {
                    // Hàm helper: Bỏ các tiền tố "EU", "US", "UK" và khoảng trắng
                    const normalizeSize = (s) => 
                        String(s).toLowerCase().replace(/^(eu|us|uk)\s*/, '').trim();

                    // 1. Chuẩn hóa các size cần lọc từ URL
                    // Ví dụ: "EU36,S" -> ["36", "s"]
                    const sizesToFilter = sizeParam.split(',')
                                                   .map(normalizeSize);

                    transformedProducts = transformedProducts.filter((p) => {
                        // 2. Đảm bảo sản phẩm có trường 'sizes' là mảng
                        if (!p.sizes || !Array.isArray(p.sizes)) {
                            return false;
                        }

                        // 3. Chuẩn hóa 'p.sizes' từ API và so sánh
                        // Ví dụ: p.sizes = ["36", "37", "S"]
                        return p.sizes.some(productSize => {
                            const normalizedProductSize = normalizeSize(productSize); // "36"
                            return sizesToFilter.includes(normalizedProductSize); // ["36", "s"].includes("36") -> true
                        });
                    });
                }

                setAllProducts(transformedProducts);

                // 4. Phân trang
                const totalPages = Math.ceil(transformedProducts.length / ITEMS_PER_PAGE);
                const startIndex = (pageFromUrl - 1) * ITEMS_PER_PAGE;
                const productsForCurrentPage = transformedProducts.slice(
                    startIndex,
                    startIndex + ITEMS_PER_PAGE
                );

                setPageCount(totalPages);
                setCurrentProducts(productsForCurrentPage);

            } catch (error) {
                console.error("Không thể fetch sản phẩm:", error.message);
                setAllProducts([]);
                setCurrentProducts([]);
            } finally {
                const timer = setTimeout(() => setIsLoading(false), 300);
            }
        };

        fetchData();
        
    }, [location.search, location.pathname, language]); // Thêm language vào dependency

    return {
        allProducts,
        currentProducts,
        pageCount,
        currentPage,
        selectedOption,
        setSelectedOption,
        isLoading,
    };
}