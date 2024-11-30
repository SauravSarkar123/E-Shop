import React, { useState } from 'react';
import Header from '../components/Header';

const ProductInfo = () => {
  const [cart, setCart] = useState({});
  const product = {
    id: 1,
    name: 'Tomato',
    description:
      'Tomatoes are rich in nutrients such as vitamin C, potassium, folate, and antioxidants, making them a healthy choice for cooking and salads.Tomatoes are rich in nutrients such as vitamin C, potassium, folate, and antioxidants, making them a healthy choice for cooking and salads.Tomatoes are rich in nutrients such as vitamin C, potassium, folate, and antioxidants, making them a healthy choice for cooking and salads.',
    cost: 100,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?cs=srgb&dl=pexels-pixabay-533280.jpg&fm=jpg',
  };

  const modifyCart = (id, action) =>
    setCart((prev) => {
      const quantity = prev[id] || 0;
      return action === 'add'
        ? { ...prev, [id]: 1 }
        : action === 'increase'
        ? { ...prev, [id]: quantity + 1 }
        : quantity > 1
        ? { ...prev, [id]: quantity - 1 }
        : { ...prev, [id]: undefined };
    });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold text-black">Vegetable / {product.name}</h1>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-80 object-cover rounded-md shadow-md" />
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold text-gray-700">Rs. {product.cost}</p>
            {cart[product.id] ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => modifyCart(product.id, 'decrease')}
                  className="w-10 h-10 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                >
                  -
                </button>
                <span className="w-16 h-10 bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center">
                  {cart[product.id]}
                </span>
                <button
                  onClick={() => modifyCart(product.id, 'increase')}
                  className="w-10 h-10 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => modifyCart(product.id, 'add')}
                className="px-6 py-3 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
