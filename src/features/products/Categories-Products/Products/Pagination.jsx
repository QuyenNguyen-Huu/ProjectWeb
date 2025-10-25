import React, { useMemo, useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [jumpToPageInput, setJumpToPageInput] = useState("");
    const pageNumbers = useMemo(() => {
        const pagesToShow = 4;

        // 1. Nếu tổng số trang ít hơn 4, hiển thị tất cả
        if (totalPages <= pagesToShow) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // 2. Nếu đang ở gần đầu (trang 1, 2)
        if (currentPage <= 2) {
            return [1, 2, 3, 4];
        }

        // 3. Nếu đang ở gần cuối (2 trang cuối)
        if (currentPage >= totalPages - 1) {
            return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        // 4. Nếu đang ở giữa -> hiển thị [trang trước, trang hiện tại, trang sau, trang sau nữa]
        // Ví dụ: khi currentPage là 4 -> trả về [3, 4, 5, 6]
        return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];

    }, [currentPage, totalPages]);

    const handleJumpSubmit = (e) => {
        e.preventDefault(); // Ngăn trình duyệt tải lại trang
        const pageNum = parseInt(jumpToPageInput, 10);

        // Kiểm tra xem số nhập vào có hợp lệ không
        if (pageNum >= 1 && pageNum <= totalPages) {
            onPageChange(pageNum); // Gọi hàm của component cha để chuyển trang
            setJumpToPageInput(""); // Xóa nội dung trong ô input sau khi nhảy trang thành công
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        // Bọc tất cả trong một div để căn chỉnh dễ hơn
        <div className="flex items-center justify-center space-x-6">
            {/* Cụm nút bấm điều hướng */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-fit">
                {/* Nút Lùi */}
                {currentPage > 1 && (
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 border-r border-gray-300"
                    >
                        &lt;
                    </button>
                )}

                {/* Các nút số trang */}
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        disabled={page === currentPage}
                        className={`px-4 py-2 border-r border-gray-300 transition-colors duration-200
                            ${page === currentPage
                                ? 'bg-gray-800 text-white font-bold cursor-default'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`
                        }
                    >
                        {page}
                    </button>
                ))}

                {/* Nút Tới */}
                {currentPage < totalPages && (
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        &gt;
                    </button>
                )}
            </div>

            <form onSubmit={handleJumpSubmit} className="flex items-center border border-gray-300">
                <input
                    type="number"
                    value={jumpToPageInput}
                    onChange={(e) => setJumpToPageInput(e.target.value)}
                    className="w-30 p-1  text-left"
                    placeholder="Nhập trang"
                    min="1"
                    max={totalPages}
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-gray-500 hover:bg-gray-200 text-sm text-white font-medium"
                >
                    Đi
                </button>
            </form>
        </div>
    );
};

export default Pagination;