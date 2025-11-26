// Example: Cách sử dụng Out-of-Stock feature trong ChatBox component

import React, { useState } from 'react';
import { useProductAdvisor } from '@/hooks/useProductAdvisor';

const ChatBox = () => {
    const { processMessage, registerNotification } = useProductAdvisor();
    const [messages, setMessages] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    const handleUserMessage = async (text) => {
        // 1. Thêm message của user
        setMessages(prev => [...prev, { from: 'user', text }]);
        
        // 2. Process message
        const response = await processMessage(text);
        
        // 3. Handle response dựa vào type
        if (response.type === 'out_of_stock') {
            // Hiển thị UI đặc biệt cho out-of-stock
            setMessages(prev => [...prev, {
                from: 'bot',
                type: 'out_of_stock',
                text: response.text,
                quickReplies: response.quickReplies,
                metadata: {
                    category: response.metadata?.category
                }
            }]);
        } else {
            // Normal response
            setMessages(prev => [...prev, {
                from: 'bot',
                type: response.type,
                text: response.text,
                products: response.products,
                quickReplies: response.quickReplies
            }]);
        }
    };

    const handleNotifyClick = async (category) => {
        // 1. Validate email (optional)
        const emailToSave = userEmail.trim() ? { email: userEmail } : {};
        
        // 2. Register notification
        await registerNotification(category, emailToSave);
        
        // 3. Show confirmation
        const confirmMessage = {
            from: 'bot',
            type: 'text',
            text: ['Xong rồi! ✅ Mình đã ghi tên bạn vào danh sách.', 
                   'Khi có hàng về, mình sẽ báo bạn ngay.'],
            quickReplies: ['Xem giày chạy bộ', 'Xem đồ sale', 'Tìm kiếm khác']
        };
        setMessages(prev => [...prev, confirmMessage]);
        
        // 4. Clear email input
        setUserEmail('');
    };

    return (
        <div className="chatbox">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.from}`}>
                        {/* Render normal message */}
                        {msg.type !== 'out_of_stock' && (
                            <div className="text">
                                {Array.isArray(msg.text) 
                                    ? msg.text.map((t, i) => <p key={i}>{t}</p>)
                                    : <p>{msg.text}</p>
                                }
                            </div>
                        )}

                        {/* Render OUT-OF-STOCK message với UI đặc biệt */}
                        {msg.type === 'out_of_stock' && (
                            <div className="out-of-stock-card">
                                <div className="icon">📦</div>
                                <div className="message-text">
                                    {msg.text.map((t, i) => (
                                        <p key={i}>{t}</p>
                                    ))}
                                </div>

                                {/* Email input form (optional) */}
                                <div className="notify-form">
                                    <input
                                        type="email"
                                        placeholder="Email của bạn (không bắt buộc)"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        className="email-input"
                                    />
                                    <p className="privacy-note">
                                        💡 Email giúp chúng mình thông báo nhanh hơn. 
                                        Nếu không nhập, bạn sẽ thấy thông báo khi quay lại chat.
                                    </p>
                                </div>

                                {/* Quick replies với handler đặc biệt */}
                                <div className="quick-replies">
                                    {msg.quickReplies?.map((reply, i) => {
                                        if (reply.includes('Đăng ký') || reply.includes('Notify')) {
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => handleNotifyClick(msg.metadata.category)}
                                                    className="quick-reply notify-btn"
                                                >
                                                    🔔 {reply}
                                                </button>
                                            );
                                        }
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleUserMessage(reply)}
                                                className="quick-reply"
                                            >
                                                {reply}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Render products list */}
                        {msg.products && msg.products.length > 0 && (
                            <div className="products-list">
                                {msg.products.map((product, i) => (
                                    <ProductCard key={i} product={product} />
                                ))}
                            </div>
                        )}

                        {/* Render quick replies (for normal messages) */}
                        {msg.quickReplies && msg.type !== 'out_of_stock' && (
                            <div className="quick-replies">
                                {msg.quickReplies.map((reply, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleUserMessage(reply)}
                                        className="quick-reply"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input area */}
            <div className="input-area">
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleUserMessage(e.target.value);
                            e.target.value = '';
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ChatBox;
