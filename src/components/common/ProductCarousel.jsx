import React, { useRef, useState, useEffect, useCallback } from 'react';

const ProductCarousel = ({ children }) => {
    const scrollContainerRef = useRef(null);
    const timeoutRef = useRef(null);
    const isInitialSetup = useRef(true);
    const autoplayIntervalRef = useRef(null); // Ref cho autoplay

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftStart, setScrollLeftStart] = useState(0);

    const originalItems = React.Children.toArray(children);
    const CLONE_COUNT = Math.max(4, Math.floor(originalItems.length / 2)); 
    
    const clonedHead = originalItems.slice(-CLONE_COUNT);
    const clonedTail = originalItems.slice(0, CLONE_COUNT);
    const allItems = [...clonedHead, ...originalItems, ...clonedTail];

    // --- MỚI: Logic cho Autoplay ---
    const resetAutoplay = useCallback(() => {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = setInterval(() => {
            handleNavClick('next', true); // Gọi hàm cuộn tự động
        }, 5000); // 5 giây
    }, []);

    const stopAutoplay = () => {
        clearInterval(autoplayIntervalRef.current);
    };

    // --- Cập nhật các hàm tương tác để reset autoplay ---
    const handleMouseDown = (e) => {
        resetAutoplay(); // Reset khi người dùng bắt đầu kéo
        if (!scrollContainerRef.current) return;
        clearTimeout(timeoutRef.current);
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeftStart(scrollContainerRef.current.scrollLeft);
        scrollContainerRef.current.style.scrollBehavior = 'auto';
    };

    const handleMouseLeaveOrUp = () => {
        if (isDragging && scrollContainerRef.current) {
            scrollContainerRef.current.style.scrollBehavior = 'smooth';
        }
        setIsDragging(false);
    };
    
    const handleMouseMove = (e) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
    };

    const handleNavClick = (direction, isAutoplay = false) => {
        if (!isAutoplay) {
            resetAutoplay(); // Reset khi người dùng bấm nút
        }
        if (scrollContainerRef.current) {
            clearTimeout(timeoutRef.current);
            scrollContainerRef.current.style.scrollBehavior = 'smooth';
            const itemWidth = scrollContainerRef.current.scrollWidth / allItems.length;
            const scrollAmount = direction === 'next' ? itemWidth : -itemWidth;
            scrollContainerRef.current.scrollBy({ left: scrollAmount });
        }
    };
    
    const handleScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            const container = scrollContainerRef.current;
            if (!container) return;
            const itemWidth = container.scrollWidth / allItems.length;
            const scrollEndPosition = (originalItems.length + CLONE_COUNT) * itemWidth;
            const scrollStartPosition = CLONE_COUNT * itemWidth;
            if (container.scrollLeft >= scrollEndPosition - 1) {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = scrollStartPosition + (container.scrollLeft - scrollEndPosition);
            }
            else if (container.scrollLeft <= scrollStartPosition - itemWidth + 1) {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = scrollEndPosition - (scrollStartPosition - container.scrollLeft);
            }
        }, 150);
    }, [allItems.length, originalItems.length, CLONE_COUNT]);
    
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container && isInitialSetup.current) {
            const itemWidth = container.scrollWidth / allItems.length;
            container.scrollLeft = CLONE_COUNT * itemWidth;
            isInitialSetup.current = false;
        }
        
        container?.addEventListener('scroll', handleScroll);
        resetAutoplay(); // Bắt đầu autoplay khi component được mount
        
        return () => {
            container?.removeEventListener('scroll', handleScroll);
            clearInterval(autoplayIntervalRef.current); // Dọn dẹp interval khi unmount
        };
    }, [handleScroll, allItems.length, CLONE_COUNT, resetAutoplay]);
    
    return (
        <div 
            className="product-carousel-container"
            onMouseEnter={stopAutoplay} // Tạm dừng khi hover chuột vào
            onMouseLeave={resetAutoplay} // Tiếp tục khi chuột rời đi
        >
            <div
                ref={scrollContainerRef}
                className="product-carousel"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeaveOrUp}
                onMouseUp={handleMouseLeaveOrUp}
                onMouseMove={handleMouseMove}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
                {allItems.map((item, index) => (
                    <div key={index} className="product-carousel-item">
                        {item}
                    </div>
                ))}
            </div>
            <button className="nav-button prev" onClick={() => handleNavClick('prev')}>
                <i className="fas fa-angle-left"></i>
            </button>
            <button className="nav-button next" onClick={() => handleNavClick('next')}>
                <i className="fas fa-angle-right"></i>
            </button>
        </div>
    );
};

export default ProductCarousel;