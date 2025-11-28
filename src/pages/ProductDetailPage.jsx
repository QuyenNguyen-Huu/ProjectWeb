// --- Import useMemo, Carousel và Card ---
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useIsDesktop from "@/hooks/useIsDesktop";
import Breadcrumb from "@/features/products/Categories-Products/Breadcrumb";
// --- PopUp ---
import mockCollections from "@/features/home/Collections/data/mockCollections"; 
import RelatedProducts from '@/components/common/RelatedProducts'; 
import { formatCurrency } from '@/utils/formatCurrency';

import { useCart } from '../context/cartContext';
// Import "database"
import apiClient from '@/api/apiClient'; //
import {  getClothingSizeChartHTML, getShoesSizeChartHTML } from '@/data/products';
// Import components cho "Sản phẩm liên quan"
import ProductCarousel from '@/components/common/ProductCarousel';
import ProductCard from '@/components/common/ProductCard';
import { useLanguage } from "@/context/LanguageContext";
// Import track category sản phẩm
import { trackViewedProduct } from '@/utils/recommendationHelpers';

// --- Cấu hình Zoom ---
const LENS_SIZE = 180;
const ZOOM_BOX_SIZE = 500;
const ZOOM_SCALE = ZOOM_BOX_SIZE / LENS_SIZE;
// ---------------------

// --- Hàm helper để tạo HTML ---
// Hàm này tạo bảng HTML cho tab "Thành phần"
const generateCompositionHtml = (product, t) => {
    // Helper để biến mảng thành <li>
    const createList = (items) => {
        if (!items || items.length === 0) return `<li>${t('common.loading')}...</li>`;
        return items.map(item => `<li>- ${item}</li>`).join('');
    };
    
    // Lấy highlights theo ngôn ngữ
    const highlights = t(product, 'highlights') || product.highlights || [];
    
    return `
      <table class="w-full text-left border-collapse border border-gray-300">
        <tbody>
          <tr class="border-b border-gray-300"><td class="p-2 border-r border-gray-300 font-semibold w-1/3">${t('product.card.viewDetail')}</td><td class="p-2">${t(product, 'name')}</td></tr>
          <tr class="border-b border-gray-300"><td class="p-2 border-r border-gray-300 font-semibold">${t('product.detail.brand')}</td><td class="p-2">${product.brand}</td></tr>
          <tr class="border-b border-gray-300"><td class="p-2 border-r border-gray-300 font-semibold">${t('product.filter.size')}</td><td class="p-2"><ul class="list-none">${createList(product.sizes)}</ul></td></tr>
          <tr><td class="p-2 border-r border-gray-300 font-semibold">${t('product.detail.highlights')}</td><td class="p-2"><ul class="list-none">${createList(highlights)}</ul></td></tr>
        </tbody>
      </table>
    `;
};

// Hàm này tạo HTML cho tab "Mô tả chi tiết"
const generateDescriptionHtml = (product, t) => {
    let html = '';
    const descriptionContent = product.description_content || [];
    
    descriptionContent.forEach(item => {
        if (item.type === 'paragraph') {
            const title = t(item, 'title') || item.title || '';
            const content = t(item, 'content') || item.content || '';
            html += `<h4 class="font-bold text-lg my-3">${title}</h4><p class="mb-4">${content}</p>`;
        } else if (item.type === 'image') {
            html += `<img src="${item.src}" alt="${item.alt || t(product, 'name')}" class="my-4 w-full h-auto rounded" />`;
        }
    });
    if (product.category === 'clothing') {
        html += getClothingSizeChartHTML(t);
    } else if (product.category === 'shoes') {
        html += getShoesSizeChartHTML(t);
    }
    return html;
};
// ----------------------------------------

