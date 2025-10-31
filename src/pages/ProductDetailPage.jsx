import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useIsDesktop from "@/hooks/useIsDesktop";
import Breadcrumb from "@/features/products/Categories-Products/Breadcrumb";
import { useCart } from '../context/cartContext';

// --- Dữ liệu Mockup ---
const mockProductData = {
    brand: "Zoot",
    sku: "SV-ZFT350990",
    price: "6,990,000 VNĐ",
    sizes: ["S", "M"],
    images: [
        "https://pos.nvncdn.com/be3294-43017/ps/20251020_RTBesDbTCn.jpeg?v=1760934854",
        "https://pos.nvncdn.com/be3294-43017/ps/20251018_llY0feKjFK.jpeg?v=1760771662",
        "https://pos.nvncdn.com/be3294-43017/ps/20251018_EGa4aTsdxm.jpeg?v=1760771660",
        "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664",
        "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664",
        "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664"
    ],
    highlights: ["Vento Aero Fabric...", "Cool Storage Pockets...", /* ... */],
    description: `
        <p><strong>Mô tả sản phẩm:</strong></p>
        <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Trọng lượng: 140g</li>
            <li>Nhẹ</li>
            <li>Thoáng khí</li>
        </ul>
        <p><strong>Tính năng nổi bật:</strong></p>
        <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Cổ áo khóa kéo nửa thân</li>
            <li>1 túi khóa kéo bên hông</li>
        </ul>
    `,
    // --- THAY ĐỔI 1: Thêm mock data cho "Thành phần" ---
    composition: `
        <p><strong>Chất liệu:</strong></p>
        <ul class="list-disc list-inside space-y-1 mb-4">
            <li>80% Polyester tái chế và 20% Elasthanne</li>
            <li>Polyester có độ thoáng khí cao</li>
            <li>Elastane mang lại độ co giãn linh hoạt, giúp cử động dễ dàng</li>
        </ul>
        <p><strong>Hướng dẫn bảo quản:</strong></p>
        <ul class="list-disc list-inside space-y-1">
            <li>Không giặt ở nhiệt độ trên 30°C</li>
            <li>Không sấy khô</li>
            <li>Không dùng nước xả vải</li>
            <li>Không ủi</li>
            <li>Không giặt khô</li>
        </ul>
    `
};
// -----------------------

// --- Cấu hình Zoom ---
const LENS_SIZE = 180;
const ZOOM_BOX_SIZE = 500;
const ZOOM_SCALE = ZOOM_BOX_SIZE / LENS_SIZE;
// ---------------------

