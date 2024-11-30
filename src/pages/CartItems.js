import React, { useState } from 'react';
import Header from '../components/Header';

const CartItems = () => {
  const [cart, setCart] = useState({
    1: { name: 'Tomato', price: 100, image: 'https://via.placeholder.com/100', quantity: 2 },
    2: { name: 'Potato', price: 50, image: 'https://via.placeholder.com/100', quantity: 3 },
  });

  const modifyCart = (id, action) => {
    setCart((prev) => {
      const item = prev[id];
      if (action === 'increase') return { ...prev, [id]: { ...item, quantity: item.quantity + 1 } };
      if (action === 'decrease') {
        const newQuantity = item.quantity - 1;
        if (newQuantity > 0) return { ...prev, [id]: { ...item, quantity: newQuantity } };
        const { [id]: _, ...rest } = prev; // Remove item if quantity is 0
        return rest;
      }
    });
  };

  const totalPrice = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        {/* Page Heading */}
        <h1 className="text-2xl font-bold text-black mb-6">Cart Items</h1>

        {/* Cart Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            {Object.entries(cart).map(([id, item]) => (
              <div
                key={id}
                className="flex items-center bg-white shadow-md rounded-md p-4 gap-4"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                {/* Product Details */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">Rs. {item.price}</p>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => modifyCart(id, 'decrease')}
                    className="w-8 h-8 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => modifyCart(id, 'increase')}
                    className="w-8 h-8 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full md:w-1/3 bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
            <div className="space-y-2">
              {Object.entries(cart).map(([id, item]) => (
                <div key={id} className="flex justify-between text-gray-700">
                  <span>{item.name}</span>
                  <span>Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            {/* Total Price */}
            <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-bold text-gray-800">
              <span>Total Price</span>
              <span>Rs. {totalPrice}</span>
            </div>
            {/* Place Order Button */}
            <button
              className="w-full bg-purple-500 text-white font-bold py-3 rounded-md mt-6 hover:bg-purple-600"
              onClick={() => alert('Order placed successfully!')}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
