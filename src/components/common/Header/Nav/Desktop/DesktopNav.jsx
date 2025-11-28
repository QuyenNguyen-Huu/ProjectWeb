// DesktopNav.jsx
import React from 'react';
import Logo from '../../Item/Logo';
import NavIcon from './Navigation/NavIcon';
import NavBar from './Navigation/NavBar';

// Nhận toggleForm
const DesktopNav = ({ hideNavBar, toggleForm }) => {
    return (
        <>
            <div className='gobal-style'>
                <Logo />
                {/* Truyền toggleForm vào NavIcon */}
                <NavIcon toggleForm={toggleForm} />
            </div>

            {!hideNavBar && <NavBar />}
        </>
    );
};

export default DesktopNav;