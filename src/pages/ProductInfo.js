import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { ProductsContext } from '../context/ProductsContext';
import { CategoriesContext } from '../context/CategoriesContext';
import { CartContext } from '../context/CartContext'; // Import CartContext

const ProductInfo = () => {
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);
  const { cart, addToCart, updateQuantity } = useContext(CartContext); // Use CartContext
  const [searchParams] = useSearchParams();
  const productName = searchParams.get('name');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productName) {
      const foundProduct = products.find((p) => p.name === productName);
      setProduct(foundProduct);
    }
  }, [productName, products]);

  if (!product) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-red-500">Product not found!</h1>
        </div>
      </div>
    );
  }

  // Find the category name based on product's categoryId
  const category = categories.find((c) => c.id === product.categoryId);
  const categoryName = category ? category.name : 'Unknown Category';

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold text-black">
          {categoryName} / {product.name}
        </h1>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-80 object-cover rounded-md"
          />
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold text-gray-700">Rs. {product.price}</p>
            {cart[product.id] ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(product.id, cart[product.id].quantity - 1)} // Decrease quantity
                  className="w-10 h-10 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                >
                  -
                </button>
                <span className="w-16 h-10 bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center">
                  {cart[product.id].quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, cart[product.id].quantity + 1)} // Increase quantity
                  className="w-10 h-10 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)} // Add to cart
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
