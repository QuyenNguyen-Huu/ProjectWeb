import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '@/utils/storage';

export const useTracker = () => {
  const [isTracking, setIsTracking] = useState(true);
  const [userProfile, setUserProfile] = useState({ weight: null, height: null, size: null });

  // Khởi tạo trạng thái tracking
  useEffect(() => {
    const init = async () => {
      const enabled = await storage.getItem(STORAGE_KEYS.TRACKING_SETTINGS);
      // Mặc định là true nếu chưa set
      setIsTracking(enabled !== false);
      
      const profile = await storage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (profile) setUserProfile(profile);
    };
    init();
  }, []);

  // Hàm Toggle Tracking (Bật/Tắt)
  const toggleTracking = async (status) => {
    setIsTracking(status);
    await storage.setItem(STORAGE_KEYS.TRACKING_SETTINGS, status);
    if (!status) {
      // Nếu tắt, có thể option xóa luôn lịch sử hành vi
      await clearHistory();
    }
  };

  // Hàm Xóa lịch sử (Privacy)
  const clearHistory = async () => {
    await storage.removeItem(STORAGE_KEYS.USER_BEHAVIOR);
    await storage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
    await storage.removeItem(STORAGE_KEYS.USER_PROFILE);
    setUserProfile({});
    console.log("Tracking history cleared.");
  };

  // Hàm Log hành vi xem sản phẩm - CÓ ERROR HANDLING
  const trackViewProduct = async (product) => {
    if (!isTracking || !product) return;

    try {
      const behavior = (await storage.getItem(STORAGE_KEYS.USER_BEHAVIOR)) || { views: {}, lastViewed: [] };
      
      // 1. Cập nhật số lần xem (Frequency)
      const productId = product.id || product.slug;
      if (!behavior.views[productId]) {
        behavior.views[productId] = { count: 0, firstSeen: Date.now(), details: { name: product.name, cat: product.category } };
      }
      behavior.views[productId].count += 1;
      behavior.views[productId].lastSeen = Date.now();

      // 2. Cập nhật danh sách xem gần đây (Recency) - Giữ 10 món gần nhất
      let recent = behavior.lastViewed.filter(id => id !== productId);
      recent.unshift(productId);
      behavior.lastViewed = recent.slice(0, 10);

      await storage.setItem(STORAGE_KEYS.USER_BEHAVIOR, behavior);
    } catch (error) {
      console.warn('Storage unavailable, tracking disabled:', error);
      // Fallback: Có thể dùng memory storage hoặc disable tracking
    }
  };

  // Hàm cập nhật hồ sơ người dùng (Weight, Height, Size) - CÓ ERROR HANDLING
  const updateUserProfile = async (key, value) => {
    if (!isTracking) return;
    try {
      const newProfile = { ...userProfile, [key]: value };
      setUserProfile(newProfile);
      await storage.setItem(STORAGE_KEYS.USER_PROFILE, newProfile);
    } catch (error) {
      console.warn('Failed to update profile:', error);
    }
  };

  // Hàm lấy dữ liệu hành vi để phân tích (Dùng cho Bot) - CÓ ERROR HANDLING
  const getBehaviorData = async () => {
    try {
      return await storage.getItem(STORAGE_KEYS.USER_BEHAVIOR) || { views: {}, lastViewed: [] };
    } catch (error) {
      console.warn('Failed to get behavior data:', error);
      return { views: {}, lastViewed: [] };
    }
  };

  // Hàm đăng ký nhận thông báo khi sản phẩm có hàng
  const registerNotification = async (category, userInfo = {}) => {
    if (!isTracking) return;
    try {
      const notifications = (await storage.getItem(STORAGE_KEYS.NOTIFY_REQUESTS)) || [];
      
      notifications.push({
        category,
        userInfo,
        requestedAt: Date.now(),
        status: 'pending' // pending, notified
      });
      
      await storage.setItem(STORAGE_KEYS.NOTIFY_REQUESTS, notifications);
      console.log(`Registered notification for category: ${category}`);
    } catch (error) {
      console.warn('Failed to register notification:', error);
    }
  };
  
  // Hàm lấy danh sách đăng ký nhận thông báo
  const getNotificationRequests = async () => {
    try {
      return await storage.getItem(STORAGE_KEYS.NOTIFY_REQUESTS) || [];
    } catch (error) {
      console.warn('Failed to get notifications:', error);
      return [];
    }
  };

  return {
    isTracking,
    toggleTracking,
    clearHistory,
    trackViewProduct,
    updateUserProfile,
    userProfile,
    getBehaviorData,
    registerNotification,
    getNotificationRequests
  };
};