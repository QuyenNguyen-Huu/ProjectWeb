/**
 * Tìm đường dẫn (path) của một danh mục dựa vào slug trong một cây danh mục.
 * @param {string} slug - Đường dẫn URL của danh mục cần tìm (ví dụ: '/do-nam/ao').
 * @param {Array} categories - Mảng dữ liệu chứa toàn bộ cây danh mục.
 * @returns {Array} Mảng các đối tượng đại diện cho breadcrumb.
 */
const findCategoryPath = (slug, categories) => {

    /**
     * Hàm đệ quy để tìm kiếm sâu vào trong cây dữ liệu.
     * @param {Array} items - Mảng các danh mục ở cấp độ hiện tại để tìm kiếm.
     * @param {Array} currentPath - Mảng chứa đường dẫn đã đi qua để đến được cấp này.
     */
    function search(items, currentPath) {
        // Duyệt qua từng danh mục trong cấp độ hiện tại.
        for (const item of items) {
            // Xây dựng một đường dẫn mới bằng cách nối item hiện tại vào đường dẫn cũ.
            const newPath = [...currentPath, { name: item.name, link: item.link }];

            // KIỂM TRA: Đã tìm thấy đích đến chưa?
            if (item.link === slug) {
                // Nếu đúng, trả về ngay lập tức con đường hoàn chỉnh này.
                return newPath;
            }

            // ĐỆ QUY: Nếu item này có 'con' (children), hãy tiếp tục tìm kiếm sâu hơn.
            if (item.children) {
                // Gọi lại chính hàm search, nhưng với danh sách 'con' và đường dẫn mới.
                const found = search(item.children, newPath);

                // Nếu cuộc tìm kiếm sâu hơn này tìm thấy kết quả,
                // hãy trả kết quả đó lên các cấp cao hơn ngay lập tức.
                if (found) {
                    return found;
                }
            }
        }

        // Nếu đã duyệt hết tất cả các item ở cấp này mà không tìm thấy,
        // trả về null để báo hiệu đây là một "ngõ cụt".
        return null;
    }

    // Bắt đầu cuộc tìm kiếm từ cấp cao nhất, với một đường dẫn ban đầu là rỗng.
    const result = search(categories, []);

    // Định dạng kết quả cuối cùng:
    // Nếu có kết quả (result không phải null), hãy thêm 'Trang chủ' vào đầu.
    // Nếu không, chỉ trả về một mảng chỉ có 'Trang chủ'.
    return result ? [{ name: 'Trang chủ', link: '/' }, ...result] : [{ name: 'Trang chủ', link: '/' }];
};

export default findCategoryPath;