import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

// 1. Tạo Context
const CartContext = createContext();

// 2. Tạo Provider (Component "bọc" toàn bộ ứng dụng)
export const CartProvider = ({ children }) => {
    // State để lưu trữ các sản phẩm trong giỏ
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Không thể đọc giỏ hàng từ localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Không thể lưu giỏ hàng vào localStorage", error);
        }
    }, [cartItems]);

    // Hàm thêm sản phẩm vào giỏ
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item =>
                item.id === product.id && item.size === product.size
            );

            if (existingItem) {
                return prevItems.map(item =>
                    (item.id === product.id && item.size === product.size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    // Hàm cập nhật số lượng
    const updateQuantity = (productId, size, newQuantity) => {
        if (newQuantity <= 0) {
            // Nếu số lượng <= 0, xóa khỏi giỏ
            removeFromCart(productId, size);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    (item.id === productId && item.size === size) // Kiểm tra cả 'size'
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    // Hàm xóa sản phẩm
    const removeFromCart = (productId, size) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === productId && item.size === size)));
    };

    // Hàm tính tổng tiền
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            // Chuyển đổi giá (ví dụ: "1,200,000 VNĐ") thành số
            // (Lưu ý: Hãy đảm bảo 'item.price' có định dạng đúng)
            const priceString = item.price || '0';
            const priceNumber = parseFloat(priceString.replace(/[^0-9]/g, ''));
            return total + (priceNumber * item.quantity);
        }, 0);
    };

    // Hàm Format tiền (ví dụ: 1200000 -> "1,200,000 VNĐ")
    const formatCurrency = (amount) => {
        // Sử dụng 'vi-VN' và 'VND'
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0 // Không hiển thị số lẻ (ví dụ: ,00)
        }).format(amount).replace(/\./g, ','); // Thay dấu chấm bằng dấu phẩy
    };

    // Tối ưu hóa Context value
    const value = useMemo(() => ({
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        calculateTotal,
        formatCurrency
    }), [cartItems]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// 3. Tạo Hook tùy chỉnh (để các component khác dễ sử dụng)
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart phải được dùng bên trong một CartProvider');
    }
    return context;
};
