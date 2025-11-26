import localforage from 'localforage';

// Cấu hình localforage
localforage.config({
  name: 'IMSports_Advisor',
  storeName: 'advisor_data'
});

export const STORAGE_KEYS = {
  PRODUCTS_CACHE: 'products_cache',
  USER_BEHAVIOR: 'user_behavior', 
  USER_PROFILE: 'user_profile',  
  CHAT_HISTORY: 'chat_history',
  TRACKING_SETTINGS: 'tracking_enabled',
  NOTIFY_REQUESTS: 'notify_requests' // Lưu yêu cầu nhận thông báo khi có hàng
};

// TTL cho cache sản phẩm
const CACHE_TTL = 30 * 60 * 1000; 

export const saveProductsToCache = async (data) => {
  const payload = {
    timestamp: Date.now(),
    data: data
  };
  await localforage.setItem(STORAGE_KEYS.PRODUCTS_CACHE, payload);
};

export const getProductsFromCache = async () => {
  const cached = await localforage.getItem(STORAGE_KEYS.PRODUCTS_CACHE);
  if (!cached) return null;

  const now = Date.now();
  if (now - cached.timestamp > CACHE_TTL) {
    await localforage.removeItem(STORAGE_KEYS.PRODUCTS_CACHE);
    return null;
  }
  return cached.data;
};

export const storage = localforage;