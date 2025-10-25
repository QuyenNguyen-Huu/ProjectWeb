// src/features/home/Collections/components/Products/useProducts.js
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import mockCollections from "@/features/home/Collections/data/mockCollections";

const ITEMS_PER_PAGE = 60;

export default function useProducts() {
    const location = useLocation();

    const [allProducts, setAllProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const flatProducts = useMemo(
        () => mockCollections.flatMap((collection) => collection.products),
        []
    );

    useEffect(() => {
        setIsLoading(true);

        const queryParams = new URLSearchParams(location.search);
        const sortType = queryParams.get("show") || "";
        const pageFromUrl = parseInt(queryParams.get("page") || "1", 10);

        setSelectedOption(sortType);
        setCurrentPage(pageFromUrl);

        let sortedProducts = [...flatProducts];

        switch (sortType) {
            case "new":
                sortedProducts.sort((a, b) => b.id - a.id);
                break;
            case "priceDesc":
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case "priceAsc":
                sortedProducts.sort((a, b) => a.price - b.price);
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

        const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
        const startIndex = (pageFromUrl - 1) * ITEMS_PER_PAGE;
        const productsForCurrentPage = sortedProducts.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );

        setPageCount(totalPages);
        setCurrentProducts(productsForCurrentPage);

        setTimeout(() => setIsLoading(false), 300);
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