export default function ProductDetailPage() {
    const isDesktop = useIsDesktop();
    const { productSlug } = useParams();

    // --- State ---
    const [productName, setProductName] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(mockProductData.sizes[0]);
    
    // --- State cho ô Số lượng ---
    const [quantity, setQuantity] = useState(1);
    const [quantityInput, setQuantityInput] = useState(String(quantity));
    
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
    const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
    
    // --- State cho Tab ---
    const [activeTab, setActiveTab] = useState('description'); // 'description' or 'composition'

    const mainImageRef = useRef(null);
    const mobileScrollContainerRef = useRef(null); // Giữ ref này cho gallery mobile

    // Destructure dữ liệu mới
    const { images, sizes, brand, sku, price, highlights, description, composition } = mockProductData;
    const totalImages = images.length;

    const { addToCart } = useCart();
    
    // --- Effects ---
    useEffect(() => {
        // ... (Effect cuộn trang... không đổi) ...
        window.scrollTo(0, 0);
        let cleanedName = productSlug.replace(/-p\d+$/, '').replace(/-/g, ' ');
        setProductName(cleanedName);
        let breadcrumbName = cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);
        if (breadcrumbName.length > 40) breadcrumbName = breadcrumbName.substring(0, 40) + '...';
        setBreadcrumbItems([
            { name: 'Trang chủ', link: '/' },
            { name: 'Men', link: '/do-nam' },
            { name: breadcrumbName, link: `/${productSlug}.html` }
        ]);
        setSelectedImageIndex(0);
        setThumbnailStartIndex(0);
    }, [productSlug]);

    useEffect(() => {
        // ... (Effect cuộn gallery mobile... không đổi) ...
        if (isDesktop || !mobileScrollContainerRef.current) return;
        const thumbnailEl = document.getElementById(`mobile-thumb-${selectedImageIndex}`);
        if (thumbnailEl) {
            thumbnailEl.scrollIntoView({
                behavior: 'smooth', block: 'nearest', inline: 'nearest'
            });
        }
    }, [selectedImageIndex, isDesktop]);

    // --- Handlers ---
    // (Desktop thumbs handlers... không đổi)
    const desktopThumbnailsVisible = 3;
    const isPrevDisabled = thumbnailStartIndex === 0;
    const isNextDisabled = thumbnailStartIndex >= totalImages - desktopThumbnailsVisible;
    const handlePrevThumbnail = () => setThumbnailStartIndex(prev => Math.max(0, prev - 1));
    const handleNextThumbnail = () => setThumbnailStartIndex(prev => Math.min(totalImages - desktopThumbnailsVisible, prev + 1));

    // (Add to cart handler... không đổi)
    const handleAddToCart = () => {
        const productToAdd = {
            id: productSlug, name: productName, price: price,
            image: images[0], size: selectedSize
        };
        for (let i = 0; i < quantity; i++) {
            addToCart(productToAdd);
        }
        console.log(`Đã thêm ${quantity} x ${productName} (Size: ${selectedSize}) vào giỏ!`);
    };

    // (Zoom handlers... không đổi)
    const handleMouseEnter = (e) => {
        if (!mainImageRef.current) return;
        const { width, height } = mainImageRef.current.getBoundingClientRect();
        setImgDimensions({ width, height });
        setIsZooming(true);
    };
    const handleMouseLeave = () => setIsZooming(false);
    const handleMouseMove = (e) => {
        if (!mainImageRef.current || !isDesktop) {
            setIsZooming(false);
            return;
        }
        const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
        const mouseX = e.pageX - left - window.scrollX;
        const mouseY = e.pageY - top - window.scrollY;
        let lensX = mouseX - LENS_SIZE / 2;
        let lensY = mouseY - LENS_SIZE / 2;
        lensX = Math.max(0, Math.min(lensX, width - LENS_SIZE));
        lensY = Math.max(0, Math.min(lensY, height - LENS_SIZE));
        setZoomPosition({ x: lensX, y: lensY });
        setBgPosition({ x: -lensX * ZOOM_SCALE, y: -lensY * ZOOM_SCALE });
    };

    // (Mobile image handlers... không đổi)
    const handlePrevImage = () => setSelectedImageIndex(prev => Math.max(0, prev - 1));
    const handleNextImage = () => setSelectedImageIndex(prev => Math.min(totalImages - 1, prev + 1));

    // --- Handlers cho ô Số lượng (Đã sửa) ---
    const updateQuantity = (newVal) => {
        const numQty = parseInt(newVal, 10);
        if (isNaN(numQty) || numQty < 1) {
            setQuantity(quantity); 
            setQuantityInput(String(quantity));
        } else {
            setQuantity(numQty);
            setQuantityInput(String(numQty));
        }
    };
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, '');
        setQuantityInput(numericValue);
    };
    const handleQuantityBlur = () => {
        updateQuantity(quantityInput);
    };
    const handleQuantityKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    };
    const handleIncrement = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        setQuantityInput(String(newQty));
    };
    const handleDecrement = () => {
        const newQty = Math.max(1, quantity - 1);
        setQuantity(newQty);
        setQuantityInput(String(newQty));
    };
    // ------------------------------------------


    // --- Render ---
    return (
        <div className={`${isDesktop ? 'mt-[80px]' : 'mt-[54px]'} font-["Montserrat",sans-serif]`}>
            <section className="bg-[#f4f4f4] py-5">
                <Breadcrumb breadcrumbItems={breadcrumbItems} />
            </section>
            <section className="products-container py-8">
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10">
                    {/* --- COLUMN 1: IMAGE GALLERY --- */}
                    <div className="relative flex flex-col lg:flex-row gap-4">
                        {/* Desktop Thumbs */}
                        <div className="hidden lg:flex lg:flex-col items-center gap-2">
                            <button onClick={handlePrevThumbnail} disabled={isPrevDisabled} className="p-2 text-lg disabled:opacity-30"><i className="fa fa-angle-up"></i></button>
                            <div className="flex flex-col gap-2">
                                {images.slice(thumbnailStartIndex, thumbnailStartIndex + desktopThumbnailsVisible).map((src, i) => {
                                    const actualIndex = thumbnailStartIndex + i;
                                    return <img key={actualIndex} src={src} alt={`Thumbnail ${actualIndex + 1}`} className={`w-24 h-24 object-cover border-2 transition-all cursor-pointer ${selectedImageIndex === actualIndex ? 'border-orange-500' : 'border-gray-200 hover:border-gray-400'}`} onClick={() => setSelectedImageIndex(actualIndex)} />;
                                })}
                            </div>
                            <button onClick={handleNextThumbnail} disabled={isNextDisabled} className="p-2 text-lg disabled:opacity-30"><i className="fa fa-angle-down"></i></button>
                        </div>
                        {/* Main Image */}
                        <div
                            className="w-full relative order-first lg:order-none flex-1"
                            ref={mainImageRef}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                        >
                            <img src={images[selectedImageIndex]} alt="Main product" className="w-full h-auto object-cover border" />
                            <div
                                className={`absolute border-2 border-gray-400 ${isZooming && isDesktop ? 'block' : 'hidden'} pointer-events-none`}
                                style={{
                                    width: `${LENS_SIZE}px`, height: `${LENS_SIZE}px`,
                                    left: `${zoomPosition.x}px`, top: `${zoomPosition.y}px`,
                                    cursor: 'crosshair', backgroundColor: 'rgba(100, 100, 100, 0.2)'
                                }}
                            />
                        </div>
                        {/* Khung Zoom */}
                        <div
                            className={`absolute left-[101%] top-0 border bg-white ${isZooming && isDesktop ? 'block' : 'hidden'} pointer-events-none`}
                            style={{
                                width: `${ZOOM_BOX_SIZE}px`, height: `${ZOOM_BOX_SIZE}px`,
                                backgroundImage: `url(${images[selectedImageIndex]})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: `${imgDimensions.width * ZOOM_SCALE}px ${imgDimensions.height * ZOOM_SCALE}px`,
                                backgroundPosition: `${bgPosition.x}px ${bgPosition.y}px`
                            }}
                        />
                        {/* Mobile Thumbs */}
                        <div className="lg:hidden w-full order-2 mt-2 flex items-center">
                            <button onClick={handlePrevImage} disabled={selectedImageIndex === 0} className="p-2 rounded-full disabled:opacity-30">
                                <i className="fa fa-angle-left"></i>
                            </button>
                            <div 
                                ref={mobileScrollContainerRef} 
                                className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                            >
                                <div className="flex flex-nowrap gap-2 px-1">
                                    {images.map((src, index) => (
                                        <img 
                                            id={`mobile-thumb-${index}`} 
                                            key={index} 
                                            src={src} 
                                            alt={`Thumbnail ${index + 1}`} 
                                            className={`h-auto object-cover border-2 cursor-pointer aspect-square flex-shrink-0
                                                        ${selectedImageIndex === index ? 'border-orange-500' : 'border-transparent'}`} 
                                            style={{ width: '25%' }} 
                                            onClick={() => setSelectedImageIndex(index)} 
                                        />
                                    ))}
                                </div>
                            </div>
                            <button onClick={handleNextImage} disabled={selectedImageIndex === totalImages - 1} className="p-2 rounded-full disabled:opacity-30">
                                <i className="fa fa-angle-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* --- COLUMN 2: PRODUCT INFO --- */}
                    <div className="w-full mt-6 lg:mt-0 order-3">
                        {/* ... (Tên, brand, giá, size...) ... */}
                        <h1 className="text-[26px] uppercase font-semibold mb-3 leading-tight">{productName}</h1>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                            <span>Thương hiệu: <span className="font-semibold text-gray-800">{brand}</span></span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span>Mã SP: <span className="font-semibold text-gray-800">{sku}</span></span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-6">{price}</div>
                        <div className="mb-6">
                            <label className="block text-md font-semibold mb-2">Chọn size:</label>
                            <div className="flex gap-2">
                                {sizes.map(size => (
                                    <button key={size} onClick={() => setSelectedSize(size)} className={`w-12 h-12 border rounded transition-colors hover:border-orange-500 focus:border-orange-500 focus:outline-none ${selectedSize === size ? 'border-orange-500 border-2' : 'border-gray-300'}`}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- Quantity & Actions --- */}
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold">Số lượng:</label>
                            
                            {/* Input cho Mobile */}
                            <div className="relative w-full md:hidden">
                                <input 
                                    type="text" 
                                    inputMode="numeric" 
                                    value={quantityInput}
                                    onChange={handleQuantityChange}
                                    onBlur={handleQuantityBlur}
                                    onKeyDown={handleQuantityKeyDown}
                                    className="w-full h-12 text-center border border-gray-300 rounded-full pr-10"
                                />
                                <div className="absolute right-2 top-0 h-full flex flex-col justify-center">
                                    <button type="button" onClick={handleIncrement} className="text-gray-600 h-1/2 flex items-center justify-center px-1">
                                        <i className="fa fa-angle-up text-xs"></i>
                                    </button>
                                    <button type="button" onClick={handleDecrement} className="text-gray-600 h-1/2 flex items-center justify-center px-1">
                                        <i className="fa fa-angle-down text-xs"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex flex-row gap-2 w-full">
                                {/* Input cho Desktop */}
                                <div className="relative hidden md:block w-20">
                                    <input 
                                        type="text" 
                                        inputMode="numeric" 
                                        value={quantityInput}
                                        onChange={handleQuantityChange}
                                        onBlur={handleQuantityBlur}
                                        onKeyDown={handleQuantityKeyDown}
                                        className="w-full h-12 text-center border border-gray-300 rounded-full pr-6"
                                    />
                                    <div className="absolute right-1 top-0 h-full flex flex-col justify-center">
                                        <button type="button" onClick={handleIncrement} className="text-gray-600 h-1/2 flex items-center justify-center px-1">
                                            <i className="fa fa-angle-up text-xs"></i>
                                        </button>
                                        <button type="button" onClick={handleDecrement} className="text-gray-600 h-1/2 flex items-center justify-center px-1">
                                            <i className="fa fa-angle-down text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Các nút bấm */}
                                <button 
                                    onClick={handleAddToCart}
                                    className="flex-1 h-12 bg-[#703fc8] text-white font-semibold rounded-full uppercase hover:bg-opacity-90 transition-all text-sm cursor-pointer">
                                    Thêm vào giỏ hàng
                                </button>
                                <button className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0 hover:border-gray-500 transition-all cursor-pointer" aria-label="Thêm vào yêu thích">
                                    <i className="far fa-heart"></i>
                                </button>
                            </div>
                        </div>
                        {/* -------------------------------------------------- */}
                        
                        <hr className="my-6 border-t border-gray-300 md:hidden" />

                        {/* Đặc điểm nổi bật */}
                        <div className="mt-6">
                            <h3 className="font-bold text-red-500 mb-3 text-lg">Đặc điểm nổi bật</h3>
                            <ul className="list-none space-y-2 text-gray-700">
                                {highlights.map((item, index) => (
                                    <li key={index}>- {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* --- Detailed Description Section --- */}
                <div className="mt-16">
                    {isDesktop ? (
                        /* --- GIAO DIỆN DESKTOP (Tabs) --- */
                        <div>
                            {/* Thanh Nav Tab */}
                            <nav className="flex">
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={`py-3 px-6 text-sm font-semibold transition-all border
                                        ${activeTab === 'description'
                                            ? 'bg-[#673AB7] text-white border-[#673AB7]'
                                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    Mô tả chi tiết
                                </button>
                                <button
                                    onClick={() => setActiveTab('composition')}
                                    className={`py-3 px-6 text-sm font-semibold transition-all border
                                        ${activeTab === 'composition'
                                            ? 'bg-[#673AB7] text-white border-[#673AB7]'
                                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    Thành phần
                                </button>
                            </nav>
                            
                            {/* Nội dung Tab */}
                            <div className="mt-0 text-gray-700 leading-relaxed border border-gray-300 p-4">
                                {activeTab === 'description' && (
                                    <div dangerouslySetInnerHTML={{ __html: description }} />
                                )}
                                {activeTab === 'composition' && (
                                    <div dangerouslySetInnerHTML={{ __html: composition }} />
                                )}
                            </div>
                        </div>

                    ) : (
                        /* --- GIAO DIỆN MOBILE --- */
                        <div className="w-full">
                            {/* Các Header Accordion */}
                            <div className="border-t border-gray-300">
                                {/* Header 1: Mô tả */}
                                <button
                                    onClick={() => setActiveTab(activeTab === 'description' ? null : 'description')}
                                    className={`flex justify-between items-center w-full py-4 px-2
                                        ${activeTab === 'description' ? 'text-[#673AB7]' : 'text-gray-800'}
                                    `}
                                >
                                    <span className="font-semibold">Mô tả chi tiết</span>
                                    {activeTab !== 'description' && <i className="fa fa-angle-down text-gray-600"></i>}
                                </button>
                                
                                {/* Header 2: Thành phần */}
                                <button
                                    onClick={() => setActiveTab(activeTab === 'composition' ? null : 'composition')}
                                    className={`flex justify-between items-center w-full py-4 px-2 border-b border-gray-300
                                        ${activeTab === 'composition' ? 'text-[#673AB7]' : 'text-gray-800'}
                                    `}
                                >
                                    <span className="font-semibold">Thành phần</span>
                                    {activeTab !== 'composition' && <i className="fa fa-angle-down text-gray-600"></i>}
                                </button>
                            </div>

                            {/* Khu vực Nội dung (Nằm bên dưới tất cả) */}
                            <div className="mt-6 text-gray-700 leading-relaxed">
                                {activeTab === 'description' && (
                                    <div dangerouslySetInnerHTML={{ __html: description }} />
                                )}
                                {activeTab === 'composition' && (
                                    <div dangerouslySetInnerHTML={{ __html: composition }} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}