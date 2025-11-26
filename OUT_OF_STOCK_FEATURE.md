# 📦 Tính năng xử lý sản phẩm chưa có hàng (Out of Stock)

## 🎯 Mục tiêu
Xử lý thân thiện khi khách hỏi về sản phẩm chưa có trong kho (như đồng hồ thể thao) và chuẩn bị sẵn logic cho khi có hàng.

---

## ✨ Tính năng đã thêm

### 1. **Intent Detection cho Out-of-Stock Categories**

**File:** `src/hooks/useProductAdvisor.js` - Lines 22-48

**Logic:**
```javascript
const checkOutOfStockCategory = (query) => {
    const outOfStockCategories = {
        'watch': {
            patterns: [/đồng hồ/i, /watch/i, /smartwatch/i, /garmin/i, /coros/i, /suunto/i],
            vi: 'đồng hồ thể thao',
            en: 'sport watches'
        }
        // Dễ dàng thêm categories khác
    };
    
    // Check patterns
    for (const [key, cat] of Object.entries(outOfStockCategories)) {
        if (cat.patterns.some(p => p.test(query))) {
            return cat;
        }
    }
    return null;
};
```

**Cách hoạt động:**
- Detect query về đồng hồ: "đồng hồ", "smartwatch", "garmin", "coros", "suunto"
- Trả về category info với tên tiếng Việt/Anh
- Dễ dàng mở rộng thêm categories khác (nutrition, accessories...)

---

### 2. **Response Templates cho Out-of-Stock**

**File:** `src/hooks/advisor/templates.js` - Lines 100-145

#### a) **Hoàn toàn không có hàng** (`OUT_OF_STOCK`)
```javascript
case 'OUT_OF_STOCK':
    const outOfStockResponses = isVi ? [
        [`À, đồng hồ thể thao hiện tại shop chưa nhập về nè! 😅`, 
         `Nhưng đừng lo, mình đang chuẩn bị nhập hàng sớm thôi. Bạn muốn mình báo khi có không?`],
        [`Ối, đồng hồ đang hết hàng rồi bạn ơi! 🙈`, 
         `Shop đang order thêm về, dự kiến tuần sau có hàng. Để mình ghi tên bạn vào danh sách nhé?`],
        // 3 variations
    ];
```

**Đặc điểm:**
- ✅ Thân thiện, có emoji
- ✅ Giải thích tại sao không có
- ✅ Đưa ra timeline dự kiến (tuần sau)
- ✅ Gợi ý đăng ký nhận thông báo

#### b) **Có ít kết quả** (`OUT_OF_STOCK_PARTIAL`)
```javascript
case 'OUT_OF_STOCK_PARTIAL':
    const partialResponses = isVi ? [
        [`Mình tìm được ${foundCount} sản phẩm liên quan đến đồng hồ thể thao, 
          nhưng chưa đủ đa dạng lắm! 😅`, 
         `Shop đang chuẩn bị nhập thêm nhiều mẫu mới. Bạn muốn đăng ký nhận thông báo không?`],
        // 2 variations
    ];
```

**Khi nào trigger:**
- Query về đồng hồ nhưng chỉ tìm được < 3 sản phẩm
- Báo rõ số lượng tìm được
- Vẫn gợi ý đăng ký notify

#### c) **Đã đăng ký thành công** (`NOTIFY_REGISTERED`)
```javascript
case 'NOTIFY_REGISTERED':
    const registerResponses = isVi ? [
        [`Xong rồi! ✅ Mình đã ghi tên bạn vào danh sách.`, 
         `Khi có hàng về, mình sẽ báo bạn ngay. Trong lúc chờ, bạn có muốn xem sản phẩm khác không?`],
        // 3 variations
    ];
```

**Đặc điểm:**
- ✅ Confirm đã lưu
- ✅ Cam kết thông báo
- ✅ Cross-sell: gợi ý xem sản phẩm khác

---

### 3. **Storage & Tracking**

#### a) **Thêm STORAGE_KEY**
**File:** `src/utils/storage.js`
```javascript
export const STORAGE_KEYS = {
    // ... existing keys
    NOTIFY_REQUESTS: 'notify_requests' // Mới thêm
};
```

#### b) **Tracking Functions**
**File:** `src/hooks/useTracker.js` - Lines 88-118

```javascript
// Lưu request nhận thông báo
const registerNotification = async (category, userInfo = {}) => {
    const notifications = (await storage.getItem(STORAGE_KEYS.NOTIFY_REQUESTS)) || [];
    
    notifications.push({
        category,          // 'watch', 'nutrition', etc.
        userInfo,          // Email, phone (optional)
        requestedAt: Date.now(),
        status: 'pending'  // pending, notified
    });
    
    await storage.setItem(STORAGE_KEYS.NOTIFY_REQUESTS, notifications);
};

// Lấy danh sách requests
const getNotificationRequests = async () => {
    return await storage.getItem(STORAGE_KEYS.NOTIFY_REQUESTS) || [];
};
```

