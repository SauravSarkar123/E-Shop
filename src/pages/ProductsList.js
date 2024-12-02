import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ProductsContext } from '../context/ProductsContext';

const ProductsList = () => {
  const { state } = useLocation(), { categoryId } = state || {};
  const { products, updateProducts } = useContext(ProductsContext);
  const navigate = useNavigate();

  // Redirect back navigation to /categorylist
  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault(); // Prevent default browser back navigation
      navigate('/categorylist'); // Redirect to /categorylist
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState); // Cleanup the listener
    };
  }, [navigate]);

  const filteredProducts = categoryId
    ? products.filter((p) => p.categoryId === Number(categoryId))
    : [];

  const toggleStatus = (id) =>
    updateProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status: !p.status } : p)));

  const truncateText = (text, limit = 5) =>
    text.split(' ').slice(0, limit).join(' ') + (text.split(' ').length > limit ? '...' : '');

  const handleDelete = (id) =>
    window.confirm('Are you sure you want to delete this product?') &&
    updateProducts(products.filter((p) => p.id !== id));

  const navigateToAddProduct = () => navigate('/addproduct', { state: { categoryId } });

  const navigateToUpdateProduct = (id, product) =>
    navigate('/updateproduct', { state: { productId: id, product, categoryId } });

  const tableHeaders = [
    'Image',
    'Name',
    'Description',
    'Price (₹)',
    'Stock',
    'Sales (₹)',
    'Status',
    'Actions',
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Products List</h1>
          <button
            onClick={navigateToAddProduct}
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
                {tableHeaders.map((h) => (
                  <th key={h} className="px-4 py-3 text-center font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center px-4 py-3">No products found for this category.</td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-100">
                    <td className="px-4 py-3 text-center"><img src={p.image} alt={p.name} className="w-10 h-10 rounded-md mx-auto" /></td>
                    <td className="px-4 py-3 text-center font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-center">{truncateText(p.description)}</td>
                    <td className="px-4 py-3 text-center">{p.price}</td>
                    <td className="px-4 py-3 text-center">{p.stock}</td>
                    <td className="px-4 py-3 text-center">{p.sales}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleStatus(p.id)}
                        className={`w-10 h-5 rounded-full flex items-center mx-auto ${p.status ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${p.status ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => navigateToUpdateProduct(p.id, p)}
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(p.id)}
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
