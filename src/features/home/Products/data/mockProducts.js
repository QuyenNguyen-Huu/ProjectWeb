import { ALL_PRODUCTS } from '@/data/products';

// --- Helper Function để biến đổi dữ liệu ---
const transformProductForCard = (product) => ({
    id: product.id,
    title: product.name,
    href: `/${product.slug}.html`, // Tự động tạo href từ slug của Mockup
    images: product.images_card,
    price: product.price,
    oldPrice: product.oldPrice,
    salePercent: product.salePercent,
});

// --- Xuất mảng cho "Sản phẩm mới" ---
const newProductIds = [301, 302, 101, 102];
export const mockNewProducts = ALL_PRODUCTS
    .filter(p => newProductIds.includes(p.id))
    .map(transformProductForCard);


// --- Xuất mảng cho "Sản phẩm Sale" ---
export const mockSaleProducts = ALL_PRODUCTS
    .filter(p => p.oldPrice !== null) // Tự động tìm tất cả sản phẩm có sale
    .map(transformProductForCard);