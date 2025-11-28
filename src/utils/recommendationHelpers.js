const STORAGE_KEY = 'user_viewed_history';
const MAX_HISTORY_ITEMS = 20; // Chỉ lưu 20 sản phẩm gần nhất để nhẹ bộ nhớ

/**
 * 1. Hàm lưu sản phẩm vào lịch sử xem
 */
export const trackViewedProduct = (product) => {
  if (!product || !product.id || !product.category) return;

  try {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // Tạo item mới
    const newItem = {
      id: product.id,
      category: product.category,
      timestamp: Date.now() // Lưu thời gian để xử lý việc "xem gần đây nhất"
    };

    // Lọc bỏ sản phẩm trùng (nếu đã xem rồi thì xóa cũ thêm mới để cập nhật timestamp)
    const newHistory = history.filter(item => item.id !== product.id);

    // Thêm vào đầu mảng
    newHistory.unshift(newItem);

    // Cắt bớt nếu quá dài
    if (newHistory.length > MAX_HISTORY_ITEMS) {
      newHistory.length = MAX_HISTORY_ITEMS;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error("Error saving viewing history", error);
  }
};

/**
 * 2. Thuật toán tìm Category được quan tâm nhất
 * - Đếm số lần xuất hiện của từng category.
 * - Nếu số lượng bằng nhau, category nào có sản phẩm được xem gần đây hơn sẽ thắng.
 */
export const getPreferredCategory = () => {
  try {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (history.length === 0) return null; // Trường hợp chưa xem gì

    const categoryStats = {};

    history.forEach(item => {
      if (!categoryStats[item.category]) {
        categoryStats[item.category] = {
          count: 0,
          lastSeen: 0
        };
      }
      categoryStats[item.category].count += 1;
      // Cập nhật lastSeen nếu item này mới hơn
      if (item.timestamp > categoryStats[item.category].lastSeen) {
        categoryStats[item.category].lastSeen = item.timestamp;
      }
    });

    // Chuyển object thành array để sort
    const sortedCategories = Object.keys(categoryStats).sort((a, b) => {
      const catA = categoryStats[a];
      const catB = categoryStats[b];

      // Ưu tiên số lượng xem (count)
      if (catB.count !== catA.count) {
        return catB.count - catA.count; // Giảm dần theo số lượng
      }
      
      // Nếu số lượng bằng nhau, ưu tiên cái mới xem gần đây (lastSeen)
      return catB.lastSeen - catA.lastSeen;
    });

    return sortedCategories[0]; // Trả về category top 1

  } catch (error) {
    console.error("Error getting preferred category", error);
    return null;
  }
};