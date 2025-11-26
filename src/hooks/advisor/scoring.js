/**
 * Tính điểm phù hợp (Relevance Score) cho một sản phẩm
 * Score càng cao càng phù hợp.
 * * Các yếu tố:
 * 1. Search Match (Fuse.js): Trọng số cao nhất (40%)
 * 2. User Profile Match (Size/Weight): Trọng số (30%) - Nếu user đã nhập size/cân nặng
 * 3. Behavior (Lịch sử xem): Trọng số (20%) - Ưu tiên sản phẩm đã xem nhiều
 * 4. Recency (Vừa xem gần đây): Trọng số (10%)
 */

export const calculateScore = (product, fuseResult, userProfile, behaviorData) => {
    let totalScore = 0;

    // 1. Điểm tìm kiếm (Fuse.js trả về score từ 0 -> 1, 0 là khớp nhất)
    // Ta đảo ngược 1 là khớp nhất, 0 là không khớp
    const searchScore = fuseResult ? (1 - fuseResult.score) : 0;
    totalScore += searchScore * 40; // Max 40 điểm

    // 2. Điểm Profile (Size & Cân nặng)
    let profileScore = 0;
    if (userProfile.size && product.sizes) {
        // Kiểm tra xem sản phẩm có size của user không
        // Chuẩn hóa size về chữ hoa để so sánh (ví dụ: "m" -> "M")
        const userSize = userProfile.size.toString().toUpperCase();
        const hasSize = product.sizes.some(s => s.toString().toUpperCase() === userSize);
        if (hasSize) profileScore += 1;
    }
    // (Mở rộng: Logic cân nặng nếu sản phẩm có thông số 'supportedWeight')
    
    totalScore += profileScore * 30; // Max 30 điểm (nếu khớp size)

    // 3. Điểm Hành vi (Behavior - Frequency)
    const pid = product.id || product.slug;
    const viewStats = behaviorData.views[pid];
    if (viewStats) {
        // Logarit để tránh count quá lớn lấn át các chỉ số khác
        // Ví dụ: xem 1 lần -> 0.69, xem 10 lần -> 2.3
        const viewScore = Math.min(Math.log(viewStats.count + 1), 5); 
        totalScore += viewScore * 4; // Max ~20 điểm
    }

    // 4. Điểm Recency (Vừa xem gần đây)
    if (behaviorData.lastViewed.includes(pid)) {
        totalScore += 10; // Cộng thẳng 10 điểm
    }

    return totalScore;
};

/**
 * Logic so sánh 2 sản phẩm
 * Trả về object chứa điểm mạnh/yếu tương đối
 */
export const compareProductsLogic = (prodA, prodB) => {
    const comparison = {
        common: [],
        diff: []
    };

    // So sánh Giá
    if (prodA.price < prodB.price) {
        comparison.diff.push({
            type: 'price',
            winner: prodA,
            text_vi: `${prodA.name} rẻ hơn khoảng ${(prodB.price - prodA.price).toLocaleString()}đ`,
            text_en: `${prodA.name} is cheaper by about ${(prodB.price - prodA.price).toLocaleString()} VND`
        });
    } else if (prodA.price > prodB.price) {
        comparison.diff.push({
            type: 'price',
            winner: prodB,
            text_vi: `${prodB.name} có giá tốt hơn (rẻ hơn ${(prodA.price - prodB.price).toLocaleString()}đ)`,
            text_en: `${prodB.name} has a better price (cheaper by ${(prodA.price - prodB.price).toLocaleString()} VND)`
        });
    } else {
        comparison.common.push({ vi: "Cả hai có cùng mức giá", en: "Both have the same price" });
    }

    // So sánh Danh mục
    if (prodA.category === prodB.category) {
        // comparison.common.push({ vi: `Cùng thuộc dòng ${prodA.category}`, en: `Both are ${prodA.category}` });
    } else {
        comparison.diff.push({
            type: 'category',
            text_vi: `${prodA.name} là ${prodA.category}, trong khi ${prodB.name} là ${prodB.category}`,
            text_en: `${prodA.name} is ${prodA.category}, while ${prodB.name} is ${prodB.category}`
        });
    }

    // (Mở rộng: So sánh trọng lượng, chất liệu dựa trên description/highlights nếu có)

    return comparison;
};