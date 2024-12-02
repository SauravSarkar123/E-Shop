import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { CategoriesContext } from '../context/CategoriesContext';
import { CartContext } from '../context/CartContext';

const ProductListing = () => {
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);
  const { cart, addToCart, updateQuantity } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const categoryName = searchParams.get('category');
    const category = categories.find(
      (cat) => cat.name.toLowerCase() === categoryName?.toLowerCase()
    );
    setFilteredProducts(
      category
        ? products.filter((prod) => prod.categoryId === category.id && prod.status)
        : []
    );
  }, [searchParams, categories, products]);

  const handleProductClick = (product) =>
    navigate(`/productinfo?name=${encodeURIComponent(product.name)}`);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!cart[product.id] || cart[product.id].quantity < product.stock) {
      addToCart(product);
    }
  };

  const handleUpdateQuantity = (e, productId, newQuantity, stock) => {
    e.stopPropagation();
    if (newQuantity >= 0 && newQuantity <= stock) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-black mb-6">
          {searchParams.get('category') || 'Products'}
        </h1>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-3 flex flex-col cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-md w-full h-32 object-cover mb-3"
                />
                <h2 className="text-sm font-semibold text-gray-800 mb-1">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2">Rs. {product.price}</p>
                <p className="text-xs text-gray-500 mb-2">Stock: {product.stock}</p>
                {cart[product.id] ? (
                  <div className="flex items-center space-x-4 mt-auto">
                    <button
                      onClick={(e) =>
                        handleUpdateQuantity(e, product.id, cart[product.id].quantity - 1, product.stock)
                      }
                      className="w-10 h-10 bg-red-500 text-white text-lg font-bold rounded-md flex items-center justify-center hover:bg-red-600"
                    >
                      -
                    </button>
                    <div className="w-16 h-10 bg-gray-200 rounded-md flex items-center justify-center border border-gray-300">
                      {cart[product.id].quantity}
                    </div>
                    <button
                      onClick={(e) =>
                        handleUpdateQuantity(e, product.id, cart[product.id].quantity + 1, product.stock)
                      }
                      className="w-10 h-10 bg-green-500 text-white text-lg font-bold rounded-md flex items-center justify-center hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="px-4 py-2 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600 mt-auto"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
