import Breadcrumb from "@/features/products/Categories-Products/Breadcrumb";
import SidebarCategories from "@/features/products/Categories-Products/FilterCategories/FilterCategories";
import Products from "@/features/products/Categories-Products/Products/Products";
import { useLocation, useParams } from "react-router-dom";
import '../features/products/Categories-Products/style.css'
import { useEffect, useState } from "react";
import { categoriesMockup } from "@/features/products/Categories-Products/data/mockupObject";
import findCategoryPath from "@/hooks/productsUtils";

// Helper function để tạo breadcrumb cho nested routes
function getBreadcrumbForPath(path) {
    const homeItem = { name: 'Trang chủ', nameKey: 'common.home', link: '/' };
    
    // Men routes - English
    if (path.startsWith("/men/shirt")) {
        return [
            homeItem,
            { name: 'Đồ nam', nameKey: 'header.menu.men', link: '/men' },
            { name: 'Áo Chạy Bộ Nam', nameKey: 'header.menu.menShirt', link: '/men/shirt' }
        ];
    }
    if (path.startsWith("/men/pants")) {
        return [
            homeItem,
            { name: 'Đồ nam', nameKey: 'header.menu.men', link: '/men' },
            { name: 'Quần Chạy Bộ Nam', nameKey: 'header.menu.menPants', link: '/men/pants' }
        ];
    }
    if (path.startsWith("/men/run-shoes")) {
        return [
            homeItem,
            { name: 'Đồ nam', nameKey: 'header.menu.men', link: '/men' },
            { name: 'Giày Chạy Bộ Nam', nameKey: 'header.menu.menRunShoes', link: '/men/run-shoes' }
        ];
    }
    if (path.startsWith("/men/trail-shoes")) {
        return [
            homeItem,
            { name: 'Đồ nam', nameKey: 'header.menu.men', link: '/men' },
            { name: 'Giày Địa Hình Nam', nameKey: 'header.menu.menTrailShoes', link: '/men/trail-shoes' }
        ];
    }
    
    // Women routes - English
    if (path.startsWith("/women/shirt")) {
        return [
            homeItem,
            { name: 'Đồ nữ', nameKey: 'header.menu.women', link: '/women' },
            { name: 'Áo Chạy Bộ Nữ', nameKey: 'header.menu.womenShirt', link: '/women/shirt' }
        ];
    }
    if (path.startsWith("/women/pants")) {
        return [
            homeItem,
            { name: 'Đồ nữ', nameKey: 'header.menu.women', link: '/women' },
            { name: 'Quần Chạy Bộ Nữ', nameKey: 'header.menu.womenPants', link: '/women/pants' }
        ];
    }
    if (path.startsWith("/women/run-shoes")) {
        return [
            homeItem,
            { name: 'Đồ nữ', nameKey: 'header.menu.women', link: '/women' },
            { name: 'Giày Chạy Bộ Nữ', nameKey: 'header.menu.womenRunShoes', link: '/women/run-shoes' }
        ];
    }
    if (path.startsWith("/women/trail-shoes")) {
        return [
            homeItem,
            { name: 'Đồ nữ', nameKey: 'header.menu.women', link: '/women' },
            { name: 'Giày Địa Hình Nữ', nameKey: 'header.menu.womenTrailShoes', link: '/women/trail-shoes' }
        ];
    }
    
    // Men routes - Vietnamese
    if (path.startsWith("/ao-chay-bo-nam")) {
        return [
            homeItem,
            { name: 'Đồ nam', nameKey: 'header.menu.men', link: '/do-nam' },
            { name: 'Áo Chạy Bộ Nam', nameKey: 'header.menu.menShirt', link: '/ao-chay-bo-nam' }
        ];
    }
    if (path.startsWith("/quan-chay-bo-nam")) {
        return [
            homeItem,
            { name: 'Đồ nam', nameKey: 'header.menu.men', link: '/do-nam' },
            { name: 'Quần Chạy Bộ Nam', nameKey: 'header.menu.menPants', link: '/quan-chay-bo-nam' }
        ];
    }
    if (path.startsWith("/giay-chay-bo-nam")) {
        return [
            homeItem,
            { name: 'Đồ nam', nameKey: 'header.menu.men', link: '/do-nam' },
            { name: 'Giày Chạy Bộ Nam', nameKey: 'header.menu.menRunShoes', link: '/giay-chay-bo-nam' }
        ];
    }
    if (path.startsWith("/giay-chay-dia-hinh-nam")) {
        return [
            homeItem,
            { name: 'Đồ nam', nameKey: 'header.menu.men', link: '/do-nam' },
            { name: 'Giày Địa Hình Nam', nameKey: 'header.menu.menTrailShoes', link: '/giay-chay-dia-hinh-nam' }
        ];
    }
    
    // Women routes - Vietnamese
    if (path.startsWith("/ao-chay-bo-nu")) {
        return [
            homeItem,
            { name: 'Đồ nữ', nameKey: 'header.menu.women', link: '/do-nu' },
            { name: 'Áo Chạy Bộ Nữ', nameKey: 'header.menu.womenShirt', link: '/ao-chay-bo-nu' }
        ];
    }
    if (path.startsWith("/quan-chay-bo-nu")) {
        return [
            homeItem,
            { name: 'Đồ nữ', nameKey: 'header.menu.women', link: '/do-nu' },
            { name: 'Quần Chạy Bộ Nữ', nameKey: 'header.menu.womenPants', link: '/quan-chay-bo-nu' }
        ];
    }
    if (path.startsWith("/giay-chay-bo-nu")) {
        return [
            homeItem,
            { name: 'Đồ nữ', nameKey: 'header.menu.women', link: '/do-nu' },
            { name: 'Giày Chạy Bộ Nữ', nameKey: 'header.menu.womenRunShoes', link: '/giay-chay-bo-nu' }
        ];
    }
    if (path.startsWith("/giay-chay-dia-hinh-nu")) {
        return [
            homeItem,
            { name: 'Đồ nữ', nameKey: 'header.menu.women', link: '/do-nu' },
            { name: 'Giày Địa Hình Nữ', nameKey: 'header.menu.womenTrailShoes', link: '/giay-chay-dia-hinh-nu' }
        ];
    }
    
    // Watch routes
    if (path.startsWith("/watch/suunto") || path.startsWith("/dong-ho-suunto")) {
        return [
            homeItem,
            { name: 'Đồng hồ', nameKey: 'header.menu.watch', link: path.includes('/watch/') ? '/watch' : '/dong-ho' },
            { name: 'Đồng Hồ Suunto', nameKey: 'header.menu.suunto', link: path }
        ];
    }
    if (path.startsWith("/watch/garmin") || path.startsWith("/dong-ho-garmin")) {
        return [
            homeItem,
            { name: 'Đồng hồ', nameKey: 'header.menu.watch', link: path.includes('/watch/') ? '/watch' : '/dong-ho' },
            { name: 'Đồng Hồ Garmin', nameKey: 'header.menu.garmin', link: path }
        ];
    }
    if (path.startsWith("/watch/coros") || path.startsWith("/dong-ho-coros")) {
        return [
            homeItem,
            { name: 'Đồng hồ', nameKey: 'header.menu.watch', link: path.includes('/watch/') ? '/watch' : '/dong-ho' },
            { name: 'Đồng Hồ Coros', nameKey: 'header.menu.coros', link: path }
        ];
    }
    
    // Sale
    if (path.startsWith("/sale")) {
        return [homeItem, { name: 'SALE', nameKey: 'header.menu.sale', link: '/sale' }];
    }
    
    // About
    if (path.startsWith("/about")) {
        return [homeItem, { name: 'Giới Thiệu', nameKey: 'header.menu.about', link: '/about' }];
    }
    
    return null;
}

