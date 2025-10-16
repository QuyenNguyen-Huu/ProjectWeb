// src/features/home/Collections/components/Products/index.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import SortBar from "./SortBar";
import ProductGrid from "./ProductGrid";
import useProducts from "./useProducts";

const Products = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        allProducts,
        currentProducts,
        pageCount,
        currentPage,
        selectedOption,
        isLoading,
    } = useProducts();

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
        </div>
    );
};

export default Products;
