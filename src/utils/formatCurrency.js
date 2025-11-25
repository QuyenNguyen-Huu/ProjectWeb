// Tỷ giá VND/USD (có thể cập nhật theo thời gian thực nếu cần)
const VND_TO_USD_RATE = 25000; // 1 USD = 25,000 VND (tỷ giá ước tính)

export const formatCurrency = (amount, language = 'vi') => {
  if (amount === undefined || amount === null) return "";
  const numberAmount = typeof amount === 'string' ? parseInt(amount.replace(/[^0-9]/g, ''), 10) : amount;

  if (isNaN(numberAmount)) return language === 'en' ? "$0.00" : "0 VNĐ";

  // Nếu tiếng Anh, chuyển sang USD
  if (language === 'en') {
    const usdAmount = numberAmount / VND_TO_USD_RATE;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(usdAmount);
  }

  // Tiếng Việt - VND
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
    .format(numberAmount)
    .replace('₫', 'VNĐ');
};