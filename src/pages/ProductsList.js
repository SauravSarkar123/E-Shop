import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Header from '../components/Header';
import { ProductsContext } from '../context/ProductsContext';

const ProductsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryId } = location.state || {};
  const { products, updateProducts } = useContext(ProductsContext);

  // Filter products based on category
  const filteredProducts = categoryId
    ? products.filter((product) => product.categoryId === Number(categoryId))
    : [];

  // Toggle product status
  const toggleStatus = (id) =>
    updateProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, status: !product.status } : product
      )
    );

  // Truncate text utility function
  const truncateText = (text, limit = 5) =>
    text.split(' ').slice(0, limit).join(' ') + (text.split(' ').length > limit ? '...' : '');

  // Handle product deletion
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      const updatedProducts = products.filter((product) => product.id !== id);
      updateProducts(updatedProducts); // Update context
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Products List</h1>
          <button
            onClick={() => navigate('/addproduct', { state: { categoryId } })}
            className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:bg-purple-700"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Products
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-gray-600">
            <thead className="bg-gray-300 text-gray-700">
              <tr>
                {[
                  'Image',
                  'Name',
                  'Description',
                  'Price (₹)',
                  'Stock',
                  'Sales (₹)',
                  'Status',
                  'Actions',
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-center font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center px-4 py-3">No products found for this category.</td>
                </tr>
              ) : (
                filteredProducts.map(({ id, image, name, description, price, stock, sales, status }) => (
                  <tr key={id} className="hover:bg-gray-100">
                    <td className="px-4 py-3 text-center">
                      <img src={image} alt={name} className="w-10 h-10 rounded-md mx-auto" />
                    </td>
                    <td className="px-4 py-3 text-center font-medium">{name}</td>
                    <td className="px-4 py-3 text-center">{truncateText(description)}</td>
                    <td className="px-4 py-3 text-center">{price}</td>
                    <td className="px-4 py-3 text-center">{stock}</td>
                    <td className="px-4 py-3 text-center">{sales}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleStatus(id)}
                        className={`w-10 h-5 rounded-full flex items-center mx-auto ${status ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${status ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-3 justify-center">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaEdit size={18} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(id)}
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
