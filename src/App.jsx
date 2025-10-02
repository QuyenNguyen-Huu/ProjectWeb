import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import BackToTopButton from './components/layout/BackToTopButton';
import MobileBottomPanel from './components/layout/MobileBottomPanel';
import HomePage from './pages/HomePage';
import './App.css';
import LayoutHeader from './components/layout/LayoutHeader';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <LayoutHeader />

        {/* <main className="flex-grow pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<div className="p-8 text-center">Products Page (Coming Soon)</div>} />
            <Route path="/about" element={<div className="p-8 text-center">About Page (Coming Soon)</div>} />
            <Route path="/contact" element={<div className="p-8 text-center">Contact Page (Coming Soon)</div>} />
            <Route path="/search" element={<div className="p-8 text-center">Search Page (Coming Soon)</div>} />
            <Route path="/cart" element={<div className="p-8 text-center">Cart Page (Coming Soon)</div>} />
            <Route path="/profile" element={<div className="p-8 text-center">Profile Page (Coming Soon)</div>} />
            <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
          </Routes>
        </main>
        
        <Footer />
        <BackToTopButton />
        <MobileBottomPanel /> */}

        {/* Test scroll */}
        {/* <div className="mt-20 p-4 space-y-6">
          {Array.from({ length: 40 }).map((_, i) => (
            <p key={i} className="p-2 bg-gray-100 rounded">
              Nội dung số {i + 1}
            </p>
          ))}
        </div> */}
      </div>
    </Router>
  );
}

export default App;
