import { useState, useEffect, useCallback } from 'react';
import { useProductData } from './useProductData'; 
import { useTracker } from './useTracker';  
import { calculateScore, compareProductsLogic } from './advisor/scoring';
import { generateResponse } from './advisor/templates';
import { useLanguage } from '@/context/LanguageContext';

export const useProductAdvisor = () => {
    const { products, searchProducts, findProduct, isReady } = useProductData();
    const { userProfile, getBehaviorData, updateUserProfile, registerNotification } = useTracker();
    const { language } = useLanguage();

    const [isProcessing, setIsProcessing] = useState(false);
    const [conversationContext, setConversationContext] = useState({
        lastIntent: null,
        lastProducts: [],
        lastQuery: '',
        turnCount: 0
    });

    // Normalize common typos
    const normalizeQuery = (text) => {
        const typoMap = {
            'giay': 'giày',
            'quan': 'quần',
            'ao': 'áo',
            'runing': 'running',
            'shose': 'shoes',
            'shœs': 'shoes'
        };
        
        let normalized = text.toLowerCase();
        Object.entries(typoMap).forEach(([typo, correct]) => {
            normalized = normalized.replace(new RegExp(typo, 'gi'), correct);
        });
        
        return normalized;
    };

    // Kiểm tra sản phẩm out of stock
    const checkOutOfStockCategory = (text) => {
        const lower = text.toLowerCase();
        
        // Danh sách patterns cho các danh mục out of stock
        const outOfStockPatterns = {
            'watches': [/đồng hồ/i, /watch/i, /đeo tay/i],
            'jewelry': [/trang sức/i, /jewelry/i, /vòng/i, /dây chuyền/i],
            'accessories': [/phụ kiện/i, /accessory/i, /túi/i, /bag/i]
        };
        
        for (const [category, patterns] of Object.entries(outOfStockPatterns)) {
            if (patterns.some(p => p.test(lower))) {
                return category;
            }
        }
        
        return null;
    };

    // Hàm phân tích Intent - CẢI TIẾN
    const analyzeIntent = (text) => {
        const lower = normalizeQuery(text);
        
        // Kiểm tra out of stock trước
        const outOfStockCat = checkOutOfStockCategory(text);
        if (outOfStockCat) return 'OUT_OF_STOCK';
        
        // 1. Intent: Trending/Hot/Popular
        const trendingPatterns = [
            /hot|xu hướng|trend|popular|bán chạy|phổ biến/i,
            /(tuần|tháng|năm) này/i,
            /mọi người (đang |hay )?(mua|dùng|chọn)/i,
            /best seller|top/i,
            /sản phẩm hot/i,
            /hot items/i
        ];
        if (trendingPatterns.some(p => p.test(text))) return 'TRENDING';
        
        // 2. Intent: Recommendation (tư vấn chung)
        const recommendPatterns = [
            /gợi ý|recommend|suggest|tư vấn/i,
            /nên (mua|chọn|dùng) gì/i,
            /(có|cho) (mình|tôi) (xem|gì)/i,
            /giới thiệu/i,
            /random|bất kỳ|gì (cũng được|cũng dc)/i,
            /(vài|mấy) món (hay|tốt|đẹp)/i,
            /show me (something|anything)/i,
            /gợi ý cho (mình|tôi)/i,
            /tư vấn cho tôi/i,
            /advise me/i
        ];
        if (recommendPatterns.some(p => p.test(text))) return 'RECOMMENDATION';
        
        // 3. Intent: General browse (xem sản phẩm)
        const browsePatterns = [
            /^(xem|show|có) (gì|món|đồ|sản phẩm)/i,
            /^(muốn|cần) (mua|tìm|xem)/i,
            /cho (mình|tôi) xem/i,
            /xem thêm/i,
            /show more/i,
            /xem sản phẩm (khác|mới)/i,
            /see other products/i,
            /sản phẩm mới/i,
            /new arrivals/i
        ];
        if (browsePatterns.some(p => p.test(text))) return 'GENERAL_BROWSE';
        
        // 4. Intent: So sánh (mở rộng patterns)
        const comparePatterns = [
            /so sánh/i, /compare/i, / vs /i,
            /cái nào (tốt|ngon|đẹp|hơn)/i,
            /nên (chọn|mua) (cái gì|gì)/i,
            /(khác|hơn) nhau/i,
            /between .* and/i,
            /which (one|is)/i,
            /so sánh (với )?size khác/i,
            /compare (with )?sizes/i,
            /so sánh khác/i,
            /compare others/i
        ];
        if (comparePatterns.some(p => p.test(text))) return 'COMPARE';
        
        // 5. Hỏi về size/fit
        const fitPatterns = [
            /(có|hợp) size/i, 
            /vừa không/i, 
            /fit/i, 
            /sizing/i,
            /(ngực|eo|vai|dài tay|chiều (cao|dài))/i,
            /(cân nặng|nặng).*((mặc|mang|đi|dùng).*(được|vừa))/i,
            /(size|cỡ).*(nào|gì|mấy|bao nhiêu).*(vừa|phù hợp|có)/i,
            /(mình|tôi).*(cao|nặng|size).*((có|được) (mặc|mang|đi))/i,
            /.*có\s+(size|cỡ)\s+(\d+|[smxl]+)/i,  // "có size 78 không", "có size M không"
            /tư vấn\s+size/i,  // "tư vấn size cho tôi"
            /size\s+(advice|consultation|guide)/i,  // English
            /size khác/i,
            /other sizes/i,
            /tư vấn thêm/i,
            /more advice/i
        ];
        if (fitPatterns.some(p => p.test(text))) return 'ASK_SIZE';
        
        // 5.5. Xem bảng size (view size chart)
        const sizeChartPatterns = [
            /xem\s+(bảng|table|chart)\s*size/i,
            /size\s+(chart|table|guide)/i,
            /bảng\s+(đo|quy đổi|size)/i,
            /hướng dẫn\s+chọn\s+size/i,
            /xem bảng size chi tiết/i,
            /see size chart/i
        ];
        if (sizeChartPatterns.some(p => p.test(text))) return 'VIEW_SIZE_CHART';
        
        // 5.7. Sale/Discount products
        const salePatterns = [
            /\bsale\b/i,
            /giảm giá/i,
            /khuyến mãi/i,
            /đồ sale/i,
            /sale items/i,
            /sản phẩm sale/i,
            /xem sale/i,
            /see sale/i
        ];
        if (salePatterns.some(p => p.test(text))) return 'SEARCH'; // Will search for "sale"
        
        // 6. Hỏi về giá
        if (/giá|bao nhiêu|price|cost|how much/i.test(text)) return 'ASK_PRICE';
        
        // 7. Update profile (measurements)
        const profilePatterns = [
            /(nặng|weight)\s*(\d{2})/i,
            /(size|cỡ)\s*([smxl]{1,3})/i,
            /cao\s*(\d{3})\s*cm/i,
            /ngực\s*(\d{2,3})/i,
            /mình nặng/i,
            /i'm\s*\d+kg/i,
            /\d+cm tall/i,
            /cập nhật (cân nặng|chiều cao|size)/i,
            /update (weight|height|size)/i
        ];
        if (profilePatterns.some(p => p.test(text))) return 'UPDATE_PROFILE';
        
        // 8. Out of stock notification
        const notifyPatterns = [
            /đăng ký nhận thông báo/i,
            /notify me/i,
            /báo (cho )?(mình|tôi) khi/i,
            /thông báo khi có hàng/i
        ];
        if (notifyPatterns.some(p => p.test(text))) return 'OUT_OF_STOCK'; // Reuse handler
        
        // 9. Follow-up questions (cần context)
        if (/^(còn|thế|vậy|ngoài|khác|how about|what about|another|else)/i.test(text)) return 'FOLLOWUP';
        
        return 'SEARCH';
    };

    // Hàm xử lý chính (Public API)
    const processMessage = async (text) => {
        setIsProcessing(true);
        
        // Dynamic timing - tự nhiên hơn
        const baseDelay = 400;
        const charDelay = text.length * 10;
        const randomJitter = Math.random() * 300;
        const totalDelay = Math.min(baseDelay + charDelay + randomJitter, 2000);
        await new Promise(r => setTimeout(r, totalDelay));

        const intent = analyzeIntent(text);
        let response = {
            text: [],
            products: [],
            quickReplies: [],
            type: 'text'
        };

        // --- LOGIC XỬ LÝ THEO INTENT ---
        
        if (intent === 'TRENDING' || intent === 'RECOMMENDATION' || intent === 'GENERAL_BROWSE') {
            // Các intent này đều trả về danh sách sản phẩm
            try {
                // Lấy tất cả products và sort theo tiêu chí
                let allProducts = products.slice(0, 20); // Lấy 20 products đầu
                
                if (intent === 'TRENDING') {
                    // Ưu tiên: isNew, salePercent, giá cao (hot items thường đắt)
                    allProducts = allProducts.sort((a, b) => {
                        const scoreA = (a.isNew ? 100 : 0) + (a.salePercent || 0) * 2 + (a.price / 1000);
                        const scoreB = (b.isNew ? 100 : 0) + (b.salePercent || 0) * 2 + (b.price / 1000);
                        return scoreB - scoreA;
                    });
                } else if (intent === 'RECOMMENDATION') {
                    // Dựa vào user behavior
                    const behavior = await getBehaviorData();
                    // Simple scoring dựa trên category preference
                    allProducts = allProducts.sort((a, b) => {
                        const prefA = behavior.categoryPreference?.[a.category] || 0;
                        const prefB = behavior.categoryPreference?.[b.category] || 0;
                        return prefB - prefA;
                    });
                }
                // GENERAL_BROWSE: giữ nguyên order (mặc định)
                
                const topProducts = allProducts.slice(0, 3);
                
                response.products = topProducts;
                response.type = 'product_list';
                
                // Response text đa dạng theo intent
                if (intent === 'TRENDING') {
                    const responses = language === 'vi' ? [
                        `Này này! Mấy món này đang hot lắm đó 🔥`,
                        `Top trending tuần này nè! Mọi người đang mua nhiều lắm 🌟`,
                        `Đây nè, những item hot hit nhất hiện tại! ✨`
                    ] : [
                        `These are trending right now! 🔥`,
                        `Here are this week's hottest items! 🌟`,
                        `Check out the most popular products! ✨`
                    ];
                    response.text = [responses[Math.floor(Math.random() * responses.length)]];
                } else if (intent === 'RECOMMENDATION') {
                    const responses = language === 'vi' ? [
                        `Mình nghĩ mấy món này sẽ hợp với bạn đó! 😊`,
                        `Để mình gợi ý cho bạn nhé! Xem thử mấy món này 👇`,
                        `Dựa vào sở thích của bạn, mình recommend mấy món này nha! ⭐`
                    ] : [
                        `I think you'll like these! 😊`,
                        `Here are my recommendations for you! 👇`,
                        `Based on your taste, I suggest these! ⭐`
                    ];
                    response.text = [responses[Math.floor(Math.random() * responses.length)]];
                } else {
                    const responses = language === 'vi' ? [
                        `Đây nè, xem thử mấy món này nhé! ✨`,
                        `Check out mấy sản phẩm này, chất lắm! 💯`,
                        `Có đây này, bạn xem thử nhé! 👀`
                    ] : [
                        `Here you go, check these out! ✨`,
                        `These products are great! 💯`,
                        `Take a look at these! 👀`
                    ];
                    response.text = [responses[Math.floor(Math.random() * responses.length)]];
                }
                
                response.quickReplies = language === 'vi'
                    ? ["Xem thêm", "So sánh", "Sản phẩm sale"]
                    : ["Show more", "Compare", "Sale items"];
                    
                setConversationContext({
                    lastIntent: intent,
                    lastProducts: allProducts,
                    lastQuery: text,
                    turnCount: conversationContext.turnCount + 1
                });
            } catch (error) {
                response.text = language === 'vi'
                    ? ["Ối, có lỗi xíu. Bạn thử hỏi lại nhé! 😅"]
                    : ["Oops, something went wrong. Try again! 😅"];
            }
        }
        else if (intent === 'OUT_OF_STOCK') {
            // Xử lý sản phẩm chưa có hàng (như đồng hồ)
            const outOfStockCat = checkOutOfStockCategory(text);
            response.text = generateResponse('OUT_OF_STOCK', { 
                category: outOfStockCat,
                query: text 
            }, language);
            response.type = 'out_of_stock';
            response.quickReplies = language === 'vi'
                ? ["Đăng ký nhận thông báo", "Xem sản phẩm khác", "Tư vấn cho tôi"]
                : ["Notify me", "See other products", "Advise me"];
            
            // Lưu vào context để tracking
            setConversationContext({
                lastIntent: intent,
                lastProducts: [],
                lastQuery: text,
                turnCount: conversationContext.turnCount + 1,
                requestedCategory: outOfStockCat
            });
        }
        else if (intent === 'FOLLOWUP') {
            // Xử lý câu hỏi tiếp theo dựa vào context
            if (conversationContext.lastProducts.length > 3) {
                const nextBatch = conversationContext.lastProducts.slice(3, 6);
                if (nextBatch.length > 0) {
                    response.products = nextBatch;
                    response.type = 'product_list';
                    response.text = language === 'vi' 
                        ? ["Đây nè, 3 cái tiếp theo đây:"] 
                        : ["Here are 3 more options:"];
                    response.quickReplies = language === 'vi'
                        ? ["Còn nữa không?", "Quay lại"]
                        : ["More?", "Go back"];
                } else {
                    response.text = language === 'vi'
                        ? ["Hết rồi bạn ơi. Thử tìm từ khóa khác nhé!"]
                        : ["That's all I got. Try another search!"];
                }
            } else {
                response.text = language === 'vi'
                    ? ["Bạn muốn xem thêm gì nữa ạ?"]
                    : ["What else would you like to see?"];
                response.quickReplies = language === 'vi'
                    ? ["Giày chạy bộ", "Sale", "Sản phẩm mới"]
                    : ["Running shoes", "Sale", "New arrivals"];
            }
        }
        else if (intent === 'ASK_SIZE') {
            // Trích xuất thông tin từ query
            const weightMatch = text.match(/(\d{2,3})\s*(kg|kí|ký)/i);
            const heightMatch = text.match(/(\d{3})\s*(cm|m)/i);
            const chestMatch = text.match(/(ngực|chest)\s*(\d{2,3})/i);
            const waistMatch = text.match(/(eo|waist)\s*(\d{2,3})/i);
            const askingSizeMatch = text.match(/có\s+(size|cỡ)\s+(\d+|[smxl]+)/i); // "có size 78 không"
            
            // Detect category từ query
            const lowerText = text.toLowerCase();
            let categoryFilter = null;
            if (/áo|shirt|jacket|top/i.test(lowerText)) categoryFilter = 'áo';
            else if (/quần|pant|short/i.test(lowerText)) categoryFilter = 'quần';
            else if (/giày|shoe/i.test(lowerText)) categoryFilter = 'giày';
            
            // Tìm sản phẩm được nhắc đến (nếu có)
            let mentionedProduct = null;
            const keywords = text.toLowerCase().split(' ').filter(w => w.length > 3);
            
            // Tìm trong lastProducts hoặc search
            if (conversationContext.lastProducts.length > 0) {
                mentionedProduct = conversationContext.lastProducts[0];
            } else {
                // Thử search với keywords để tìm sản phẩm
                let productQuery = text.replace(/có\s+(size|cỡ).*$/i, '').trim();
                
                // Nếu có category filter, thêm vào query
                if (categoryFilter) {
                    productQuery = categoryFilter; // Search theo category thôi
                }
                
                const searchResults = searchProducts(productQuery, 3); // Lấy 3 kết quả
                if (searchResults.length > 0) {
                    // Filter theo category nếu có
                    let filtered = searchResults;
                    if (categoryFilter) {
                        filtered = searchResults.filter(r => {
                            const prod = r.item;
                            const cat = (prod.category || '').toLowerCase();
                            const name = (prod.name || '').toLowerCase();
                            return cat.includes(categoryFilter) || name.includes(categoryFilter);
                        });
                    }
                    
                    if (filtered.length > 0) {
                        mentionedProduct = filtered[0].item;
                    } else if (searchResults.length > 0) {
                        mentionedProduct = searchResults[0].item;
                    }
                }
            }
            
            // Xử lý câu hỏi "có size X không"
            if (askingSizeMatch) {
                const askedSize = askingSizeMatch[2];
                
                if (mentionedProduct) {
                    const responses = language === 'vi' ? [
                        `À, ${mentionedProduct.name} có nhiều size lắm bạn ơi! Size ${askedSize} thường có sẵn nha 😊`,
                        `Dạ có! ${mentionedProduct.name} có size ${askedSize} luôn. Bạn đặt hàng được nha! 👍`,
                        `Có nè! Size ${askedSize} vẫn còn hàng. Bạn cứ yên tâm chọn nhé! ✨`
                    ] : [
                        `Yes! ${mentionedProduct.name} comes in size ${askedSize}! 😊`,
                        `Sure! Size ${askedSize} is available. Order now! 👍`,
                        `Yes, we have size ${askedSize} in stock! ✨`
                    ];
                    
                    response.text = [responses[Math.floor(Math.random() * responses.length)]];
                    response.products = [mentionedProduct];
                    response.quickReplies = language === 'vi'
                        ? ["Xem bảng size", "Size khác", "Thêm vào giỏ"]
                        : ["Size chart", "Other sizes", "Add to cart"];
                } else {
                    const responses = language === 'vi' ? [
                        `Ô, mình chưa rõ bạn hỏi sản phẩm nào nè 🤔 Bạn cho mình biết tên sản phẩm được không?`,
                        `À, bạn hỏi size ${askedSize} của sản phẩm nào ạ? Bạn nói rõ tên giúp mình nhé!`,
                        `Để mình check size cho bạn, bạn đang hỏi về sản phẩm nào vậy? 😊`
                    ] : [
                        `Which product are you asking about? 🤔`,
                        `What's the product name for size ${askedSize}?`,
                        `Let me check! Which item do you mean? 😊`
                    ];
                    
                    response.text = [responses[Math.floor(Math.random() * responses.length)]];
                    response.quickReplies = language === 'vi'
                        ? ["Giày chạy bộ", "Áo thể thao", "Xem sản phẩm hot"]
                        : ["Running shoes", "Sportswear", "Hot items"];
                }
            }
            // Tư vấn size dựa trên thông tin cơ thể
            else if (weightMatch || heightMatch || chestMatch || waistMatch) {
                const weight = weightMatch ? parseInt(weightMatch[1]) : null;
                const height = heightMatch ? parseInt(heightMatch[1]) : null;
                const chest = chestMatch ? parseInt(chestMatch[2]) : null;
                const waist = waistMatch ? parseInt(waistMatch[2]) : null;
                
                // Logic tư vấn size đơn giản
                let recommendedSize = 'M';
                if (weight) {
                    if (weight < 55) recommendedSize = 'S';
                    else if (weight < 70) recommendedSize = 'M';
                    else if (weight < 85) recommendedSize = 'L';
                    else recommendedSize = 'XL';
                }
                
                const responses = language === 'vi' ? [
                    `Với ${weight ? `cân nặng ${weight}kg` : ''}${height ? `, cao ${height}cm` : ''}${chest ? `, ngực ${chest}cm` : ''}, mình nghĩ size **${recommendedSize}** sẽ vừa vặn! 👕`,
                    `À, ${weight ? `${weight}kg` : ''} thì nên chọn size **${recommendedSize}** nha! Vừa đủ rộng rãi thoải mái 😊`,
                    `Dựa vào thông số của bạn, mình recommend size **${recommendedSize}** luôn! Fit chuẩn lắm! 💯`
                ] : [
                    `With ${weight ? `${weight}kg` : ''}${height ? `, ${height}cm tall` : ''}, I'd recommend size **${recommendedSize}**! 👕`,
                    `At ${weight ? `${weight}kg` : ''}, size **${recommendedSize}** should fit perfectly! 😊`,
                    `Based on your measurements, go for size **${recommendedSize}**! 💯`
                ];
                
                response.text = [responses[Math.floor(Math.random() * responses.length)]];
                
                // Gợi ý sản phẩm theo category
                if (categoryFilter) {
                    // Search với query rộng hơn
                    let searchQuery = categoryFilter;
                    if (categoryFilter === 'áo') searchQuery = 'áo jacket shirt top';
                    else if (categoryFilter === 'quần') searchQuery = 'quần pant short';
                    else if (categoryFilter === 'giày') searchQuery = 'giày shoe';
                    
                    const catResults = searchProducts(searchQuery, 5);
                    if (catResults.length > 0) {
                        // Filter strict theo category
                        let filtered = catResults.filter(r => {
                            const prod = r.item;
                            const cat = (prod.category || '').toLowerCase();
                            const name = (prod.name || '').toLowerCase();
                            return cat.includes(categoryFilter) || name.includes(categoryFilter);
                        });
                        
                        // Nếu filter quá strict thì lấy all results
                        if (filtered.length === 0) filtered = catResults;
                        
                        response.products = filtered.slice(0, 3).map(r => r.item);
                        response.text.push(language === 'vi' 
                            ? `Mình gợi ý mấy ${categoryFilter} này, size ${recommendedSize} nha!`
                            : `Here are some ${categoryFilter}, go for size ${recommendedSize}!`
                        );
                    } else {
                        // Fallback nếu search thất bại
                        response.text.push(language === 'vi' 
                            ? `Chưa tìm được chính xác lắm nha 🤷 Nhưng mấy món này cũng hay đó, xem thử!`
                            : `Couldn't find exact matches 🤷 But these are pretty good, check them out!`
                        );
                        // Show random products
                        const randomResults = searchProducts('', 3);
                        if (randomResults.length > 0) {
                            response.products = randomResults.slice(0, 3).map(r => r.item);
                        }
                    }
                } else if (mentionedProduct) {
                    response.products = [mentionedProduct];
                    response.text.push(language === 'vi' 
                        ? `Đây là sản phẩm bạn hỏi nè, chọn size ${recommendedSize} nha!`
                        : `Here's the product, choose size ${recommendedSize}!`
                    );
                }
                
                response.quickReplies = language === 'vi'
                    ? ["Xem bảng size chi tiết", "So sánh với size khác", "Tư vấn thêm"]
                    : ["See size chart", "Compare sizes", "More advice"];
                    
                // Lưu products vào context để VIEW_SIZE_CHART dùng
                if (response.products && response.products.length > 0) {
                    setConversationContext({
                        ...conversationContext,
                        lastProducts: response.products,
                        lastIntent: 'ASK_SIZE',
                        lastQuery: text
                    });
                }
                
                // Lưu vào profile
                if (weight) await updateUserProfile('weight', weight);
                if (height) await updateUserProfile('height', height);
                
            } else {
                // Chưa có measurement trong câu hỏi - check user profile
                const profile = await getUserProfile();
                
                if (profile.weight || profile.height) {
                    // Có profile rồi → recommend based on saved data
                    const weight = profile.weight || 65;
                    const height = profile.height || 170;
                    
                    let recommendedSize = 'M';
                    if (weight < 55) recommendedSize = 'S';
                    else if (weight < 70) recommendedSize = 'M';
                    else if (weight < 85) recommendedSize = 'L';
                    else recommendedSize = 'XL';
                    
                    const responses = language === 'vi' ? [
                        `Dựa vào thông tin của bạn (${weight}kg${height ? `, ${height}cm` : ''}), mình recommend size **${recommendedSize}** nha! 👕`,
                        `Với ${weight}kg${height ? ` và ${height}cm` : ''}, size **${recommendedSize}** sẽ fit chuẩn đấy! 😊`,
                        `À, theo profile bạn thì size **${recommendedSize}** là hợp lý nhất! 💯`
                    ] : [
                        `Based on your profile (${weight}kg${height ? `, ${height}cm` : ''}), I'd recommend size **${recommendedSize}**! 👕`,
                        `At ${weight}kg${height ? ` and ${height}cm` : ''}, size **${recommendedSize}** should fit perfectly! 😊`,
                        `According to your profile, size **${recommendedSize}** is ideal! 💯`
                    ];
                    
                    response.text = [responses[Math.floor(Math.random() * responses.length)]];
                    
                    // Show products từ context nếu có
                    if (conversationContext.lastProducts && conversationContext.lastProducts.length > 0) {
                        response.products = conversationContext.lastProducts.slice(0, 3);
                        response.text.push(language === 'vi' 
                            ? `Đây là mấy món vừa rồi, chọn size ${recommendedSize} nha!`
                            : `Here are the items from before, go for size ${recommendedSize}!`
                        );
                    }
                    
                    response.quickReplies = language === 'vi'
                        ? ["Xem bảng size chi tiết", "Cập nhật cân nặng", "Xem sản phẩm khác"]
                        : ["See size chart", "Update weight", "See other products"];
                } else {
                    // Chưa có đủ thông tin
                    response.text = generateResponse('ASK_SIZE_WEIGHT', {}, language);
                    response.quickReplies = language === 'vi'
                        ? ["Mình nặng 65kg", "Cao 170cm", "Ngực 90cm"]
                        : ["I'm 65kg", "170cm tall", "90cm chest"];
                }
            }
        }
        else if (intent === 'VIEW_SIZE_CHART') {
            // Hiển thị bảng size chart
            // Lấy sản phẩm từ context hoặc lastProducts
            let productForChart = null;
            
            if (conversationContext.lastProducts && conversationContext.lastProducts.length > 0) {
                productForChart = conversationContext.lastProducts[0];
            }
            
            if (productForChart) {
                // Generic size chart (tạm thời - sau này có thể lấy từ product.sizeChart)
                const sizeChartText = language === 'vi' 
                    ? `📏 **Bảng size cho ${productForChart.name}:**\n\n` +
                      `**Size S:** Cân nặng 45-55kg, Ngực 80-88cm, Eo 60-68cm\n` +
                      `**Size M:** Cân nặng 55-70kg, Ngực 88-96cm, Eo 68-76cm\n` +
                      `**Size L:** Cân nặng 70-85kg, Ngực 96-104cm, Eo 76-84cm\n` +
                      `**Size XL:** Cân nặng 85-100kg, Ngực 104-112cm, Eo 84-92cm\n\n` +
                      `💡 **Lưu ý:** Nếu ở giữa 2 size, chọn size lớn hơn cho thoải mái!`
                    : `📏 **Size Chart for ${productForChart.name_en || productForChart.name}:**\n\n` +
                      `**Size S:** Weight 45-55kg, Chest 80-88cm, Waist 60-68cm\n` +
                      `**Size M:** Weight 55-70kg, Chest 88-96cm, Waist 68-76cm\n` +
                      `**Size L:** Weight 70-85kg, Chest 96-104cm, Waist 76-84cm\n` +
                      `**Size XL:** Weight 85-100kg, Chest 104-112cm, Waist 84-92cm\n\n` +
                      `💡 **Tip:** Between sizes? Go larger for comfort!`;
                
                response.text = [sizeChartText];
                response.products = [productForChart];
                response.quickReplies = language === 'vi'
                    ? ["Tư vấn size cho tôi", "Thêm vào giỏ", "Xem sản phẩm khác"]
                    : ["Size advice", "Add to cart", "See other products"];
            } else {
                // Không có sản phẩm trong context
                response.text = language === 'vi'
                    ? ["Bạn muốn xem bảng size của sản phẩm nào vậy? 🤔 Hãy cho mình biết tên sản phẩm hoặc chọn sản phẩm từ danh sách nhé!"]
                    : ["Which product's size chart would you like to see? 🤔 Please tell me the product name!"];
                response.quickReplies = language === 'vi'
                    ? ["Giày chạy bộ", "Áo thể thao", "Quần running"]
                    : ["Running shoes", "Sportswear", "Running pants"];
            }
        }
        else if (intent === 'UPDATE_PROFILE') {
            // Trích xuất size/weight (đơn giản)
            const sizeMatch = text.match(/(size|cỡ)\s*([smxl]{1,3}|[0-9]{2})/i);
            const weightMatch = text.match(/(\d{2})\s*(kg|cân)/i);

            if (sizeMatch) {
                await updateUserProfile('size', sizeMatch[2].toUpperCase());
                response.text = language === 'vi' 
                    ? [`Đã nhớ! Bạn mặc size ${sizeMatch[2].toUpperCase()}. Mình sẽ ưu tiên lọc sản phẩm theo size này.`]
                    : [`Got it! Your size is ${sizeMatch[2].toUpperCase()}. I'll prioritize products with this size.`];
            } else if (weightMatch) {
                await updateUserProfile('weight', weightMatch[1]);
                response.text = language === 'vi'
                    ? [`OK, mình đã lưu cân nặng ${weightMatch[1]}kg để tư vấn giày/phụ kiện phù hợp.`]
                    : [`OK, noted weight ${weightMatch[1]}kg for better gear recommendations.`];
            }
            
            // Sau khi update profile, gợi ý lại
            response.quickReplies = language === 'vi' ? ["Gợi ý cho mình", "Xóa thông tin"] : ["Suggest for me", "Clear info"];
        } 
        else if (intent === 'COMPARE') {
            // Thử extract 2 sản phẩm từ query trước
            let productsToCompare = [];
            
            // Pattern: "so sánh A và B" hoặc "A vs B"
            const comparisonPatterns = [
                /so sánh\s+(.+?)\s+(và|vs|với)\s+(.+)/i,
                /(.+?)\s+(vs|và|với)\s+(.+)/i
            ];
            
            let match = null;
            for (const pattern of comparisonPatterns) {
                match = text.match(pattern);
                if (match) break;
            }
            
            if (match) {
                // Extract 2 product names
                const productName1 = match[1].trim();
                const productName2 = match[3].trim();
                
                // Search for both products
                const results1 = searchProducts(productName1, 1);
                const results2 = searchProducts(productName2, 1);
                
                if (results1.length > 0 && results2.length > 0) {
                    productsToCompare = [results1[0].item, results2[0].item];
                }
            }
            
            // Fallback: Lấy từ conversationContext
            if (productsToCompare.length < 2 && conversationContext.lastProducts && conversationContext.lastProducts.length >= 2) {
                productsToCompare = conversationContext.lastProducts.slice(0, 2);
            }
            
            // Fallback cuối: Lấy từ behavior lastViewed
            if (productsToCompare.length < 2) {
                const behavior = await getBehaviorData();
                const lastTwo = behavior.lastViewed?.slice(0, 2) || [];
                
                if (lastTwo.length >= 2) {
                    const prodA = findProduct(lastTwo[0]);
                    const prodB = findProduct(lastTwo[1]);
                    if (prodA && prodB) {
                        productsToCompare = [prodA, prodB];
                    }
                }
            }
            
            if (productsToCompare.length >= 2) {
                const prodA = productsToCompare[0];
                const prodB = productsToCompare[1];
                
                const comparison = compareProductsLogic(prodA, prodB);
                response.text = generateResponse('COMPARISON', { comparison, prodA, prodB }, language);
                response.type = 'comparison';
                response.products = [prodA, prodB];
                response.quickReplies = language === 'vi'
                    ? ["Xem chi tiết sản phẩm 1", "Xem chi tiết sản phẩm 2", "So sánh khác"]
                    : ["View product 1", "View product 2", "Compare others"];
            } else {
                const helpTexts = language === 'vi' ? [
                    `Ơ, mình chưa tìm thấy 2 sản phẩm để so sánh nè 😅 Bạn thử rõ hơn nhé!`,
                    `Hmm, không tìm thấy đủ sản phẩm. Bạn thử search từng cái trước rồi so sánh sau! 🔍`,
                    `À, mình chưa hiểu rõ 2 sản phẩm nào. Hãy tìm kiếm trước nhé! 👀`
                ] : [
                    `Oops, couldn't find 2 products to compare! 😅 Be more specific!`,
                    `Hmm, not enough products found. Try searching first! 🔍`,
                    `Can't identify the 2 products. Please search first! 👀`
                ];
                
                response.text = [helpTexts[Math.floor(Math.random() * helpTexts.length)]];
                response.quickReplies = language === 'vi'
                    ? ["Tìm giày chạy bộ", "Sản phẩm hot", "Xem sale"]
                    : ["Find running shoes", "Hot items", "See sale"];
            }
        }
        else {
            // --- DEFAULT: SEARCH & SUGGEST ---
            try {
                // 1. Search Fuse
                const rawResults = searchProducts(text, 10);
                
                // 1.5. Check nếu query về out-of-stock category nhưng có ít kết quả
                const outOfStockCat = checkOutOfStockCategory(text);
                if (outOfStockCat && rawResults.length < 3) {
                    response.text = generateResponse('OUT_OF_STOCK_PARTIAL', { 
                        category: outOfStockCat,
                        query: text,
                        foundCount: rawResults.length
                    }, language);
                    response.type = 'out_of_stock';
                    response.quickReplies = language === 'vi'
                        ? ["Đăng ký nhận thông báo", "Xem gợi ý khác"]
                        : ["Notify me", "See alternatives"];
                } else if (rawResults.length === 0) {
                    // FALLBACK THÔNG MINH: Thay vì báo lỗi, đề xuất random products
                    
                    const randomProducts = products
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 3);
                    
                    if (randomProducts.length > 0) {
                        response.products = randomProducts;
                        response.type = 'product_list';
                        
                        const fallbackTexts = language === 'vi' ? [
                            `Hmm, search này hơi khó đấy 🤔 Để mình show mấy món hay cho bạn xem nhé!`,
                            `Ối, mình chưa hiểu lắm 😅 Nhưng thôi, xem thử mấy món này có ưng không!`,
                            `À, có vẻ mình cần rõ hơn tí 😄 Để mình gợi ý random vài món cho bạn!`,
                            `Chưa tìm được chính xác lắm nha 🙈 Nhưng mấy món này cũng hay đó, xem thử!`
                        ] : [
                            `Hmm, that's tricky 🤔 Let me show you some cool stuff!`,
                            `Oops, not quite sure 😅 But check these out!`,
                            `Ah, need more details 😄 Here are some random picks!`,
                            `Can't find exact match 🙈 But these are nice too!`
                        ];
                        
                        response.text = [fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)]];
                        response.quickReplies = language === 'vi' 
                            ? ["Sản phẩm hot", "Sale", "Gợi ý cho tôi", "Xem thêm"]
                            : ["Hot items", "Sale", "Recommend", "Show more"];
                    } else {
                        // Thực sự không có products nào
                        response.text = generateResponse('NO_RESULT', {}, language);
                        response.quickReplies = language === 'vi' 
                            ? ["Giày chạy bộ", "Áo thể thao", "Sale"]
                            : ["Running shoes", "Sportswear", "Sale"];
                    }
                } else {
                    // 2. Lấy data hành vi để chấm điểm
                    const behavior = await getBehaviorData();

                    // 3. Scoring & Ranking - FIX: Truyền đúng fuse score
                    const rankedResults = rawResults.map(result => {
                        const product = result.item || result;
                        const fuseScore = result.score !== undefined ? result.score : 1;
                        const score = calculateScore(product, { score: fuseScore }, userProfile, behavior);
                        return { ...product, score, fuseScore };
                    }).sort((a, b) => b.score - a.score);

                    // Lấy top 3 hiển thị, nhưng lưu top 10 vào context
                    const topProducts = rankedResults.slice(0, 3);
                    
                    // 4. Generate lời thoại với variations
                    response.products = topProducts;
                    response.type = 'product_list';
                    response.text = generateResponse('SUGGESTION', { 
                        products: topProducts, 
                        userProfile,
                        count: topProducts.length
                    }, language);

                    // 5. Smart Follow-up questions - Dynamic
                    if (topProducts.length > 1) {
                        const prod1 = topProducts[0].name.split(' ').slice(0, 2).join(' ');
                        const prod2 = topProducts[1].name.split(' ').slice(0, 2).join(' ');
                        
                        response.quickReplies = language === 'vi'
                            ? [`So sánh ${prod1} vs ${prod2}`, "Còn gì rẻ hơn?", "Xem review"]
                            : [`Compare ${prod1} vs ${prod2}`, "Cheaper options?", "See reviews"];
                    }
                    
                    // Lưu vào context để xử lý FOLLOWUP
                    setConversationContext({
                        lastIntent: intent,
                        lastProducts: rankedResults,
                        lastQuery: text,
                        turnCount: conversationContext.turnCount + 1
                    });
                }
            } catch (error) {
                response.text = language === 'vi'
                    ? ["Ối, có lỗi xảy ra rồi. Bạn thử lại nhé!"]
                    : ["Oops, something went wrong. Please try again!"];
            }
        }

        setIsProcessing(false);
        return response;
    };

    // Hàm khởi tạo (Lời chào) - Đơn giản, thân thiện
    const getInitialGreeting = async () => {
        try {
            const behavior = await getBehaviorData();
            
            // Returning User (đã xem sản phẩm) - Chỉ chào, không gợi ý sản phẩm ngay
            if (behavior.lastViewed && behavior.lastViewed.length > 0) {
                return {
                    text: language === 'vi' 
                        ? ["Chào bạn! Lại đây rồi nhỉ 😊", "Hôm nay cần mình tư vấn gì không?"]
                        : ["Hey there! Welcome back 😊", "What can I help you find today?"],
                    type: 'text',
                    quickReplies: language === 'vi' 
                        ? ["Tư vấn size giày", "Sản phẩm hot", "Đồ sale"]
                        : ["Size guide", "Hot products", "Sale items"]
                };
            }
        } catch (error) {
            console.warn('Greeting error:', error);
        }
        
        // New User - Chào hỏi + Hỏi nhu cầu
        return {
            text: language === 'vi' 
                ? ["Chào bạn! Mình là trợ lý ảo IMSports 👋", "Bạn đang cần tìm gì? Giày, quần áo hay phụ kiện thể thao?"]
                : ["Hello! I'm IMSports AI assistant 👋", "What are you looking for? Shoes, apparel or accessories?"],
            type: 'text',
            quickReplies: language === 'vi' 
                ? ["Giày chạy bộ", "Quần áo thể thao", "Tư vấn size", "Xem sale"]
                : ["Running shoes", "Sportswear", "Size guide", "Sale items"]
        };
    };

    return {
        processMessage,
        getInitialGreeting,
        isProcessing,
        isReady,
        registerNotification // Export để UI component có thể đăng ký notify
    };
};