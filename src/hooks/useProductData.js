import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import apiClient from '@/api/apiClient';
import { getProductsFromCache, saveProductsToCache } from '@/utils/storage';

export const useProductData = () => {
  const [products, setProducts] = useState([]);
  const fuseRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initData = async () => {
      let data = await getProductsFromCache();

      if (!data) {
        try {
          // Lấy số lượng lớn để index 
          const res = await apiClient.getProducts({ limit: 100 }); 
          data = Array.isArray(res) ? res : (res?.items || []);
          
          // Chuẩn hóa dữ liệu trước khi lưu
          data = data.map(p => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            name_en: p.name_en,
            price: p.price,
            oldPrice: p.oldPrice,
            salePercent: p.salePercent,
            category: p.category, // 'shoes', 'clothing'
            brand: p.brand,
            images: p.images || [],
            isNew: p.isNew,
            isGift: p.isGift,
            // Tạo text tìm kiếm gộp để Fuse dễ bắt
            searchText: `${p.name} ${p.name_en || ''} ${p.category || ''} ${p.brand || ''} ${p.sku || ''} áo quần giày thể thao running sale`,
            // Thông tin phụ trợ cho Logic tư vấn
            specs: {
                weight: p.highlights?.find(h => h.includes('g')) || 'N/A', // Trích xuất cân nặng từ highlight nếu có
                attributes: p.highlights || []
            }
          }));

          await saveProductsToCache(data);
        } catch (err) {
          return;
        }
      }

      setProducts(data);

      // Cấu hình Fuse.js tối ưu cho tìm kiếm sản phẩm
      fuseRef.current = new Fuse(data, {
        keys: [
            { name: 'name', weight: 0.7 },
            { name: 'name_en', weight: 0.5 },
            { name: 'brand', weight: 0.2 },
            { name: 'category', weight: 0.3 },
            { name: 'searchText', weight: 0.8 }
        ],
        threshold: 0.6, // Nới lỏng hơn nữa: 0.5 → 0.6
        distance: 200,
        ignoreLocation: true,
        minMatchCharLength: 2, // Chỉ cần match 2 ký tự
        shouldSort: true,
        findAllMatches: true // Tìm tất cả matches có thể
      });

      setIsReady(true);
    };

    initData();
  }, []);

  const searchProducts = (query, limit = 5) => {
    if (!fuseRef.current) {
      return [];
    }
    
    // Trích xuất keywords quan trọng từ query
    const extractKeywords = (text) => {
      const keywords = [];
      const lower = text.toLowerCase();
      
      // Từ khóa sản phẩm
      if (/áo|shirt|jacket|khoác/i.test(lower)) keywords.push('áo');
      if (/quần|pants|short/i.test(lower)) keywords.push('quần');
      if (/giày|shoes|running/i.test(lower)) keywords.push('giày');
      
      // Từ khóa đặc biệt
      if (/sale|giảm|rẻ|khuyến mãi/i.test(lower)) keywords.push('sale');
      if (/mới|new/i.test(lower)) keywords.push('mới');
      if (/nam|men/i.test(lower)) keywords.push('nam');
      if (/nữ|women/i.test(lower)) keywords.push('nữ');
      
      return keywords.length > 0 ? keywords.join(' ') : text;
    };
    
    const searchQuery = extractKeywords(query);
    
    const results = fuseRef.current.search(searchQuery, { limit });
    return results;
  };

  // Tìm sản phẩm theo ID/Slug (Dùng cho so sánh)
  const findProduct = (identifier) => {
      return products.find(p => p.id === identifier || p.slug === identifier);
  }

  return { products, searchProducts, findProduct, isReady };
};