import Breadcrumb from "@/features/products/Categories-Products/Breadcrumb";
import SidebarCategories from "@/features/products/Categories-Products/FilterCategories/FilterCategories";
import Products from "@/features/products/Categories-Products/Products/Products";
import { useLocation, useParams } from "react-router-dom";
import '../features/products/Categories-Products/style.css'
import { useEffect, useState } from "react";
import { categoriesMockup } from "@/features/products/Categories-Products/data/mockupObject";
import findCategoryPath from "@/hooks/productsUtils";

export default function ProductsPage() {
    const location = useLocation();
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);

    useEffect(() => {
        const currentSlug = location.pathname;
        // Tìm đường dẫn danh mục từ slug
        const path = findCategoryPath(currentSlug, categoriesMockup);
        setBreadcrumbItems(path);

    }, [location]);

    return (
        <>
            <section
                className="bg-[#f4f4f4] mb-10 py-10 bg-[position:center_top] bg-no-repeat"
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
