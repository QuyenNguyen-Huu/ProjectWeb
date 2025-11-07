import React from "react";
import CollectionGrid from "./CollectionGrid";
import mockCollections from "../data/mockCollections";
import useProducts from "@/features/products/Categories-Products/Products/useProducts";

const CollectionSection = () => {
    const {
        currentProducts,
        isLoading,
    } = useProducts();

    return (
        <div className="product_category_box">
            <div className="pt-5 pb-5 md:pt-10 md:pb-10 lg:pt-12 lg:pb-12">
                <div className="collection_container">
                    {/* --- Loading spinner --- */}
                    {isLoading ? (
                        <div className="text-center py-10">
                            <div className="animate-spin w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full mx-auto" />
                            <p className="mt-2 text-gray-600">Đang tải sản phẩm...</p>
                        </div>
                    ) : (
                        <>
                            {/* --- Hiển thị từng Collection --- */}
                            {mockCollections.map((collection, index) => {
                                // Giả sử mỗi collection có category / brand trùng với dữ liệu trong ALL_PRODUCTS
                                const productsForCollection = currentProducts.filter(
                                    (p) =>
                                        p.category?.toLowerCase() ===
                                        collection.category?.toLowerCase()
                                );

                                return (
                                    <div className="collections_item" key={index}>
                                        <div className="title text-center mb-2.5">
                                            <h2 className="inline-block mb-2.5 uppercase text-[28px] font-semibold">
                                                <a href="javascript:">{collection.title}</a>
                                            </h2>
                                        </div>

                                        <div className="mt-10">
                                            <div className="flex flex-wrap -mx-2">
                                                {/* Banner */}
                                                <div className="baner-item w-full lg:w-1/2 px-2 mb-4">
                                                    <a href={collection.href}>
                                                        <img
                                                            loading="lazy"
                                                            src={collection.banner}
                                                            alt={collection.title}
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    </a>
                                                </div>

                                                {/* Grid sản phẩm */}
                                                <div className="w-full lg:w-1/2 px-2 mb-4">
                                                    <CollectionGrid
                                                        products={
                                                            productsForCollection.length > 0
                                                                ? productsForCollection
                                                                : currentProducts.slice(0, 6) // fallback nếu collection trống
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* --- Album hoạt động team --- */}
                            <div className="collections_item">
                                <div className="title text-center mb-2.5">
                                    <h2 className="inline-block mb-2.5 uppercase text-[28px] font-semibold">
                                        <a href="javascript:">Album hoạt động team</a>
                                    </h2>
                                </div>

                                <div className="mt-10 flex flex-col md:flex-row">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="w-full md:w-1/3 px-2 mb-4 item">
                                            <a href="/imsports-team-a13407.html">
                                                <img
                                                    loading="lazy"
                                                    src="https://pos.nvncdn.com/be3294-43017/album/20240620_St1MNckY.png?v=1718876200"
                                                    alt="IMSPORTS TEAM"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CollectionSection;
