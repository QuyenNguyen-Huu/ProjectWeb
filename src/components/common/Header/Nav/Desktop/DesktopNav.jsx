import React from 'react'; // Bỏ useState vì không còn dùng
import Logo from '../../Item/Logo';
import NavIcon from './Navigation/NavIcon';
import NavBar from './Navigation/NavBar';

// BƯỚC 1: Nhận prop "hideNavBar"
const DesktopNav = ({ hideNavBar }) => {
    return (
        <>
            {/* Logo + Nav Icon (Luôn hiển thị) */}
            <div className='gobal-style'>
                <Logo />
                <NavIcon />
            </div>

            {/* Nav Bar (Chỉ hiển thị khi hideNavBar là false) */}
            {!hideNavBar && <NavBar />}
        </>
    );
};

export default DesktopNav;