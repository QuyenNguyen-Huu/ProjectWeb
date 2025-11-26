# 🤖 Cải tiến Chatbox để giống người hơn

## ✅ ĐÃ HOÀN THÀNH - Implementation Summary

### 🔴 Priority 1 - Sửa lỗi nghiêm trọng (DONE)

✅ **1. Fixed scoring bug** - `useProductAdvisor.js` line 114
- Truyền đúng fuse score vào calculateScore
- Lưu top 10 kết quả vào conversation context

✅ **2. Added error handling** - `useTracker.js`
- Wrap tất cả storage operations trong try-catch
- Fallback gracefully khi storage unavailable

### 🟡 Priority 2 - Tăng tính tự nhiên (DONE)

✅ **3. Intent detection thông minh hơn** - `useProductAdvisor.js`
- Mở rộng compare patterns (7 patterns)
- Thêm ASK_SIZE, ASK_PRICE, FOLLOWUP intents
- Normalize typos trước khi phân tích

✅ **4. Response variations** - `advisor/templates.js`
- Random pick từ 3-4 variations cho mỗi response type
- Thêm emoji phù hợp context (👟🔥✨🎯)
- Tránh lặp lại câu trả lời

✅ **5. Dynamic response timing** - `useProductAdvisor.js`
- Tính delay dựa vào độ dài text (baseDelay + charDelay + jitter)
- Range: 400ms - 2000ms (tự nhiên hơn fixed 800ms)

✅ **6. Conversation context memory** - `useProductAdvisor.js`
- State lưu lastIntent, lastProducts, lastQuery, turnCount
- Xử lý FOLLOWUP intent dựa trên context
- Nhớ được 10 kết quả để show tiếp

✅ **7. Smart quick replies** - `useProductAdvisor.js`
- Dynamic dựa vào tên sản phẩm thực tế
- Ví dụ: "So sánh Nike vs Adidas" thay vì generic "So sánh chúng"

✅ **8. Proactive suggestions** - `useProductAdvisor.js`
- Phân tích behavior để tìm category được xem nhiều
- Greeting thông minh: "Để ý bạn hay xem Giày chạy bộ nhỉ?"
- Chỉ trigger khi >= 3 lượt xem cùng category

---

## 🔴 Priority 1 - Sửa lỗi nghiêm trọng

### 1. Fix scoring bug
**File:** `useProductAdvisor.js` line 114
```javascript
// ❌ Hiện tại (SAI)
const score = calculateScore(p, null, userProfile, behavior);

// ✅ Sửa thành
const fuseScore = rawResults.find(r => r.id === p.id)?.score || 1;
const score = calculateScore(p, { score: fuseScore }, userProfile, behavior);
```

### 2. Thêm error handling cho storage
**File:** `useTracker.js`
```javascript
// Wrap tất cả storage operations trong try-catch
const trackViewProduct = async (product) => {
    try {
        if (!isTracking || !product) return;
        // ... existing code
    } catch (error) {
        console.warn('Storage unavailable:', error);
        // Fallback: Dùng memory storage hoặc disable tracking
    }
};
```

## 🟡 Priority 2 - Tăng tính tự nhiên

### 3. Intent detection thông minh hơn
**File:** `useProductAdvisor.js` - Thay thế `analyzeIntent()`
```javascript
const analyzeIntent = (text) => {
    const lower = text.toLowerCase();
    
    // So sánh (mở rộng patterns)
    const comparePatterns = [
        /so sánh/i, /compare/i, / vs /i,
        /cái nào (tốt|ngon|đẹp)/i,
        /nên (chọn|mua) (cái gì|gì)/i,
        /(khác|hơn) nhau/i,
        /between .* and/i
    ];
    if (comparePatterns.some(p => p.test(text))) return 'COMPARE';
    
    // Hỏi về size/fit
    const fitPatterns = [/(có|hợp) size/i, /vừa không/i, /bao nhiêu/i, /fit/i];
    if (fitPatterns.some(p => p.test(text))) return 'ASK_SIZE';
    
    // Hỏi về giá
    if (/giá|bao nhiêu|price|cost/i.test(text)) return 'ASK_PRICE';
    
    // Update profile
    if (/(nặng|weight)\s*(\d{2})/.test(lower) || /(size|cỡ)\s*([smxl]{1,3})/i.test(lower)) {
        return 'UPDATE_PROFILE';
    }
    
    // Follow-up questions (cần context)
    if (/^(còn|thế|vậy|how about|what about)/i.test(text)) return 'FOLLOWUP';
    
    return 'SEARCH';
};
```

