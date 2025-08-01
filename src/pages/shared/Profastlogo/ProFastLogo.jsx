import React from 'react';
import logo from '../../../assets/logo.png';
import {  NavLink } from 'react-router'; // ✅ ঠিক জায়গা থেকে import

const ProFastLogo = () => {
    return (
        <NavLink to="/"> {/* ✅ spelling ঠিক */}
            <div className="flex items-end">
                <img className="mr-2 h-10" src={logo} alt="ProFast Logo" />
                <p className="text-4xl font-extrabold -ml-2">ProFast</p>
            </div>
        </NavLink>
    );
};

export default ProFastLogo;
