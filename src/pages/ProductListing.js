import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ProductsContext } from '../context/ProductsContext';
import { CategoriesContext } from '../context/CategoriesContext';

const ProductListing = () => {
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    if (categoryId) {
      const filtered = products.filter(
        (product) => product.categoryId === parseInt(categoryId, 10)
      );
      setFilteredProducts(filtered);
    }
  }, [categoryId, products]);

  const modifyCart = (id, action) =>
    setCart((prev) => {
      const quantity = prev[id] || 0;
      if (action === 'add') return { ...prev, [id]: 1 };
      if (action === 'increase') return { ...prev, [id]: quantity + 1 };
      if (action === 'decrease') return quantity > 1 ? { ...prev, [id]: quantity - 1 } : { ...prev, [id]: undefined };
    });

  const categoryName = categories.find((cat) => cat.id === parseInt(categoryId, 10))?.name || 'Products';

  const handleProductClick = (product) => {
    navigate(`/productinfo?name=${encodeURIComponent(product.name)}`);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-black mb-6">{categoryName}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-3 flex flex-col cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <img src={product.image} alt={product.name} className="rounded-md w-full h-32 object-cover mb-3" />
              <h2 className="text-sm font-semibold text-gray-800 mb-1">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">Rs. {product.price}</p>
              {cart[product.id] ? (
                <div className="flex items-center space-x-4 mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      modifyCart(product.id, 'decrease');
                    }}
                    className="w-10 h-10 bg-red-500 text-white text-lg font-bold rounded-md flex items-center justify-center hover:bg-red-600"
                  >
                    -
                  </button>
                  <div className="w-16 h-10 bg-gray-200 rounded-md flex items-center justify-center border border-gray-300 flex-grow">
                    <span className="text-lg text-gray-800 font-medium">{cart[product.id]}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      modifyCart(product.id, 'increase');
                    }}
                    className="w-10 h-10 bg-green-500 text-white text-lg font-bold rounded-md flex items-center justify-center hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    modifyCart(product.id, 'add');
                  }}
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