### 4. Response variations (tránh nhàm chán)
**File:** `advisor/templates.js`
```javascript
export const generateResponse = (type, data, language = 'vi') => {
    const isVi = language === 'vi';
    
    // Helper: Random pick từ mảng
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    switch (type) {
        case 'SUGGESTION':
            const intros = isVi ? [
                `Ô, mình tìm thấy ${count} món phù hợp đây! 🎯`,
                `Để xem nào... Có ${count} sản phẩm match với bạn nè`,
                `Được rồi! Mình gợi ý ${count} cái này xem sao`,
                `Perfect! ${count} lựa chọn này hợp lý đấy`
            ] : [
                `Oh, I found ${count} matching items! 🎯`,
                `Let's see... ${count} products match your needs`,
                `Great! Here are ${count} recommendations`,
                `Perfect! These ${count} options look good`
            ];
            
            const reasons = isVi ? [
                `Cái này top 1 vì nó hay được khách xem cùng với sản phẩm bạn quan tâm:`,
                `Mình recommend cái này nhất, dựa trên lịch sử mua sắm tương tự:`,
                `Theo kinh nghiệm thì đây là best choice cho bạn:`,
                `Top pick của mình là cái này đây, lý do:`
            ] : [
                `This one is top-rated by customers with similar interests:`,
                `My #1 recommendation based on your browsing:`,
                `I'd suggest this one first, here's why:`,
                `Top pick for you:`
            ];
            
            return [`${pick(intros)} ${pick(reasons)}`];
            
        case 'NO_RESULT':
            const apologies = isVi ? [
                `Oops... Mình chưa tìm thấy cái nào khớp 100% 😅`,
                `Hmm, search này hơi khó đấy. Chưa có kết quả chính xác`,
                `À ha, từ khóa này hơi tricky. Thử cách khác nhé:`,
                `Hic, chưa match được. Thử rộng hơn xem sao?`
            ] : [
                `Hmm... No exact matches yet 😅`,
                `Oops, couldn't find that specific item`,
                `Tricky search! Let's try differently:`,
                `No perfect match. How about broader terms?`
            ];
            
            return [pick(apologies)];
    }
};
```

### 5. Dynamic response timing
**File:** `useProductAdvisor.js`
```javascript
const processMessage = async (text) => {
    setIsProcessing(true);
    
    // Tính delay dựa vào độ phức tạp câu trả lời
    const baseDelay = 400;
    const charDelay = text.length * 10; // 10ms/ký tự
    const randomJitter = Math.random() * 300; // Random 0-300ms
    const totalDelay = Math.min(baseDelay + charDelay + randomJitter, 2000); // Max 2s
    
    await new Promise(r => setTimeout(r, totalDelay));
    // ... rest of logic
};
```

### 6. Conversation context memory
**File:** `useProductAdvisor.js` - Thêm state
```javascript
const [conversationContext, setConversationContext] = useState({
    lastIntent: null,
    lastProducts: [],
    lastQuery: '',
    turnCount: 0
});