**Data structure:**
```json
[
  {
    "category": "watch",
    "userInfo": {},
    "requestedAt": 1732600000000,
    "status": "pending"
  }
]
```

---

### 4. **Quick Replies**

**Khi out-of-stock:**
```javascript
quickReplies: [
    "Đăng ký nhận thông báo",  // Trigger register flow
    "Xem sản phẩm khác",       // Go back to browse
    "Tư vấn cho tôi"           // Get recommendations
]
```

**Khi đã đăng ký:**
```javascript
quickReplies: [
    "Xem giày chạy bộ",
    "Xem đồ sale",
    "Tìm kiếm khác"
]
```

---

## 🔄 User Flow

### Flow 1: Hoàn toàn không có hàng
```
User: "Có đồng hồ garmin không?"
  ↓
Bot: [OUT_OF_STOCK]
  "À, đồng hồ thể thao hiện tại shop chưa nhập về nè! 😅
   Nhưng đừng lo, mình đang chuẩn bị nhập hàng sớm thôi.
   Bạn muốn mình báo khi có không?"
  
  [Đăng ký nhận thông báo] [Xem sản phẩm khác] [Tư vấn cho tôi]
  ↓
User: Click "Đăng ký nhận thông báo"
  ↓
Bot: [NOTIFY_REGISTERED]
  "Xong rồi! ✅ Mình đã ghi tên bạn vào danh sách.
   Khi có hàng về, mình sẽ báo bạn ngay."
  
  [Xem giày chạy bộ] [Xem đồ sale] [Tìm kiếm khác]
```

### Flow 2: Có ít kết quả (< 3 sản phẩm)
```
User: "Smartwatch cho chạy bộ"
  ↓
Bot: [OUT_OF_STOCK_PARTIAL]
  "Mình tìm được 2 sản phẩm liên quan đến đồng hồ thể thao,
   nhưng chưa đủ đa dạng lắm! 😅
   Shop đang chuẩn bị nhập thêm nhiều mẫu mới.
   Bạn muốn đăng ký nhận thông báo không?"
  
  [Đăng ký nhận thông báo] [Xem gợi ý khác]
```

### Flow 3: Sau khi có hàng (Future)
```
[Admin thêm sản phẩm đồng hồ vào DB]
  ↓
[Cron job/Manual trigger check NOTIFY_REQUESTS]
  ↓
[Gửi notification cho users có status='pending' và category='watch']
  ↓
[Update status='notified']
  ↓
User nhận notification: "🎉 Tin vui! Đồng hồ thể thao đã về hàng!"
```

---

## 🚀 Khi có hàng - Implementation Plan

### Phase 1: Thêm sản phẩm vào DB
```javascript
// Thêm đồng hồ vào products DB
const watches = [
    {
        id: 'garmin-945',
        name: 'Garmin Forerunner 945',
        category: 'watches', // hoặc 'đồng hồ'
        price: 12990000,
        // ... other fields
    }
];
```

### Phase 2: Check & Notify
```javascript
// Admin dashboard hoặc cron job
const notifyUsers = async () => {
    const requests = await getNotificationRequests();
    const watchRequests = requests.filter(r => 
        r.category === 'watch' && r.status === 'pending'
    );
    
    // Gửi email/notification cho các users
    for (const req of watchRequests) {
        await sendNotification(req.userInfo, {
            title: '🎉 Tin vui! Đồng hồ thể thao đã về hàng!',
            body: 'Shop vừa nhập về nhiều mẫu mới. Xem ngay nhé!',
            link: '/products?category=watches'
        });
        
        // Update status
        req.status = 'notified';
    }
    
    await storage.setItem(STORAGE_KEYS.NOTIFY_REQUESTS, requests);
};
```

### Phase 3: Bot tự động suggest
```javascript
// Khi user vào lại
if (hasNotifiedCategory(userProfile, 'watch')) {
    return {
        text: [`Chào bạn! 👋 Tin vui đây: Đồng hồ thể thao đã về hàng rồi đó!`,
               `Bạn có muốn xem các mẫu mới không?`],
        quickReplies: ["Xem đồng hồ mới về", "Để sau"]
    };
}
```

---

## 📋 Thêm Category mới

### Ví dụ: Thêm "Thực phẩm dinh dưỡng"

**Step 1:** Update `checkOutOfStockCategory()`
```javascript
const outOfStockCategories = {
    'watch': { /* ... */ },
    'nutrition': {
        patterns: [
            /dinh dưỡng/i, 
            /protein/i, 
            /supplement/i, 
            /năng lượng/i,
            /gel/i
        ],
        vi: 'thực phẩm dinh dưỡng',
        en: 'nutrition supplements'
    }
};
```

