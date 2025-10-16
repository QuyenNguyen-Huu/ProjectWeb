import React, { useState } from 'react';
import Logo from '../../Item/Logo';
import NavIcon from './Navigation/NavIcon';
import NavBar from './Navigation/NavBar';

const DesktopNav = () => {
    return (
        <>
            {/* Logo + Nav Icon */}
            <div className='gobal-style'>
                <Logo />
                <NavIcon />
            </div>

            {/* Nav Bar */}
            <NavBar />
        </>
    );
};

export default DesktopNav;