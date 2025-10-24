import React, { useState } from 'react'
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
                    <DesktopNav />
                )}
            </div>
        </header>
    )
}
