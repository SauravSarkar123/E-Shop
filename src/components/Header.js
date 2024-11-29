// Header.js
import React from 'react';
import { FaShoppingCart, FaCog } from 'react-icons/fa';

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          {/* <img
            src="/path-to-your-logo.png"
            alt="Logo"
            className="h-8 w-8 mr-2"
          /> */}
          <span>LOGO</span>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button className="hover:text-blue-200 transition duration-200">
            <FaShoppingCart size={20} />
          </button>
          <button className="hover:text-blue-200 transition duration-200">
            <FaCog size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
