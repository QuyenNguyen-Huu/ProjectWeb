import React from 'react';
import Logo from '../../Item/Logo';
import NavIcon from './Navigation/NavIcon';
import NavBar from './Navigation/NavBar';

const MobileNav = ({ toggleForm, showForm, closing }) => {
    return (
        <>
            <nav>
                <a href="#boxMenuLeft" className="px-3.5 py-3.5 overflow-hidden block">
                    <i className="fa fa-bars text-black" style={{ fontSize: "20px" }}></i>
                </a>
            </nav>

            <div className='gobal-style'>
                <Logo />
                <NavIcon toggleForm={toggleForm} showForm={showForm} closing={closing} />
            </div>
            <NavBar />
        </>
    );
};

export default MobileNav;