**Step 2:** Không cần thay đổi gì khác! 
- Templates tự động dùng `category.vi` / `category.en`
- Storage tự động lưu với key `'nutrition'`
- Quick replies tự động generate

---

## 🧪 Testing

### Test Case 1: Query về đồng hồ
```javascript
Input: "Có đồng hồ garmin không?"
Expected:
  - intent: 'OUT_OF_STOCK'
  - response.type: 'out_of_stock'
  - response.text: Chứa "đồng hồ thể thao", "chưa nhập về"
  - response.quickReplies: ["Đăng ký nhận thông báo", ...]
```

### Test Case 2: Đăng ký notify
```javascript
Input: Click "Đăng ký nhận thông báo"
Expected:
  - Call registerNotification('watch', {})
  - Storage lưu request với status='pending'
  - Response: "Xong rồi! ✅"
```

### Test Case 3: Variations
```javascript
// Chạy 10 lần cùng query
for (let i = 0; i < 10; i++) {
    const response = await processMessage("đồng hồ garmin");
    console.log(response.text[0]); // Phải khác nhau
}
```

### Test Case 4: Sau khi có hàng
```javascript
// Thêm watches vào DB
await addProducts(watches);

Input: "đồng hồ garmin"
Expected:
  - intent: 'SEARCH' (không phải OUT_OF_STOCK)
  - response.products: Array với đồng hồ
  - response.type: 'product_list'
```

---

## 📊 Analytics & Metrics

### Tracking
```javascript
// Metrics cần theo dõi
const metrics = {
    outOfStockRequests: {
        watch: 45,      // 45 users yêu cầu đồng hồ
        nutrition: 23   // 23 users yêu cầu dinh dưỡng
    },
    conversionAfterRestock: {
        watch: 15 / 45 = 33%  // 33% mua sau khi có hàng
    }
};
```

### Dashboard Suggestions
```
📦 Out-of-Stock Requests Dashboard

Category       | Requests | Avg per day | Priority
---------------|----------|-------------|----------
Đồng hồ        | 45       | 6.4         | 🔴 High
Dinh dưỡng     | 23       | 3.3         | 🟡 Medium
Phụ kiện       | 12       | 1.7         | 🟢 Low

→ Recommend: Prioritize restocking Đồng hồ (High demand)
```

---

## 🎨 UI Implementation (Future)

### Chatbot UI Component
```jsx
{response.type === 'out_of_stock' && (
    <div className="out-of-stock-card">
        <div className="icon">📦</div>
        <div className="message">{response.text[0]}</div>
        
        {/* Email input form */}
        <input 
            type="email" 
            placeholder="Email của bạn (optional)"
            onChange={e => setUserEmail(e.target.value)}
        />
        
        <button onClick={() => handleNotify(userEmail)}>
            🔔 Đăng ký nhận thông báo
        </button>
    </div>
)}
```

---

## 🔐 Privacy & GDPR

### Lưu ý
- ✅ Không bắt buộc email (optional)
- ✅ Có thể anonymous notification qua session
- ✅ User có thể hủy đăng ký
- ✅ Clear data sau khi notify (hoặc sau 30 ngày)

### Unsubscribe Flow
```javascript
const unsubscribeNotification = async (category) => {
    const requests = await storage.getItem(STORAGE_KEYS.NOTIFY_REQUESTS);
    const filtered = requests.filter(r => r.category !== category);
    await storage.setItem(STORAGE_KEYS.NOTIFY_REQUESTS, filtered);
};
```

---

## 📝 Summary

### ✅ Đã hoàn thành
1. ✅ Intent detection cho out-of-stock categories
2. ✅ Response templates thân thiện với 3 variations
3. ✅ Storage system lưu notification requests
4. ✅ Tracking functions (register, get requests)
5. ✅ Smart quick replies
6. ✅ Context management
7. ✅ Dễ dàng mở rộng thêm categories

### 🚧 Cần implement sau (khi có hàng)
1. Admin dashboard để xem requests
2. Email/SMS notification system
3. Cron job check & notify users
4. UI form thu thập email (optional)
5. Analytics dashboard
6. Unsubscribe flow

### 📈 Business Impact
- **Giữ chân khách:** Không mất khách khi out-of-stock
- **Demand forecasting:** Biết sản phẩm nào hot
- **Marketing:** Có list users quan tâm để email marketing
- **User experience:** Thân thiện, không để khách thất vọng

---

**Status:** ✅ Ready to use
**Next Step:** Test with real users, collect feedback, implement notification system when products arrive
