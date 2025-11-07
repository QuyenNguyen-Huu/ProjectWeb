// src/features/home/Collections/components/Products/useProducts.js
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ALL_PRODUCTS } from "@/data/products";

const ITEMS_PER_PAGE = 60;

export default function useProducts() {
    const location = useLocation();

    const [allProducts, setAllProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const transformProductForCard = (product) => ({
        id: product.id,
        title: product.name,
        href: `/${product.slug}.html`,
        images: product.images_card || [],
        price: product.price,
        oldPrice: product.oldPrice,
        salePercent: product.salePercent ?? 0,
        numericPrice: parseInt(
            (product.price || "0").replace(/[^\d]/g, ""),
            10
        ),
    });

    // --- Làm phẳng & chuẩn hoá tất cả sản phẩm ---
    const flatProducts = useMemo(() => {
        return ALL_PRODUCTS.flatMap((product) => transformProductForCard(product));
    }, []);

    useEffect(() => {
        setIsLoading(true);

        const queryParams = new URLSearchParams(location.search);
        const sortType = queryParams.get("show") || "";
        const pageFromUrl = parseInt(queryParams.get("page") || "1", 10);

        setSelectedOption(sortType);
        setCurrentPage(pageFromUrl);

        let sortedProducts = [...flatProducts];

        // 🧩 Sắp xếp theo loại
        switch (sortType) {
            case "new":
                sortedProducts.sort((a, b) => b.id - a.id);
                break;

            case "priceDesc":
                sortedProducts.sort((a, b) => b.numericPrice - a.numericPrice);
                break;

            case "priceAsc":
                sortedProducts.sort((a, b) => a.numericPrice - b.numericPrice);
                break;

            case "discount":
                sortedProducts.sort(
                    (a, b) => (b.salePercent || 0) - (a.salePercent || 0)
                );
                break;

            default:
                break;
        }

        setAllProducts(sortedProducts);

        // 🧩 Phân trang
        const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
        const startIndex = (pageFromUrl - 1) * ITEMS_PER_PAGE;
        const productsForCurrentPage = sortedProducts.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );

        setPageCount(totalPages);
        setCurrentProducts(productsForCurrentPage);

        // hiệu ứng loading nhẹ
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, [location.search, flatProducts]);

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
