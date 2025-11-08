import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

// 1. Tạo Context
const CartContext = createContext();

// 2. Tạo Provider
export const CartProvider = ({ children }) => {
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

    // --- SỬA ĐỔI TẠI ĐÂY ---
    // Hàm thêm sản phẩm (đã có thể thêm nhiều)
    // 'itemToAdd' là một object hoàn chỉnh: { id, name, price, size, quantity, image }
    const addToCart = (itemToAdd) => {
        console.log("Kiểm tra", itemToAdd);
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item =>
                item.id === itemToAdd.id && item.size === itemToAdd.size
            );

            if (existingItem) {
                // Yêu cầu 4: Nếu đã có, cộng số lượng
                return prevItems.map(item =>
                    (item.id === itemToAdd.id && item.size === itemToAdd.size)
                        ? { ...item, quantity: item.quantity + itemToAdd.quantity } // Cộng dồn
                        : item
                );
            }
            // Yêu cầu 3: Nếu chưa có, thêm dòng mới
            return [...prevItems, itemToAdd]; // itemToAdd đã chứa quantity
        });
    };
    // --- KẾT THÚC SỬA ĐỔI ---


    // Hàm cập nhật số lượng (giữ nguyên)
    const updateQuantity = (productId, size, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId, size);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    (item.id === productId && item.size === size)
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    // Hàm xóa sản phẩm (giữ nguyên)
    const removeFromCart = (productId, size) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === productId && item.size === size)));
    };

    // Hàm tính tổng tiền (giữ nguyên)
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const priceString = item.price || '0';
            const priceNumber = parseFloat(priceString.replace(/[^0-9]/g, ''));
            return total + (priceNumber * item.quantity);
        }, 0);
    };

    // Hàm Format tiền (giữ nguyên)
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(amount).replace(/\./g, ',');
    };

    // Tối ưu hóa Context value
    const value = useMemo(() => ({
        cartItems,
        addToCart, // Hàm addToCart mới đã được đưa vào
        updateQuantity,
        removeFromCart,
        calculateTotal,
        formatCurrency
    }), [cartItems]); // cartItems là dependency đúng

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// 3. Tạo Hook tùy chỉnh (giữ nguyên)
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart phải được dùng bên trong một CartProvider');
    }
    return context;
};