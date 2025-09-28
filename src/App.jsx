import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackToTopButton from './components/layout/BackToTopButton';
import MobileBottomPanel from './components/layout/MobileBottomPanel';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pb-16 md:pb-0">
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
        <MobileBottomPanel />
      </div>
    </Router>
  );
}

export default App;
