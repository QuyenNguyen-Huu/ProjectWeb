import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, ShoppingBag, Minimize2, RefreshCw } from 'lucide-react';
import { MessageBubble, TypingIndicator, ProductSuggestionList, QuickReplies } from './ChatElements';
import { useProductAdvisor } from '@/hooks/useProductAdvisor';
import { useTracker } from '@/hooks/useTracker'; 
import { useLanguage } from '@/context/LanguageContext';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false); // Trạng thái thu nhỏ
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Hooks Logic
    const { processMessage, getInitialGreeting, isProcessing, isReady } = useProductAdvisor();
    const { clearHistory } = useTracker();
    const { t, language } = useLanguage();

    // --- 1. Khởi tạo Chat ---
    useEffect(() => {
        const initChat = async () => {
            if (!isReady) return;
            
            // Thử restore từ backup trước (khi user quay lại từ trang khác)
            const backupHistory = localStorage.getItem('chat_history_backup');
            if (backupHistory) {
                setMessages(JSON.parse(backupHistory));
                localStorage.removeItem('chat_history_backup'); // Clear backup sau khi restore
                return;
            }
            
            // Kiểm tra session xem đã có chat history chưa (để giữ lại khi reload)
            const savedHistory = sessionStorage.getItem('chat_messages_v2');
            if (savedHistory) {
                setMessages(JSON.parse(savedHistory));
            } else {
                // Lấy lời chào từ Advisor (có thể là Welcome back hoặc New user)
                const greeting = await getInitialGreeting();
                addBotMessage(greeting);
            }
        };
        
        if (isOpen && messages.length === 0) {
            initChat();
        }
    }, [isOpen, isReady]);

    // Clear chat và reinit khi đổi ngôn ngữ
    useEffect(() => {
        const reinitChat = async () => {
            if (isOpen && messages.length > 0 && isReady) {
                sessionStorage.removeItem('chat_messages_v2');
                setMessages([]);
                const greeting = await getInitialGreeting();
                addBotMessage(greeting);
            }
        };
        reinitChat();
    }, [language]);

    // Lưu history khi messages thay đổi
    useEffect(() => {
        if (messages.length > 0) {
            sessionStorage.setItem('chat_messages_v2', JSON.stringify(messages));
        }
        scrollToBottom();
    }, [messages]);

    // Scroll khi mở rộng từ minimize
    useEffect(() => {
        if (!isMinimized && messages.length > 0) {
            // Delay nhỏ để đảm bảo DOM đã render
            setTimeout(() => scrollToBottom(), 100);
        }
    }, [isMinimized]);

    // Cuộn xuống cuối
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // --- 2. Các hàm xử lý tin nhắn ---
    
    const addMessage = (msg) => {
        setMessages(prev => [...prev, { ...msg, id: Date.now() + Math.random() }]);
    };

    const addBotMessage = (response) => {
        // response từ useProductAdvisor trả về dạng: { text: [], products: [], quickReplies: [] }
        
        // 1. Add text messages (có thể có nhiều dòng)
        if (Array.isArray(response.text)) {
            response.text.forEach((txt, idx) => {
                // Delay nhẹ giữa các dòng text của bot cho tự nhiên
                setTimeout(() => {
                    addMessage({ type: 'text', text: txt, sender: 'bot' });
                }, idx * 500);
            });
        }

        // 2. Add Product List (nếu có)
        if (response.products && response.products.length > 0) {
            setTimeout(() => {
                addMessage({ type: 'products', products: response.products, sender: 'bot' });
            }, (response.text.length || 1) * 500);
        }

        // 3. Add Quick Replies (luôn hiện cuối cùng)
        if (response.quickReplies && response.quickReplies.length > 0) {
            setTimeout(() => {
                // Ta lưu quick replies vào state riêng hoặc message đặc biệt để render nút
                // Ở đây ta dùng message type 'quick_replies'
                addMessage({ type: 'quick_replies', options: response.quickReplies, sender: 'bot' });
            }, (response.text.length + 1) * 500);
        }
    };

    const handleSend = async (text) => {
        if (!text.trim()) return;

        // Xóa các nút Quick Reply cũ (UX: khi user chat, gợi ý cũ không còn tác dụng)
        setMessages(prev => prev.filter(m => m.type !== 'quick_replies'));

        // 1. Add User Message
        addMessage({ type: 'text', text: text, sender: 'user' });
        setInputValue("");

        // 2. Call Advisor
        const response = await processMessage(text);
        
        // 3. Add Bot Response
        addBotMessage(response);
    };

    const handleQuickReply = (text) => {
        handleSend(text);
    };

    const handleClearHistory = () => {
        if(window.confirm(language === 'vi' ? "Bạn chắc chắn muốn xóa lịch sử chat?" : "Clear chat history?")) {
            clearHistory(); // Xóa tracking behavior
            sessionStorage.removeItem('chat_messages_v2'); // Xóa chat session
            setMessages([]); // Reset UI
            // Re-init greeting
            getInitialGreeting().then(res => addBotMessage(res));
        }
    };

    // --- 3. Render UI ---

    return (
        <div className={`fixed bottom-[80px] md:bottom-[20px] right-3 md:right-5 font-sans flex flex-col items-end ${isOpen ? 'z-[99999] pointer-events-auto' : 'z-[9999] pointer-events-none'}`}>
            
            {/* --- CHAT WINDOW --- */}
            <div 
                className={`
                    bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 origin-bottom-right relative flex flex-col
                    ${isOpen ? 'scale-100 opacity-100 mb-2 pointer-events-auto' : 'scale-0 opacity-0 mb-0 h-0 pointer-events-none'}
                    ${isMinimized 
                        ? 'h-auto w-[220px]' 
                        : 'h-[calc(100vh-180px)] max-h-[500px] w-[calc(100vw-24px)] sm:h-[600px] sm:w-[400px] md:max-h-[650px]'
                    }
                `}
            >
                {/* Header */}
                <div 
                    className={`bg-gradient-to-r from-[#673AB7] to-[#7E57C2] p-4 flex items-center text-white cursor-pointer shadow-lg transition-all ${isMinimized ? 'justify-between rounded-2xl' : 'justify-between rounded-t-2xl'}`}
                    onClick={() => setIsMinimized(!isMinimized)}
                >
                    <div className={`flex items-center ${isMinimized ? 'gap-2' : 'gap-3'}`}>
                        <div className="relative">
                            <div className={`${isMinimized ? 'w-8 h-8' : 'w-10 h-10'} bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all`}>
                                <ShoppingBag size={isMinimized ? 18 : 20} />
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#673AB7] rounded-full animate-pulse"></span>
                        </div>
                        <div>
                            <h3 className={`font-bold leading-tight ${isMinimized ? 'text-sm' : 'text-base'}`}>IMSports Advisor</h3>
                            {!isMinimized && <span className="text-xs opacity-90 block mt-0.5">{language === 'vi' ? 'Luôn sẵn sàng tư vấn' : 'Always ready to assist'}</span>}
                        </div>
                    </div>
                    <div className={`flex items-center ${isMinimized ? 'gap-1' : 'gap-2'}`}>
                        {!isMinimized && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleClearHistory(); }}
                                title="Xóa lịch sử"
                                className="p-2 hover:bg-white/20 rounded-lg transition-all active:scale-95"
                            >
                                <RefreshCw size={18} />
                            </button>
                        )}
                        {!isMinimized && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                                title="Thu nhỏ"
                                className="p-2 hover:bg-white/20 rounded-lg transition-all active:scale-95"
                            >
                                <Minimize2 size={18} />
                            </button>
                        )}
                        {isMinimized && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}
                                title="Mở rộng"
                                className="p-1.5 hover:bg-white/20 rounded-lg transition-all active:scale-95"
                            >
                                <Minimize2 size={16} />
                            </button>
                        )}
                        <button 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                setIsOpen(false);
                                setIsMinimized(false);
                            }}
                            title="Đóng"
                            className={`${isMinimized ? 'p-1.5' : 'p-2'} hover:bg-red-500/20 rounded-lg transition-all active:scale-95`}
                        >
                            <span className={`${isMinimized ? 'text-base' : 'text-lg'} font-bold`}>✕</span>
                        </button>
                    </div>
                </div>

                {/* Body (Chỉ hiện khi không minimize) */}
                {!isMinimized && (
                    <>
                        <div className="flex-1 h-[calc(100%-128px)] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
                            {/* Intro Text nhỏ */}
                            <p className="text-center text-xs text-gray-400 mb-5 mt-1 font-medium">
                                {language === 'vi' ? 'Hỗ trợ tìm kiếm & so sánh sản phẩm' : 'Product search & comparison support'}
                            </p>

                            {messages.map((msg) => {
                                if (msg.type === 'text') return <MessageBubble key={msg.id} message={msg} isUser={msg.sender === 'user'} />;
                                if (msg.type === 'products') return <ProductSuggestionList key={msg.id} products={msg.products} language={language} />;
                                if (msg.type === 'quick_replies') return <QuickReplies key={msg.id} options={msg.options} onSelect={handleQuickReply} />;
                                return null;
                            })}
                            
                            {isProcessing && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form 
                            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                            className="p-4 bg-white border-t border-gray-200 flex gap-3 items-center relative shadow-lg rounded-b-2xl"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={language === 'vi' ? "Nhập tin nhắn..." : "Type a message..."}
                                className="flex-1 bg-gray-50 text-sm px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 focus:bg-white transition-all"
                            />
                            <button 
                                type="submit" 
                                disabled={!inputValue.trim() || isProcessing}
                                className="w-11 h-11 bg-gradient-to-r from-[#673AB7] to-[#7E57C2] text-white rounded-full flex items-center justify-center hover:from-[#7E57C2] hover:to-[#673AB7] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform active:scale-95"
                            >
                                <Send size={19} className="ml-0.5" />
                            </button>
                        </form>
                    </>
                )}
            </div>

            {/* --- TOGGLE BUTTON --- */}
            {!isOpen && (
                <button
                    onClick={() => { setIsOpen(true); setIsMinimized(false); }}
                    className="group relative w-14 h-14 bg-[#673AB7] rounded-full shadow-lg shadow-purple-900/20 flex items-center justify-center hover:scale-110 transition-all duration-300 pointer-events-auto"
                >
                    <MessageCircle size={28} color="white" />
                    
                    {/* Ping animation attention */}
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                    </span>

                    {/* Tooltip */}
                    <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {language === 'vi' ? 'Chat với IMSports' : 'Chat with IMSports'}
                    </span>
                </button>
            )}

        </div>
    );
};

export default ChatWidget;