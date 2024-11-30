import React, { useState } from 'react';
import Header from '../components/Header';

const vegetables = [
  { id: 1, name: 'Tomato', cost: 100, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Potato', cost: 80, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Carrot', cost: 120, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Onion', cost: 60, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Cucumber', cost: 50, image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Cucumber', cost: 50, image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Cucumber', cost: 50, image: 'https://via.placeholder.com/150' },
];

const ProductListing = () => {
  const [cart, setCart] = useState({});
  const modifyCart = (id, action) =>
    setCart((prev) => {
      const quantity = prev[id] || 0;
      if (action === 'add') return { ...prev, [id]: 1 };
      if (action === 'increase') return { ...prev, [id]: quantity + 1 };
      if (action === 'decrease') return quantity > 1 ? { ...prev, [id]: quantity - 1 } : { ...prev, [id]: undefined };
    });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-black mb-6">Vegetable</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {vegetables.map(({ id, name, cost, image }) => (
            <div key={id} className="bg-white rounded-lg shadow-md p-3 flex flex-col">
              <img src={image} alt={name} className="rounded-md w-full h-32 object-cover mb-3" />
              <h2 className="text-sm font-semibold text-gray-800 mb-1">{name}</h2>
              <p className="text-sm text-gray-600 mb-2">Rs. {cost}</p>
              {cart[id] ? (
                <div className="flex items-center space-x-4 mt-auto">
                  <button
                    onClick={() => modifyCart(id, 'decrease')}
                    className="w-10 h-10 bg-red-500 text-white text-lg font-bold rounded-md flex items-center justify-center hover:bg-red-600"
                  >
                    -
                  </button>
                  <div className="w-16 h-10 bg-gray-200 rounded-md flex items-center justify-center border border-gray-300 flex-grow">
                    <span className="text-lg text-gray-800 font-medium">{cart[id]}</span>
                  </div>
                  <button
                    onClick={() => modifyCart(id, 'increase')}
                    className="w-10 h-10 bg-green-500 text-white text-lg font-bold rounded-md flex items-center justify-center hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => modifyCart(id, 'add')}
                  className="px-4 py-2 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600 mt-auto"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
