import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useIsDesktop from "@/hooks/useIsDesktop";
import Breadcrumb from "@/features/products/Categories-Products/Breadcrumb";

// --- CÁC IMPORT MỚI ĐƯỢC THÊM ---
import mockCollections from "@/features/home/Collections/data/mockCollections"; 
import RelatedProducts from '@/components/common/RelatedProducts'; 
// ---------------------------------

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
        "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664"
    ],
    highlights: [ "Vento Aero Fabric...", "Cool Storage Pockets...", /* ... */ ],
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
        <p><strong>Chất liệu:</strong></p>
        <ul class="list-disc list-inside space-y-1 mb-4">
            <li>80% Polyester tái chế</li>
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
    const [quantity, setQuantity] = useState(1);
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
    const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
    const mainImageRef = useRef(null);

    const { images, sizes, brand, sku, price, highlights, description } = mockProductData;
    const totalImages = images.length;

    // --- Effects ---
    useEffect(() => {
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

    // --- LOGIC LỌC SẢN PHẨM LIÊN QUAN (ĐÃ THÊM) ---
    const relatedProducts = useMemo(() => {
        // Yêu cầu: Cùng thể loại (Lấy 'Đồ Nam' từ breadcrumb 'Men')
        const currentCategoryTitle = "Đồ Nam"; 
        
        const targetCollection = mockCollections.find(
            c => c.title === currentCategoryTitle
        );

        if (!targetCollection) return [];

        // Yêu cầu: Không trùng lặp
        // Lọc dựa trên `productName` lấy từ slug (state)
        return targetCollection.products.filter(
            p => p.title.toLowerCase() !== productName.toLowerCase()
        );

    }, [productName]); // Chạy lại khi productName (từ slug) thay đổi
    // ----------------------------------------------------

    // --- Handlers ---
    const desktopThumbnailsVisible = 3;
    const isPrevDisabled = thumbnailStartIndex === 0;
    const isNextDisabled = thumbnailStartIndex >= totalImages - desktopThumbnailsVisible;
    const handlePrevThumbnail = () => setThumbnailStartIndex(prev => Math.max(0, prev - 1));
    const handleNextThumbnail = () => setThumbnailStartIndex(prev => Math.min(totalImages - desktopThumbnailsVisible, prev + 1));

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

    const handlePrevImage = () => setSelectedImageIndex(prev => Math.max(0, prev - 1));
    const handleNextImage = () => setSelectedImageIndex(prev => Math.min(totalImages - 1, prev + 1));

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

                            {/* Ống kính (Lens) */}
                            <div 
                                className={`absolute border-2 border-gray-400 ${isZooming && isDesktop ? 'block' : 'hidden'} pointer-events-none`}
                                style={{
                                    width: `${LENS_SIZE}px`,
                                    height: `${LENS_SIZE}px`,
                                    left: `${zoomPosition.x}px`,
                                    top: `${zoomPosition.y}px`,
                                    cursor: 'crosshair',
                                    backgroundColor: 'rgba(100, 100, 100, 0.2)'
                                }}
                            />
                        </div>

                        {/* Khung Zoom (chỉ hiển thị trên desktop) */}
                        <div 
                            className={`absolute left-[101%] top-0 border bg-white ${isZooming && isDesktop ? 'block' : 'hidden'} pointer-events-none`}
                            style={{
                                width: `${ZOOM_BOX_SIZE}px`,
                                height: `${ZOOM_BOX_SIZE}px`,
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
                            <div className="flex-1 grid grid-cols-4 gap-2">
                                {images.map((src, index) => (
                                    <img 
                                        key={index} 
                                        src={src} 
                                        alt={`Thumbnail ${index + 1}`} 
                                        className={`w-full h-auto object-cover border-2 cursor-pointer aspect-square
                                                    ${selectedImageIndex === index ? 'border-orange-500' : 'border-transparent'}`} 
                                        onClick={() => setSelectedImageIndex(index)} 
                                    />
                                ))}
                            </div>
                            <button onClick={handleNextImage} disabled={selectedImageIndex === totalImages - 1} className="p-2 rounded-full disabled:opacity-30">
                                <i className="fa fa-angle-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* --- COLUMN 2: PRODUCT INFO --- */}
                    <div className="w-full mt-6 lg:mt-0 order-3">
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

                        {/* Quantity & Actions */}
                        <div className="flex flex-col gap-4">
                            {/* Hàng 1: LUÔN LÀ LABEL */}
                            <label className="font-semibold">Số lượng:</label>
                            
                            {/* Hàng 2: INPUT (Chỉ Mobile) */}
                            <input 
                                type="number" 
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-full h-12 text-center border border-gray-300 rounded-full md:hidden" // Chỉ hiện trên mobile
                                min="1"
                            />
                            
                            {/* Hàng 3: INPUT + BUTTONS (Desktop) HOẶC BUTTONS (Mobile) */}
                            <div className="flex flex-row gap-2 w-full">
                                {/* Input cho Desktop */}
                                <input 
                                    type="number" 
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="hidden md:block w-20 h-12 text-center border border-gray-300 rounded-full" // Chỉ hiện trên desktop
                                    min="1"
                                />
                                
                                {/* Các nút bấm (chung) */}
                                <button 
                                    className="flex-1 h-12 bg-[#703fc8] text-white font-semibold rounded-full uppercase 
                                                hover:bg-opacity-90 transition-all text-sm cursor-pointer"
                                >
                                    Thêm vào giỏ hàng
                                </button>
                                <button className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0 hover:border-gray-500 transition-all cursor-pointer" aria-label="Thêm vào yêu thích">
                                    <i className="far fa-heart"></i>
                                </button>
                            </div>
                        </div>
                        {/* -------------------------------------------------- */}
                        
                        <hr className="my-6 border-t border-gray-300 md:hidden" />

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

                {/* --- 3. Detailed Description Section --- */}
                <div className="mt-16">
                    <div className="border-b border-gray-300">
                        <nav className="flex gap-4 -mb-px">
                            <button className="py-3 px-1 md:px-4 border-b-2 border-[#703fc8] font-semibold text-sm md:text-base">Mô tả chi tiết</button>
                            <button className="py-3 px-1 md:px-4 text-gray-600 hover:text-black border-b-2 border-transparent text-sm md:text-base">Bình luận</button>
                            <button className="py-3 px-1 md:px-4 text-gray-600 hover:text-black border-b-2 border-transparent text-sm md:text-base">Thành phần</button>
                        </nav>
                    </div>
                    <div className="mt-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
            </section>

            {/* --- 4. PHẦN SẢN PHẨM LIÊN QUAN (ĐÃ THÊM) --- */}
            <RelatedProducts products={relatedProducts} />
            {/* --------------------------------------------- */}

        </div>
    );
}