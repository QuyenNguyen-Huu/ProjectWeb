# 🧪 Chatbot Manual Testing Guide

## Cách Test: Mở chat widget và thử các câu hỏi dưới đây

---

## ✅ TEST 1: Trending/Hot Products
**Mục tiêu**: Kiểm tra chatbot hiểu câu hỏi về sản phẩm hot

### Test Cases:
1. **Input**: `những món đồ hot nhất tuần này đi`
   - ✅ **Expected**: Show 3 sản phẩm trending với text có emoji 🔥
   - ✅ **Expected**: Quick replies: "Xem thêm", "So sánh", "Sản phẩm sale"

2. **Input**: `sản phẩm nào đang bán chạy`
   - ✅ **Expected**: Show danh sách sản phẩm với reason (vd: "đang giảm 20%, brand Nike uy tín")

3. **Input**: `xu hướng mùa này`
   - ✅ **Expected**: TRENDING intent, show products

---

## ✅ TEST 2: Random/Recommendation
**Mục tiêu**: Kiểm tra gợi ý ngẫu nhiên

### Test Cases:
1. **Input**: `thử random cho tôi vài món hay hay`
   - ✅ **Expected**: RECOMMENDATION intent
   - ✅ **Expected**: Show 3 products với text "Mình nghĩ mấy món này sẽ hợp với bạn đó! 😊"

2. **Input**: `gợi ý cho tôi`
   - ✅ **Expected**: Recommendations dựa trên behavior (nếu có)

3. **Input**: `có gì hay không`
   - ✅ **Expected**: GENERAL_BROWSE intent

---

## ✅ TEST 3: Size Consultation
**Mục tiêu**: Kiểm tra tư vấn size thông minh

### Test Cases:
1. **Input**: `70kg thì mang giày gì`
   - ✅ **Expected**: Show giày + recommend size M hoặc L
   - ✅ **Expected**: Text có "Với cân nặng 70kg, mình nghĩ size **M** sẽ vừa vặn! 👕"

2. **Input**: `đôi norda 001 có size 42 không`
   - ✅ **Expected**: Search "norda 001"
   - ✅ **Expected**: Response: "Dạ có! Size 42 vẫn còn hàng..." + show sản phẩm

3. **Input**: `mình cao 175cm nặng 70kg chọn size nào`
   - ✅ **Expected**: Recommend size dựa trên cân nặng
   - ✅ **Expected**: Save weight & height vào user profile

---

## ✅ TEST 4: Compare Products
**Mục tiêu**: Kiểm tra so sánh sản phẩm

### Test Cases:
1. **Scenario A - Direct comparison**:
   - **Input**: `so sánh speedgoat 6 và hoka transport`
   - ✅ **Expected**: Search 2 sản phẩm tự động
   - ✅ **Expected**: Show comparison + 2 product cards
   - ✅ **Expected**: Quick replies: "Xem chi tiết sản phẩm 1", "Xem chi tiết sản phẩm 2"

2. **Scenario B - After suggestions**:
   - **Step 1**: `70kg thì mang giày gì` (show 3 products)
   - **Step 2**: Click "So sánh" quick reply
   - ✅ **Expected**: Tự động so sánh 2 sản phẩm đầu trong list

---

## ✅ TEST 5: Fallback Intelligence
**Mục tiêu**: Kiểm tra xử lý khi không hiểu

### Test Cases:
1. **Input**: `asdfghjkl` (random text)
   - ✅ **Expected**: Không báo lỗi
   - ✅ **Expected**: Show random 3 products với text "Hmm, search này hơi khó đấy 🤔"
   - ✅ **Expected**: Quick replies: "Sản phẩm hot", "Sale", "Gợi ý cho tôi"

2. **Input**: `cho tôi xem cái gì đó`
   - ✅ **Expected**: GENERAL_BROWSE → show products

---

## ✅ TEST 6: Product Link & History
**Mục tiêu**: Kiểm tra link và lịch sử chat

