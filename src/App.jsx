import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LayoutHeader from './components/layout/LayoutHeader';
import LayoutButtonScroll from './components/layout/LayoutButtonScroll';
import LayoutFooter from './components/layout/LayoutFooter';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col overflow-hidden">
        {/* Header luôn hiển thị */}
        <LayoutHeader />

        {/* Routes phải bọc các Route */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>

        {/* Footer & nút scroll luôn hiển thị */}
        <LayoutFooter />
        <LayoutButtonScroll />z
      </div>
    </Router>
  );
}

export default App;
