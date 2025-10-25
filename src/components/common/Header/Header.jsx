import React, { useState } from 'react'
// BƯỚC 1: Import useLocation từ react-router-dom
import { useLocation } from 'react-router-dom';
import useIsDesktop from '../../../hooks/useIsDesktop';
import useScrollDirection from '../../../hooks/useScrollDirection';
import MobileNav from './Nav/Mobile/MobileNav';
import DesktopNav from './Nav/Desktop/DesktopNav';
import './css/NavIconLogo.css';
import './css/NavBar.css';


export default function Header() {
    const isDesktop = useIsDesktop();
    const show = useScrollDirection();
    const [showForm, setShowForm] = useState(false);
    const [closing, setClosing] = useState(false);

    // BƯỚC 2: Lấy thông tin vị trí (URL) hiện tại
    const location = useLocation();

    // BƯỚC 3: Kiểm tra xem có phải là trang ProductsPage (trang category) không
    // Logic: KHÔNG phải trang chủ VÀ KHÔNG phải trang chi tiết sản phẩm
    const isProductsPage = location.pathname !== '/' && !location.pathname.endsWith('.html');

    // Toggle form search
    const toggleForm = () => {
        if (showForm) {
            setClosing(true)
            setShowForm(false);
            setTimeout(() => {
                setClosing(false);
            }, 300);
        } else {
            setShowForm(true);
            setClosing(false)
        }
    };
    const scrollClass = show ? "translate-y-0" : "-translate-y-full";

    return (
        <header className={`header ${scrollClass}`}>
            <div className="container-main">
                {!isDesktop ? (
                    <MobileNav toggleForm={toggleForm} showForm={showForm} closing={closing} />

                ) : (
                    // BƯỚC 4: Truyền tín hiệu "hideNavBar" xuống DesktopNav
                    <DesktopNav hideNavBar={isProductsPage} />
                )}
            </div>
        </header>
    )
}