import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LayoutHeader from './components/layout/LayoutHeader';
import LayoutButtonScroll from './components/layout/LayoutButtonScroll';
import LayoutFooter from './components/layout/LayoutFooter';
import LayoutMobileNav from './components/common/PanelButtom/LayoutMobileNav';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col overflow-hidden">
        {/* Header luôn hiển thị */}
        <LayoutHeader />

        {/* Routes phải bọc các Route */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:slug" element={<ProductsPage />} />
        </Routes>

        {/* Footer & nút scroll luôn hiển thị */}
        <LayoutFooter />
        <LayoutButtonScroll />
        <LayoutMobileNav />
      </div>
    </Router>
  );
}

export default App;