### Test Cases:
1. **Step 1**: Chat "gợi ý cho tôi" → Show 3 products
2. **Step 2**: Click vào 1 sản phẩm
   - ✅ **Expected**: Chuyển đến trang `/slug.html`
   - ✅ **Expected**: Chat history được backup vào localStorage

3. **Step 3**: Click back về trang chủ
   - ✅ **Expected**: Chat history tự động restore
   - ✅ **Expected**: Có thể tiếp tục chat

---

## ✅ TEST 7: Minimize/Maximize
**Mục tiêu**: Kiểm tra thu nhỏ/phóng to

### Test Cases:
1. **Step 1**: Chat vài message
2. **Step 2**: Click minimize
   - ✅ **Expected**: Header thu gọn (220px width)
   - ✅ **Expected**: Icon nhỏ lại, text nhỏ lại
   - ✅ **Expected**: Hiện nút X để đóng
   - ✅ **Expected**: Bo tròn 4 góc

3. **Step 3**: Click expand
   - ✅ **Expected**: Mở rộng về 360-400px
   - ✅ **Expected**: Tự động scroll xuống message mới nhất
   - ✅ **Expected**: Không bị lỗi giao diện

---

## ✅ TEST 8: Response Variations
**Mục tiêu**: Kiểm tra chatbot không lặp lại câu trả lời

### Test Cases:
1. **Repeat 5 times**: `gợi ý cho tôi`
   - ✅ **Expected**: 5 lần có ít nhất 2-3 response khác nhau
   - ✅ **Expected**: Emoji thay đổi (🎯, 👟, 🔥, ✨)

2. **Test reason variations**: `70kg mang giày gì`
   - ✅ **Expected**: Lý do thay đổi: "đang giảm 20%", "brand Nike uy tín", "giá tốt", etc.

---

## ✅ TEST 9: Quick Replies
**Mục tiêu**: Kiểm tra các nút gợi ý

### Test Cases:
1. **Click**: "Sản phẩm hot"
   - ✅ **Expected**: Show trending products

2. **Click**: "Sale"
   - ✅ **Expected**: Show sale products

3. **Click**: "Tư vấn size giày"
   - ✅ **Expected**: Hỏi thông tin (cân nặng, chiều cao)

---

## ✅ TEST 10: Clear History
**Mục tiêu**: Kiểm tra xóa lịch sử

### Test Cases:
1. **Step 1**: Chat vài message
2. **Step 2**: Click refresh icon trên header
   - ✅ **Expected**: Hiện confirm dialog
3. **Step 3**: Click OK
   - ✅ **Expected**: Clear tất cả messages
   - ✅ **Expected**: Show lại greeting message
   - ✅ **Expected**: sessionStorage cleared

---

## 📊 Test Score
**Tự chấm điểm**: Mỗi test pass = 10 điểm

- 🥇 **90-100 điểm**: Excellent! Chatbot hoạt động tốt
- 🥈 **70-89 điểm**: Good! Có vài lỗi nhỏ
- 🥉 **50-69 điểm**: Fair - Cần fix một số tính năng
- ❌ **< 50 điểm**: Poor - Nhiều bugs cần fix

---

## 🐛 Bug Report Template
Nếu phát hiện lỗi, ghi lại theo format:

```
BUG: [Tên lỗi ngắn gọn]
STEPS:
1. [Bước 1]
2. [Bước 2]
3. [Bước 3]

EXPECTED: [Kết quả mong đợi]
ACTUAL: [Kết quả thực tế]
SCREENSHOT: [Attach nếu có]
```

---

## 🎯 Priority Features to Test
1. ✅ **HIGH**: Size consultation (quan trọng nhất cho UX)
2. ✅ **HIGH**: Product comparison (tính năng hay)
3. ✅ **MEDIUM**: Fallback intelligence (trải nghiệm tốt)
4. ✅ **MEDIUM**: Response variations (tránh nhàm chán)
5. ✅ **LOW**: Minimize animation (nice-to-have)

---

## 💡 Tips for Testing
- Test với nhiều cách hỏi khác nhau
- Thử cả tiếng Việt và tiếng Anh
- Test trên mobile và desktop
- Kiểm tra F12 Console xem có error không
- Test với internet chậm (throttle network)
