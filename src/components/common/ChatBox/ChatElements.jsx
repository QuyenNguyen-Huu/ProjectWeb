import React from 'react';

// Message Bubble Component
export const MessageBubble = ({ message, isUser }) => {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div 
                className={`
                    max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-md
                    ${isUser 
                        ? 'bg-gradient-to-r from-[#673AB7] to-[#7E57C2] text-white rounded-br-md' 
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                    }
                `}
            >
                <p className="leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                </p>
            </div>
        </div>
    );
};

// Typing Indicator Component
export const TypingIndicator = () => {
    return (
        <div className="flex justify-start mb-3">
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
            </div>
        </div>
    );
};

// Product Suggestion List Component
export const ProductSuggestionList = ({ products, language }) => {
    if (!products || products.length === 0) return null;
    
    const handleProductClick = (e, product) => {
        // Lưu lịch sử chat trước khi chuyển trang
        const currentMessages = sessionStorage.getItem('chat_messages_v2');
        if (currentMessages) {
            localStorage.setItem('chat_history_backup', currentMessages);
        }
    };
    
    return (
        <div className="mb-4">
            <div className="grid gap-2">
                {products.map((product, index) => (
                    <a
                        key={product.id || index}
                        href={`/${product.slug || product.id}.html`}
                        onClick={(e) => handleProductClick(e, product)}
                        className="bg-white rounded-xl p-3 border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all group"
                    >
                        <div className="flex gap-3">
                            {/* Product Image */}
                            {product.images && product.images[0] && (
                                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    <img 
                                        src={product.images[0]} 
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            
                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-purple-600 transition-colors">
                                    {language === 'en' && product.name_en ? product.name_en : (product.name || product.title)}
                                </h4>
                                
                                {/* Price */}
                                <div className="flex items-center gap-2">
                                    {product.oldPrice && (
                                        <span className="text-xs text-gray-400 line-through">
                                            {product.oldPrice.toLocaleString('vi-VN')}đ
                                        </span>
                                    )}
                                    <span className="text-sm font-bold text-purple-600">
                                        {(product.price || 0).toLocaleString('vi-VN')}đ
                                    </span>
                                    {product.salePercent && (
                                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">
                                            -{product.salePercent}%
                                        </span>
                                    )}
                                </div>
                                
                                {/* Badges */}
                                <div className="flex gap-1 mt-1.5">
                                    {product.isNew && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                            {language === 'vi' ? 'Mới' : 'New'}
                                        </span>
                                    )}
                                    {product.isGift && (
                                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                                            🎁 {language === 'vi' ? 'Quà' : 'Gift'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

// Quick Replies Component
export const QuickReplies = ({ options, onSelect }) => {
    if (!options || options.length === 0) return null;
    
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(option)}
                    className="bg-white text-purple-600 border-2 border-purple-300 px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:border-purple-400 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                    {option}
                </button>
            ))}
        </div>
    );
};
