import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LayoutHeader from './components/layout/LayoutHeader';
import LayoutButtonScroll from './components/layout/LayoutButtonScroll';
import LayoutFooter from './components/layout/LayoutFooter';
import LayoutMobileNav from './components/common/PanelButtom/LayoutMobileNav';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
// Đảm bảo bạn đã import trang chi tiết sản phẩm chúng ta đã tạo
import ProductDetailPage from './pages/ProductDetailPage'; 
import CartPage from './pages/CartPage';

function App() {
  return (

      <div className="min-h-screen flex flex-col overflow-hidden">
        <LayoutHeader />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/cart" element={<CartPage />} />

          {/* Route cho Chi tiết Sản phẩm (Product Detail)
            Route này sẽ bắt bất kỳ URL nào có dạng /:productSlug.html */}
          <Route path="/:productSlug.html" element={<ProductDetailPage />} />

          {/* Route cho Trang Danh mục (Category) - nested paths
            Bắt các URL như /men/shirt, /women/run-shoes, etc. */}
          <Route path="/:category/:subcategory" element={<ProductsPage />} />

          {/* Route cho Trang Danh mục (Category) - single level
            Route này sẽ bắt tất cả các URL còn lại KHÔNG có .html
            Ví dụ: /do-nam, /sale... */}
          <Route path="/:slug" element={<ProductsPage />} />
        </Routes>
        
        <LayoutFooter />
        <LayoutButtonScroll />
        <LayoutMobileNav />
      </div>
    
  );
}

export default App;