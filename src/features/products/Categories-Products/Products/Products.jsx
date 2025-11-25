import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import SortBar from "./SortBar";
import ProductGrid from "./ProductGrid";
import useProducts from "./useProducts";
import CategoryDescription from '../Components/CategoryDescription/CategoryDescription';
import { categoriesMockup } from "../data/mockupObject";
import findCategoryPath from "@/hooks/productsUtils";
import { useLanguage } from "@/context/LanguageContext";

// Helper function để lấy category title từ path
function getCategoryTitleKey(path) {
    // Men routes - English & Vietnamese
    if (path.startsWith("/men/shirt") || path.startsWith("/ao-chay-bo-nam")) return "header.menu.menShirt";
    if (path.startsWith("/men/pants") || path.startsWith("/quan-chay-bo-nam")) return "header.menu.menPants";
    if (path.startsWith("/men/run-shoes") || path.startsWith("/giay-chay-bo-nam")) return "header.menu.menRunShoes";
    if (path.startsWith("/men/trail-shoes") || path.startsWith("/giay-chay-dia-hinh-nam")) return "header.menu.menTrailShoes";
    if (path.startsWith("/do-nam") || path === "/men") return "header.menu.men";
    
    // Women routes - English & Vietnamese
    if (path.startsWith("/women/shirt") || path.startsWith("/ao-chay-bo-nu")) return "header.menu.womenShirt";
    if (path.startsWith("/women/pants") || path.startsWith("/quan-chay-bo-nu")) return "header.menu.womenPants";
    if (path.startsWith("/women/run-shoes") || path.startsWith("/giay-chay-bo-nu")) return "header.menu.womenRunShoes";
    if (path.startsWith("/women/trail-shoes") || path.startsWith("/giay-chay-dia-hinh-nu")) return "header.menu.womenTrailShoes";
    if (path.startsWith("/do-nu") || path === "/women") return "header.menu.women";
    
    // Watch routes - English & Vietnamese
    if (path.startsWith("/watch/suunto") || path.startsWith("/dong-ho-suunto")) return "header.menu.suunto";
    if (path.startsWith("/watch/garmin") || path.startsWith("/dong-ho-garmin")) return "header.menu.garmin";
    if (path.startsWith("/watch/coros") || path.startsWith("/dong-ho-coros")) return "header.menu.coros";
    if (path.startsWith("/dong-ho") || path === "/watch") return "header.menu.watch";
    
    // Sale
    if (path.startsWith("/sale")) return "header.menu.sale";
    
    // About
    if (path.startsWith("/about")) return "header.menu.about";
    
    return null;
}

const Products = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [categoryName, setCategoryName] = useState(null);
    const { t } = useLanguage();

    const {
        allProducts,
        currentProducts,
        pageCount,
        currentPage,
        selectedOption,
        isLoading,
    } = useProducts();

    // Lấy tên danh mục từ URL
    useEffect(() => {
        const currentSlug = location.pathname;
        
        // Thử lấy title từ nested routes trước
        const titleKey = getCategoryTitleKey(currentSlug);
        if (titleKey) {
            setCategoryName(titleKey);
            return;
        }
        
        // Fallback: tìm trong categoriesMockup
        const path = findCategoryPath(currentSlug, categoriesMockup);
        if (path && path.length > 0) {
            const currentCategory = path[path.length - 1];
            setCategoryName(currentCategory.nameKey || null);
        } else {
            setCategoryName(null);
        }
    }, [location.pathname]);

    const handleSortChange = (value) => {
        navigate(`?show=${value}&page=1`);
    };

    const handlePageClick = (page) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set("page", page.toString());
        navigate(`?${queryParams.toString()}`);
    };

    return (
        <div className="collection-products w-full">
            <SortBar
                total={allProducts.length}
                selectedOption={selectedOption}
                onChange={handleSortChange}
                categoryName={categoryName}
            />

            <ProductGrid isLoading={isLoading} products={currentProducts} />

            {pageCount > 1 && (
                <div className="flex justify-center mt-12">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pageCount}
                        onPageChange={handlePageClick}
                    />
                </div>
            )}
            <CategoryDescription description={t("product.data.seoDescription")} />
        </div>
    );
};

export default Products;
