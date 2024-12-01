import React, { useContext } from 'react';
import { FaShoppingCart, FaCog } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import CartContext

function Header() {
  const { cart } = useContext(CartContext); // Get cart from CartContext
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  // Calculate the number of distinct items in the cart
  const cartItemCount = Object.keys(cart).length;

  const handleCartClick = () => {
    if (location.pathname !== '/cart') {
      navigate('/cart'); // Navigate to /cart only if not already there
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <span>LOGO</span>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon with Badge */}
          <button
            className="relative hover:text-blue-200 transition duration-200"
            onClick={handleCartClick}
          >
            <FaShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Settings Icon */}
          <button className="hover:text-blue-200 transition duration-200">
            <FaCog size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