export default function ProductDetailPage() {
    const isDesktop = useIsDesktop();
    const { productSlug } = useParams();
    const { t, language } = useLanguage();

    // Tìm sản phẩm dựa trên slug, bỏ ".html"
    const cleanSlug = productSlug.replace(/.html$/, '');
    const [product, setProduct] = useState(null); // 'product' bây giờ là state
    const [isLoading, setIsLoading] = useState(true); // Thêm state loading
    const [relatedProducts, setRelatedProducts] = useState([]);

    // --- State ---
    const [productName, setProductName] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [quantityInput, setQuantityInput] = useState(String(quantity));
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
    const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
    const [activeTab, setActiveTab] = useState('description');

    const mainImageRef = useRef(null);
    const mobileScrollContainerRef = useRef(null);
    
    const { addToCart } = useCart();

    // --- Effects ---
    useEffect(() => {
        const fetchProductData = async () => {
            if (!productSlug) return;

            setIsLoading(true);
            setProduct(null); // Xóa sản phẩm cũ
            setRelatedProducts([]);
            const cleanSlug = productSlug.replace(/.html$/, '');

            try {
                // 1. Gọi API bằng apiClient
                const response = await apiClient.getProductBySlug(cleanSlug);

                // --- BÓC TÁCH DỮ LIỆU ---
                const productData = response.mainProduct;       // Lấy sản phẩm chính
                const relatedData = response.relatedProducts || []; // Lấy sản phẩm liên quan

                // Kiểm tra an toàn
                if (!productData || !productData.name) {
                    throw new Error("Sản phẩm không tồn tại hoặc dữ liệu lỗi");
                }
                setProduct(productData); // Cập nhật state sản phẩm

                // 2. Fetch sản phẩm liên quan (Sau khi đã có category của sản phẩm chính)
                if (productData && productData.category) {
                    trackViewedProduct(productData); // Track
                    const relatedData = await apiClient.getProducts({ 
                        category: productData.category
                    });
                    // Lọc sản phẩm hiện tại ra khỏi danh sách liên quan
                    setRelatedProducts(
                        relatedData
                            .filter(p => p.slug !== cleanSlug)
                            .map(p => ({ // Chuyển đổi data cho ProductCard
                                id: p.id,
                                product: p, // Thêm product object để dùng với t()
                                title: p.name,
                                href: `/${p.slug}.html`,
                                images: p.images_card,
                                price: p.price,
                                oldPrice: p.oldPrice,
                                salePercent: p.salePercent,
                            }))
                    );
                }

                window.scrollTo(0, 0);
                
                const cleanedName = productData.name; 
                let breadcrumbName = cleanedName;
                if (breadcrumbName.length > 40) breadcrumbName = breadcrumbName.substring(0, 40) + '...';
                
                // Dùng name_en cho tiếng Anh, name cho tiếng Việt
                const productNameDisplay = language === 'en' && productData.name_en 
                    ? productData.name_en 
                    : cleanedName;
                
                let breadcrumbNameDisplay = productNameDisplay;
                if (breadcrumbNameDisplay.length > 40) {
                    breadcrumbNameDisplay = breadcrumbNameDisplay.substring(0, 40) + '...';
                }
                
                // Dịch category name
                const categoryName = productData.category || 'products';
                const categoryDisplay = language === 'en' 
                    ? (categoryName === 'clothing' ? 'Clothing' : 
                       categoryName === 'shoes' ? 'Shoes' : 
                       categoryName === 'accessories' ? 'Accessories' : categoryName)
                    : categoryName;
                
                setBreadcrumbItems([
                    { name: 'Trang chủ', nameKey: 'common.home', link: '/' },
                    { name: categoryDisplay, link: `/${categoryName}` },
                    { name: breadcrumbNameDisplay, link: `/${productData.slug}.html` }
                ]);
                
                if (productData.sizes && productData.sizes.length > 0) {
                    setSelectedSize(productData.sizes[0]);
                }
                setSelectedImageIndex(0);
                setThumbnailStartIndex(0);
                setQuantity(1);
                setQuantityInput("1");
                
            } catch (error) {
                setProduct(null); // Đánh dấu là không tìm thấy
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductData();
        
    }, [productSlug, t]); // Thêm t vào dependency để re-fetch khi language thay đổi

    useEffect(() => {
        // ... (Effect cuộn gallery mobile... không đổi) ...
        if (isDesktop || !mobileScrollContainerRef.current || !product) return;
        const thumbnailEl = document.getElementById(`mobile-thumb-${selectedImageIndex}`);
        if (thumbnailEl) {
            thumbnailEl.scrollIntoView({
                behavior: 'smooth', block: 'nearest', inline: 'nearest'
            });
        }
    }, [selectedImageIndex, isDesktop, product]);

    // --- Effect để cuộn gallery mobile ---
    useEffect(() => {
        // Chỉ chạy trên mobile và khi ref đã sẵn sàng
        if (isDesktop || !mobileScrollContainerRef.current) return;

        // Tìm ảnh thumbnail tương ứng
        const thumbnailEl = document.getElementById(`mobile-thumb-${selectedImageIndex}`);
        
        if (thumbnailEl) {
            thumbnailEl.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
        }
    }, [selectedImageIndex, isDesktop]); // Chạy mỗi khi ảnh được chọn thay đổi

    // --- Tạo HTML động cho tab (phụ thuộc vào product và ngôn ngữ) ---
    const descriptionHtml = useMemo(() => {
        if (!product) return '';
        return generateDescriptionHtml(product, t);
    }, [product, t]);
    
    const compositionHtml = useMemo(() => {
        if (!product) return '';
        return generateCompositionHtml(product, t);
    }, [product, t]);

    if (isLoading) {
        return (
            <div className={`${isDesktop ? 'mt-[80px]' : 'mt-[54px]'} container mx-auto px-4 py-8 text-center`}>
                <h1 className="text-2xl font-bold">{t('common.loading')}</h1>
            </div>
        );
    }

    if (!product) {
        return (
            <div className={`${isDesktop ? 'mt-[80px]' : 'mt-[54px]'} container mx-auto px-4 py-8 text-center`}>
                <h1 className="text-2xl font-bold">404 - {t('product.detail.notFoundTitle')}</h1>
                <p className="mt-4">{t('product.detail.notFoundMsg')}</p>
                <a href="/" className="view-more-btn mt-6">{t('product.detail.backHome')}</a>
            </div>
        );
    }

    // --- Handlers ---
    // (Desktop thumbs handlers... cần 'product')
    const totalImages = product ? product.images_detail.length : 0;
    const desktopThumbnailsVisible = 3;
    const isPrevDisabled = thumbnailStartIndex === 0;
    const isNextDisabled = thumbnailStartIndex >= totalImages - desktopThumbnailsVisible;
    const handlePrevThumbnail = () => setThumbnailStartIndex(prev => Math.max(0, prev - 1));
    const handleNextThumbnail = () => setThumbnailStartIndex(prev => Math.min(totalImages - desktopThumbnailsVisible, prev + 1));

    // --- THAY ĐỔI 5: Cập nhật Add to Cart ---
    const handleAddToCart = () => {
        if (!product) return; // Không làm gì nếu không có sản phẩm

        const productToAdd = {
            id: product.slug, // Dùng slug làm ID
            name: product.name, // Lưu tên tiếng Việt
            name_en: product.name_en, // Lưu tên tiếng Anh
            price: product.price,
            image: product.images_detail[0], // Lấy ảnh đầu tiên
            size: selectedSize // Lấy size đã chọn từ state
        };
        
        // Thêm số lượng (từ state)
        for (let i = 0; i < quantity; i++) {
            addToCart(productToAdd);
        }
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

    // (Mobile image handlers... cần 'totalImages')
    const handlePrevImage = () => setSelectedImageIndex(prev => Math.max(0, prev - 1));
    const handleNextImage = () => setSelectedImageIndex(prev => Math.min(totalImages - 1, prev + 1));
    
    // --- Handlers cho Ô số lượng ---
    const updateQuantity = (newVal) => {
        const numQty = parseInt(newVal, 10);
        
        if (isNaN(numQty) || numQty < 1) {
            // Nếu rỗng, NaN, hoặc 0 -> quay về giá trị cũ đã xác thực
            setQuantity(quantity); 
            setQuantityInput(String(quantity));
        } else {
            // Nếu là số hợp lệ
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
            e.preventDefault(); // Ngăn form submit (nếu có)
            e.target.blur(); // Kích hoạt sự kiện onBlur
        }
    };

    // Hàm cho nút bấm '+'
    const handleIncrement = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        setQuantityInput(String(newQty));
    };

    // Hàm cho nút bấm '-'
    const handleDecrement = () => {
        // Dùng `quantity` (giá trị đã xác thực) để tính toán
        const newQty = Math.max(1, quantity - 1); // Đảm bảo không xuống dưới 1
        setQuantity(newQty);
        setQuantityInput(String(newQty));
    };
    
    // --- Xử lý nếu không tìm thấy sản phẩm ---
    if (!product) {
        return (
            <div className={`${isDesktop ? 'mt-[80px]' : 'mt-[54px]'} container mx-auto px-4 py-8 text-center`}>
                <h1 className="text-2xl font-bold">{t('product.detail.notFoundTitle')}</h1>
                <p className="mt-4">{t('product.detail.notFoundMsg')}</p>
                <a href="/" className="view-more-btn mt-6">{t('product.detail.backHome')}</a>
            </div>
        );
    }

    // --- Render ---
    return (
        <div className={`${isDesktop ? 'mt-[80px]' : 'mt-[54px]'} font-["Montserrat",sans-serif]`}>
            <section className="bg-[#f4f4f4] py-5">
                <Breadcrumb breadcrumbItems={breadcrumbItems} />
            </section>
            <section className="products-container py-8">
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10">
                    {/* --- COLUMN 1: IMAGE GALLERY (Dùng product.images_detail) --- */}
                    <div className="relative flex flex-col lg:flex-row gap-4">
                        {/* Desktop Thumbs */}
                        <div className="hidden lg:flex lg:flex-col items-center gap-2">
                            <button onClick={handlePrevThumbnail} disabled={isPrevDisabled} className="p-2 text-lg disabled:opacity-30"><i className="fa fa-angle-up"></i></button>
                            <div className="flex flex-col gap-2">
                                {product.images_detail.slice(thumbnailStartIndex, thumbnailStartIndex + desktopThumbnailsVisible).map((src, i) => {
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
                            <img src={product.images_detail[selectedImageIndex]} alt="Main product" className="w-full h-auto object-cover border" />
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
                            className={`absolute left-[101%] top-0 border bg-white z-50 ${isZooming && isDesktop ? 'block' : 'hidden'} pointer-events-none`}
                            style={{
                                width: `${ZOOM_BOX_SIZE}px`, height: `${ZOOM_BOX_SIZE}px`,
                                backgroundImage: `url(${product.images_detail[selectedImageIndex]})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: `${imgDimensions.width * ZOOM_SCALE}px ${imgDimensions.height * ZOOM_SCALE}px`,
                                backgroundPosition: `${bgPosition.x}px ${bgPosition.y}px`
                            }}
                        />
                        {/* Mobile Thumbs */}
                        <div className="lg:hidden w-full order-2 mt-2 flex items-center">
                            {/* Nút lùi (trái) */}
                            <button onClick={handlePrevImage} disabled={selectedImageIndex === 0} className="p-2 rounded-full disabled:opacity-30">
                                <i className="fa fa-angle-left"></i>
                            </button>
                            <div 
                                ref={mobileScrollContainerRef} 
                                className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                            >
                                <div className="flex flex-nowrap gap-2 px-1">
                                    {product.images_detail.map((src, index) => (
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

                            {/* Nút tiến (phải) */}
                            <button onClick={handleNextImage} disabled={selectedImageIndex === totalImages - 1} className="p-2 rounded-full disabled:opacity-30">
                                <i className="fa fa-angle-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* --- COLUMN 2: PRODUCT INFO (Dùng product. ...) --- */}
                    <div className="w-full mt-6 lg:mt-0 order-3">
                        <h1 className="text-[26px] uppercase font-semibold mb-3 leading-tight">{t(product, 'name')}</h1>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                            <span>{t('product.detail.brand')}: <span className="font-semibold text-gray-800">{product.brand}</span></span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span>{t('product.detail.sku')}: <span className="font-semibold text-gray-800">{product.sku}</span></span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-6">{formatCurrency(product.price, language)}</div>
                        <div className="mb-6">
                            <label className="block text-md font-semibold mb-2">{t('product.detail.selectSize')}</label>
                            <div className="flex gap-2">
                                {product.sizes.map(size => (
                                    <button key={size} onClick={() => setSelectedSize(size)} className={`w-12 h-12 border rounded transition-colors hover:border-orange-500 focus:border-orange-500 focus:outline-none ${selectedSize === size ? 'border-orange-500 border-2' : 'border-gray-300'}`}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Actions (Không đổi) */}
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold">{t('product.detail.quantity')}</label>
                            <div className="relative w-full md:hidden">
                                <input type="text" inputMode="numeric" value={quantityInput} onChange={handleQuantityChange} onBlur={handleQuantityBlur} onKeyDown={handleQuantityKeyDown} className="w-full h-12 text-center border border-gray-300 rounded-full pr-10" />
                                <div className="absolute right-2 top-0 h-full flex flex-col justify-center">
                                    <button type="button" onClick={handleIncrement} className="text-gray-600 h-1/2 flex items-center justify-center px-1"><i className="fa fa-angle-up text-xs"></i></button>
                                    <button type="button" onClick={handleDecrement} className="text-gray-600 h-1/2 flex items-center justify-center px-1"><i className="fa fa-angle-down text-xs"></i></button>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 w-full">
                                <div className="relative hidden md:block w-20">
                                    <input type="text" inputMode="numeric" value={quantityInput} onChange={handleQuantityChange} onBlur={handleQuantityBlur} onKeyDown={handleQuantityKeyDown} className="w-full h-12 text-center border border-gray-300 rounded-full pr-6" />
                                    <div className="absolute right-1 top-0 h-full flex flex-col justify-center">
                                        <button type="button" onClick={handleIncrement} className="text-gray-600 h-1/2 flex items-center justify-center px-1"><i className="fa fa-angle-up text-xs"></i></button>
                                        <button type="button" onClick={handleDecrement} className="text-gray-600 h-1/2 flex items-center justify-center px-1"><i className="fa fa-angle-down text-xs"></i></button>
                                    </div>
                                </div>
                                <button onClick={handleAddToCart} className="flex-1 h-12 bg-[#703fc8] text-white font-semibold rounded-full uppercase hover:bg-opacity-90 transition-all text-sm cursor-pointer">
                                    {t('product.detail.addToCartBtn')}
                                </button>
                                <button className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0 hover:border-gray-500 transition-all cursor-pointer" aria-label={t('product.detail.addToWishlist')}>
                                    <i className="far fa-heart"></i>
                                </button>
                            </div>
                        </div>
                        
                        <hr className="my-6 border-t border-gray-300 md:hidden" />

                        {/* Đặc điểm nổi bật */}
                        <div className="mt-6">
                            <h3 className="font-bold text-red-500 mb-3 text-lg">{t('product.detail.highlights')}</h3>
                            <ul className="list-none space-y-2 text-gray-700">
                                {(t(product, 'highlights') || product.highlights || []).map((item, index) => (
                                    <li key={index}>- {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* --- 3. Detailed Description Section (Đã sửa) --- */}
                <div className="mt-16">
                    {isDesktop ? (
                        /* --- GIAO DIỆN DESKTOP --- */
                        <div>
                            <nav className="flex">
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={`py-3 px-6 text-sm font-semibold transition-all border
                                        ${activeTab === 'description' ? 'bg-[#673AB7] text-white border-[#673AB7]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                                >
                                    {t('product.detail.descriptionTab')}
                                </button>
                                <button
                                    onClick={() => setActiveTab('composition')}
                                    className={`py-3 px-6 text-sm font-semibold transition-all border
                                        ${activeTab === 'composition' ? 'bg-[#673AB7] text-white border-[#673AB7]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                                >
                                    {t('product.detail.compositionTab')}
                                </button>
                            </nav>
                            
                            <div className="mt-0 text-gray-700 leading-relaxed border border-gray-300 p-4">
                                {activeTab === 'description' && (
                                    <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                                )}
                                {activeTab === 'composition' && (
                                    <div dangerouslySetInnerHTML={{ __html: compositionHtml }} />
                                )}
                            </div>
                        </div>
                    ) : (
                        /* --- GIAO DIỆN MOBILE --- */
                        <div className="w-full">
                            <div className="border-t border-gray-300">
                                <button
                                    onClick={() => setActiveTab(activeTab === 'description' ? null : 'description')}
                                    className={`flex justify-between items-center w-full py-4 px-2
                                        ${activeTab === 'description' ? 'text-[#673AB7]' : 'text-gray-800'}`}
                                >
                                    <span className="font-semibold">{t('product.detail.descriptionTab')}</span>
                                    {activeTab !== 'description' && <i className="fa fa-angle-down text-gray-600"></i>}
                                </button>
                                <button
                                    onClick={() => setActiveTab(activeTab === 'composition' ? null : 'composition')}
                                    className={`flex justify-between items-center w-full py-4 px-2 border-b border-gray-300
                                        ${activeTab === 'composition' ? 'text-[#673AB7]' : 'text-gray-800'}`}
                                >
                                    <span className="font-semibold">{t('product.detail.compositionTab')}</span>
                                    {activeTab !== 'composition' && <i className="fa fa-angle-down text-gray-600"></i>}
                                </button>
                            </div>
                            <div className="mt-6 text-gray-700 leading-relaxed">
                                {activeTab === 'description' && (
                                    <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                                )}
                                {activeTab === 'composition' && (
                                    <div dangerouslySetInnerHTML={{ __html: compositionHtml }} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            {/* --- Sản phẩm liên quan --- */}
            {relatedProducts.length > 0 && (
                <section className="py-16">
                    <div className="collection_container">
                        <h2 className="section-title">{t('product.detail.relatedProducts')}</h2>
                        <ProductCarousel>
                            {relatedProducts.map((relatedProduct) => (
                                <div key={relatedProduct.id} className="product-carousel-item">
                                    <ProductCard
                                        product={relatedProduct.product}
                                        href={relatedProduct.href}
                                        title={relatedProduct.title}
                                        images={relatedProduct.images}
                                        price={relatedProduct.price}
                                        oldPrice={relatedProduct.oldPrice}
                                        salePercent={relatedProduct.salePercent}
                                        showAddToCart={false} // Giống như SaleProducts
                                    />
                                </div>
                            ))}
                        </ProductCarousel>
                    </div>
                </section>
            )}
        </div>
    );
}