export default function ProductsPage() {
    const location = useLocation();
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);

    useEffect(() => {
        const currentSlug = location.pathname;
        
        // Thử lấy breadcrumb từ nested routes trước
        const nestedBreadcrumb = getBreadcrumbForPath(currentSlug);
        if (nestedBreadcrumb) {
            setBreadcrumbItems(nestedBreadcrumb);
            return;
        }
        
        // Fallback: Tìm đường dẫn danh mục từ slug trong categoriesMockup
        const path = findCategoryPath(currentSlug, categoriesMockup);
        setBreadcrumbItems(path);

    }, [location.pathname]);

    return (
        <>
            <section
            // nếu muốn đổi nền xám thêm cái này vào bg-[#f4f4f4]
                className=" mb-10 py-10 bg-[position:center_top] bg-no-repeat"
                style={{ backgroundImage: "url(https://pos.nvncdn.com/be3294-43017/pc/20250701_TUKu18bH.jpg?v=1751362767)" }}
            >
                {/* Hiển thị "breadcrumb" là chuỗi liên kết thể hiện vị trí hiện tại */}
                <Breadcrumb breadcrumbItems={breadcrumbItems} />
            </section>
            {/* Hiển thị lọc theo danh mục + các sản phẩm */}
            <div className="products-container w-full">
                <div className="flex">
                    <SidebarCategories />
                    <Products />
                </div>
            </div>
        </>
    );
}