// Khi xử lý message
const processMessage = async (text) => {
    const intent = analyzeIntent(text);
    
    // Xử lý FOLLOWUP intent
    if (intent === 'FOLLOWUP') {
        if (conversationContext.lastProducts.length > 0) {
            // Lấy sản phẩm tiếp theo từ kết quả trước
            const nextBatch = conversationContext.lastProducts.slice(3, 6);
            response.products = nextBatch;
            response.text = ["Đây nè, 3 cái tiếp theo:"];
        } else {
            response.text = ["Bạn muốn xem thêm gì nữa ạ?"];
        }
    }
    
    // Cập nhật context
    setConversationContext({
        lastIntent: intent,
        lastProducts: response.products,
        lastQuery: text,
        turnCount: conversationContext.turnCount + 1
    });
};
```

### 7. Smart quick replies
**File:** `useProductAdvisor.js`
```javascript
// Thay vì quick replies cố định
if (topProducts.length > 1) {
    // Tạo quick replies dựa vào sản phẩm
    const prod1 = topProducts[0];
    const prod2 = topProducts[1];
    
    response.quickReplies = isVi ? [
        `So sánh ${prod1.name.split(' ')[0]} vs ${prod2.name.split(' ')[0]}`,
        `Có màu gì?`,
        `Còn gì rẻ hơn?`,
        `Xem review`
    ] : [
        `Compare ${prod1.name} vs ${prod2.name}`,
        `Available colors?`,
        `Cheaper options?`,
        `See reviews`
    ];
}
```

### 8. Proactive suggestions
**File:** `useProductAdvisor.js` - Thêm vào `getInitialGreeting()`
```javascript
const getInitialGreeting = async () => {
    const behavior = await getBehaviorData();
    
    // Phân tích behavior để gợi ý proactive
    if (behavior.views) {
        const viewedCategories = {};
        Object.values(behavior.views).forEach(v => {
            const cat = v.details.cat;
            viewedCategories[cat] = (viewedCategories[cat] || 0) + v.count;
        });
        
        // Tìm category được xem nhiều nhất
        const topCat = Object.entries(viewedCategories)
            .sort((a, b) => b[1] - a[1])[0];
        
        if (topCat && topCat[1] >= 3) {
            return {
                text: isVi 
                    ? [`Chào bạn! 👋`, `Mình để ý bạn hay xem ${topCat[0]} nhỉ? Có tin mới về dòng này đây!`]
                    : [`Hey! 👋`, `I noticed you're into ${topCat[0]}. Got new arrivals!`],
                quickReplies: isVi 
                    ? [`Xem ${topCat[0]} mới`, `Tìm cái khác`]
                    : [`See new ${topCat[0]}`, `Find others`]
            };
        }
    }
    
    // Default greeting nếu không có insight
    return { /* existing greeting */ };
};
```

## 🟢 Priority 3 - Polish

### 9. Typing indicator realistic
**File:** Component sử dụng chatbox
```javascript
// Khi bot "đang gõ", hiển thị từng chữ một (typewriter effect)
const [displayedText, setDisplayedText] = useState('');
const fullText = botResponse.text[0];

useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
        if (index < fullText.length) {
            setDisplayedText(fullText.slice(0, index + 1));
            index++;
        } else {
            clearInterval(interval);
        }
    }, 30); // 30ms per character
    
    return () => clearInterval(interval);
}, [fullText]);
```

### 10. Emoji reactions
**File:** `advisor/templates.js`
```javascript
// Thêm emoji phù hợp với context
case 'SUGGESTION':
    let emoji = '🎯';
    if (data.products[0].category === 'shoes') emoji = '👟';
    if (data.products[0].salePercent > 20) emoji = '🔥';
    if (data.products[0].isNew) emoji = '✨';
    
    return [`${pick(intros)} ${emoji}`];
```

### 11. Handle typos và variations
```javascript
// Normalize common typos trước khi search
const normalizeQuery = (text) => {
    const typoMap = {
        'giay': 'giày',
        'quan': 'quần',
        'ao': 'áo',
        'runing': 'running',
        'shose': 'shoes'
    };
    
    let normalized = text.toLowerCase();
    Object.entries(typoMap).forEach(([typo, correct]) => {
        normalized = normalized.replace(new RegExp(typo, 'gi'), correct);
    });
    
    return normalized;
};
```

## 📊 Metrics để đo "tính người"

1. **Conversation length**: Trung bình bao nhiêu turn/session
2. **Engagement rate**: % users click quick replies
3. **Satisfaction**: Sau mỗi chat, hỏi 👍/👎
4. **Response diversity**: Đo entropy của responses (tránh lặp lại)

## 🛠️ Implementation order

1. ✅ Fix scoring bug (ngay lập tức)
2. ✅ Add error handling
3. ✅ Response variations
4. ✅ Better intent detection
5. Conversation context
6. Dynamic timing
7. Smart quick replies
8. Proactive suggestions
9. Typing effect
10. Emoji + Typo handling
