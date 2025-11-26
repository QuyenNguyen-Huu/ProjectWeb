// Các mẫu câu ngẫu nhiên để tránh nhàm chán
const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateResponse = (type, data, language = 'vi') => {
    const isVi = language === 'vi';

    switch (type) {
        case 'GREETING_RETURNING':
            // Khi khách quay lại - THÊM VARIATIONS
            const lastSeenName = data.lastViewedProduct ? data.lastViewedProduct.name : (isVi ? 'sản phẩm trước' : 'products');
            const greetings = isVi ? [
                [`Chào mừng bạn quay lại! 👋`, `Lần trước bạn đang xem ${lastSeenName}. Muốn tìm hiểu thêm không?`],
                [`Hey, lại là bạn! 😊`, `Bạn đã xem ${lastSeenName} rồi đúng không? Cần tư vấn thêm không?`],
                [`Xin chào! Vui vì bạn quay lại 🎉`, `Hồi trước bạn quan tâm đến ${lastSeenName}. Tìm thêm info nhé?`]
            ] : [
                [`Welcome back! 👋`, `You were checking out ${lastSeenName}. Need more info?`],
                [`Hey there again! 😊`, `Last time you viewed ${lastSeenName}. Want details?`],
                [`Good to see you back! 🎉`, `You showed interest in ${lastSeenName}. Learn more?`]
            ];
            return randomPick(greetings);

        case 'SUGGESTION':
            // Khi có kết quả tìm kiếm - THÊM VARIATIONS & EMOJI
            const product = data.products[0];
            const count = data.count || data.products.length;
            
            // Chọn emoji phù hợp với context
            let emoji = '🎯';
            if (product.category?.includes('shoes') || product.category?.includes('giày')) emoji = '👟';
            if (product.salePercent && product.salePercent > 20) emoji = '🔥';
            if (product.isNew) emoji = '✨';
            
            const intros = isVi ? [
                `Ô, mình tìm thấy ${count} món phù hợp đây! ${emoji}`,
                `Để xem nào... Có ${count} sản phẩm match với bạn nè ${emoji}`,
                `Được rồi! Mình gợi ý ${count} cái này xem sao ${emoji}`,
                `Perfect! ${count} lựa chọn này hợp lý đấy ${emoji}`
            ] : [
                `Oh, I found ${count} matching items! ${emoji}`,
                `Let's see... ${count} products match your needs ${emoji}`,
                `Great! Here are ${count} recommendations ${emoji}`,
                `Perfect! These ${count} options look good ${emoji}`
            ];
            
            let intro = randomPick(intros);
            
            if (data.userProfile?.size) {
                intro += isVi 
                    ? ` (Đã lọc theo size ${data.userProfile.size} ✅)` 
                    : ` (Filtered by size ${data.userProfile.size} ✅)`;
            }

            // Generate lý do cụ thể dựa trên product features
            const generateReason = (product) => {
                const reasons = [];
                
                if (product.salePercent && product.salePercent > 15) {
                    reasons.push(isVi ? `đang giảm ${product.salePercent}%` : `${product.salePercent}% off`);
                }
                if (product.isNew) {
                    reasons.push(isVi ? 'mới về' : 'newly arrived');
                }
                if (product.brand) {
                    reasons.push(isVi ? `brand ${product.brand} uy tín` : `trusted ${product.brand} brand`);
                }
                if (product.price < 3000000) {
                    reasons.push(isVi ? 'giá tốt' : 'great price');
                }
                
                if (reasons.length === 0) {
                    return isVi ? 'chất lượng tốt, phù hợp với bạn' : 'great quality, suits you well';
                }
                
                return reasons.slice(0, 2).join(isVi ? ', ' : ', ');
            };

            const reason = generateReason(product);
            
            const reasonTexts = isVi ? [
                `Cái này top 1 vì ${reason}`,
                `Mình recommend cái này nhất, ${reason}`,
                `Theo kinh nghiệm thì đây là best choice (${reason})`,
                `Top pick của mình là cái này - ${reason}`
            ] : [
                `Top-rated because ${reason}`,
                `My #1 recommendation - ${reason}`,
                `Best choice (${reason})`,
                `This is my top pick - ${reason}`
            ];

            return [`${intro} ${randomPick(reasonTexts)}`];

        case 'COMPARISON':
            // Kết quả so sánh
            const { diff, common } = data.comparison;
            let compText = isVi 
                ? `Dưới đây là so sánh nhanh giữa 2 sản phẩm:\n` 
                : `Here is a quick comparison:\n`;

            diff.forEach(d => {
                compText += `- ${isVi ? d.text_vi : d.text_en}\n`;
            });

            if (common.length > 0) {
                compText += isVi ? `\nĐiểm chung: ` : `\nCommonalities: `;
                compText += common.map(c => isVi ? c.vi : c.en).join(', ');
            }

            return [compText];

        case 'NO_RESULT':
            const apologies = isVi ? [
                `Oops... Mình chưa tìm thấy cái nào khớp 100% 😅`,
                `Hmm, search này hơi khó đấy. Chưa có kết quả chính xác.`,
                `À ha, từ khóa này hơi tricky. Thử cách khác nhé:`,
                `Hic, chưa match được. Thử rộng hơn xem sao? 🤔`
            ] : [
                `Hmm... No exact matches yet 😅`,
                `Oops, couldn't find that specific item.`,
                `Tricky search! Let's try differently:`,
                `No perfect match. How about broader terms? 🤔`
            ];
            const suggestions = isVi ?
                `Bạn thử tìm rộng hơn như "Giày chạy bộ" hoặc "Áo thể thao" nhé!` :
                `Try broader terms like "Running shoes" or "Sportswear"!`;
            return [randomPick(apologies), suggestions];
        
        case 'ASK_SIZE_WEIGHT':
             const askVariations = isVi ? [
                [`Để mình tư vấn chuẩn hơn, bạn có thể cho biết chiều cao, cân nặng hoặc size thường mặc không?`, `Ví dụ: "Mình nặng 70kg" hoặc "Size M" nhé!`],
                [`Nếu bạn chia sẻ thông tin size/cân nặng, mình sẽ gợi ý chính xác hơn đấy!`, `Gõ kiểu "Size L" hoặc "65kg" là được.`],
                [`Cho mình biết size hoặc cân nặng để tư vấn đúng hơn nhé? 📏`, `VD: "Mình size S" hoặc "Nặng 60kg"`]
            ] : [
                [`For better advice, could you share your height, weight, or usual size?`, `e.g., "70kg" or "Size M"`],
                [`If you tell me your size/weight, I can suggest more accurately!`, `Just type "Size L" or "65kg"`],
                [`Mind sharing your size or weight for better recommendations? 📏`, `e.g., "Size S" or "60kg"`]
            ];
            return randomPick(askVariations);
        
        case 'OUT_OF_STOCK':
            // Khi sản phẩm chưa có hàng (như đồng hồ)
            const categoryName = isVi ? data.category.vi : data.category.en;
            const outOfStockResponses = isVi ? [
                [`À, ${categoryName} hiện tại shop chưa nhập về nè! 😅`, `Nhưng đừng lo, mình đang chuẩn bị nhập hàng sớm thôi. Bạn muốn mình báo khi có không?`],
                [`Ối, ${categoryName} đang hết hàng rồi bạn ơi! 🙈`, `Shop đang order thêm về, dự kiến tuần sau có hàng. Để mình ghi tên bạn vào danh sách nhé?`],
                [`Hmm, ${categoryName} đang out of stock rồi! 😔`, `Nhưng mình có kế hoạch nhập về sớm đấy. Bạn có muốn đăng ký nhận thông báo khi có hàng không?`]
            ] : [
                [`Oh, ${categoryName} are currently out of stock! 😅`, `But don't worry, we're restocking soon. Want me to notify you?`],
                [`Oops, ${categoryName} sold out! 🙈`, `We're ordering more, expected next week. Should I add you to the waitlist?`],
                [`Hmm, ${categoryName} out of stock right now! 😔`, `But we plan to restock soon. Want to be notified when available?`]
            ];
            return randomPick(outOfStockResponses);
        
        case 'OUT_OF_STOCK_PARTIAL':
            // Khi tìm được ít kết quả về category out-of-stock
            const catName = isVi ? data.category.vi : data.category.en;
            const partialResponses = isVi ? [
                [`Mình tìm được ${data.foundCount} sản phẩm liên quan đến ${catName}, nhưng chưa đủ đa dạng lắm! 😅`, `Shop đang chuẩn bị nhập thêm nhiều mẫu mới. Bạn muốn đăng ký nhận thông báo không?`],
                [`Có ${data.foundCount} món gần với ${catName} bạn tìm, nhưng chưa phải chính xác! 🤔`, `Dạo này shop đang update thêm. Để mình báo bạn khi có hàng mới nhé?`]
            ] : [
                [`Found ${data.foundCount} items related to ${catName}, but selection is limited! 😅`, `We're expanding soon. Want to be notified?`],
                [`Got ${data.foundCount} close matches to ${catName}, but not exact! 🤔`, `We're updating inventory. Should I notify you when new stock arrives?`]
            ];
            return randomPick(partialResponses);
        
        case 'NOTIFY_REGISTERED':
            // Khi user đăng ký nhận thông báo
            const registerResponses = isVi ? [
                [`Xong rồi! ✅ Mình đã ghi tên bạn vào danh sách.`, `Khi có hàng về, mình sẽ báo bạn ngay. Trong lúc chờ, bạn có muốn xem sản phẩm khác không?`],
                [`Done! ✅ Đã lưu thông tin.`, `Có hàng mới là mình ping bạn liền. Giờ xem thử mấy món khác nhé?`],
                [`OK nhé! ✅ Đã đăng ký thành công.`, `Mình sẽ thông báo ngay khi hàng về. Cần tư vấn gì thêm không?`]
            ] : [
                [`Done! ✅ Added you to the waitlist.`, `I'll notify you as soon as we restock. Meanwhile, want to see other products?`],
                [`Great! ✅ You're on the list.`, `I'll ping you when new stock arrives. Check out other items?`],
                [`Perfect! ✅ Successfully registered.`, `You'll be notified when available. Need anything else?`]
            ];
            return randomPick(registerResponses);

        default:
            return ["..."];
    }
};