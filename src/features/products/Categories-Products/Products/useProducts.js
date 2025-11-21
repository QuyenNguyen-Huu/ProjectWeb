// src/features/products/Categories-Products/Products/useProducts.js (BẢN HOÀN CHỈNH)
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "@/api/apiClient"; //

const ITEMS_PER_PAGE = 60;

// --- 1. NÂNG CẤP BỘ ĐIỀU HƯỚNG ---
// Nó sẽ trả về cả category CHÍNH và category PHỤ (để lọc client)
function getCategoryInfoFromPath(path) {
    // Trang chủ hoặc không xác định
    if (path === '/') return { main: null, sub: null };

    // Đồ nam
    if (path.startsWith("/do-nam")) return { main: 'clothing', sub: 'nam' };
    if (path.startsWith("/ao-chay-bo-nam")) return { main: 'clothing', sub: 'nam' };

    // Đồ nữ
    if (path.startsWith("/do-nu")) return { main: 'clothing', sub: 'nu' };
    if (path.startsWith("/ao-chay-bo-nu")) return { main: 'clothing', sub: 'nu' };

    // Giày Chạy Bộ (Road)
    if (path.includes("giay-chay-bo")) return { main: 'shoes', sub: 'road' };

    // Giày Địa Hình (Trail)
    if (path.includes("giay-chay-dia-hinh")) return { main: 'shoes', sub: 'trail' };

    // Mặc định (cho các link khác như /sale, /dong-ho...)
    // Chúng ta sẽ phải tạo thêm data cho chúng sau
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

    if (subCategory === 'nam') {
        // Lọc các sản phẩm có chữ "Nam" trong tên
        return products.filter(p => p.name.toLowerCase().includes('nam'));
    }
    if (subCategory === 'nu') {
        // Lọc các sản phẩm có chữ "Nữ" trong tên
        return products.filter(p => p.name.toLowerCase().includes('nữ'));
    }
    if (subCategory === 'road') {
        // Lọc sản phẩm có chữ "Chạy Bộ" (không phải "Địa Hình")
        return products.filter(p => 
            p.name.toLowerCase().includes('chạy bộ') && 
            !p.name.toLowerCase().includes('địa hình')
        );
    }
    if (subCategory === 'trail') {
        // Lọc sản phẩm có chữ "Địa Hình"
        return products.filter(p => p.name.toLowerCase().includes('địa hình'));
    }

    return products; // Mặc định trả về ds gốc
}


export default function useProducts() {
    const location = useLocation();

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
                    category: category,
                    show: sortType,
                };
                
                // Lấy dữ liệu và chuẩn hóa
                const res = await apiClient.getProducts(apiParams);
                let productsFromApi = Array.isArray(res) ? res : (res?.items || []);

                // Chuẩn hóa field ảnh để ProductCard nhận đúng prop `images`
                let transformedProducts = productsFromApi.map(p => ({
                    ...p, // Giữ lại tất cả data gốc (id, name, slug, price, sizes...)
                    
                    // Thêm các trường mà ProductCard cần
                    title: p.name, // Thêm 'title' (lấy từ 'name')
                    href: `/${p.slug}.html`, // Thêm 'href' (lấy từ 'slug')
                    images: p.images_card || [], // Đảm bảo 'images' lấy từ 'images_card'
                }));

                // --- 3. LỌC Ở CLIENT (TOÀN BỘ) ---
                // BƯỚC 3.1: Lọc theo Category PHỤ (Nam/Nữ, Road/Trail)
                transformedProducts = filterBySubCategory(transformedProducts, subCategory);

                // BƯỚC 3.2: Lọc theo Giá
                if (priceParam) {
                    const [min, max] = priceParam.split(":").map(Number);
                    if (!isNaN(min) && !isNaN(max)) {
                        transformedProducts = transformedProducts.filter((p) => {
                            const price = p.priceNumeric || 0;
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
        
    }, [location.search, location.pathname]);

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