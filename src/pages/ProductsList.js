import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access the passed state.
import { FaEdit, FaTrash } from 'react-icons/fa';
import Header from '../components/Header';
import { ProductsContext } from '../context/ProductsContext';
const ProductsList = () => {
  const location = useLocation(); // Access location to get the state.
  const { categoryId } = location.state || {}; // Get the categoryId from state, or fallback to undefined.
  const { products } = useContext(ProductsContext);

  // If no categoryId is passed, show an empty array or handle it gracefully.
  const filteredProducts = categoryId
    ? products.filter((product) => product.categoryId === Number(categoryId))
    : [];

  const truncateText = (text, limit = 5) =>
    text.split(' ').slice(0, limit).join(' ') + (text.split(' ').length > limit ? '...' : '');

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Products List</h1>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:bg-purple-700">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Products
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-gray-600">
            <thead className="bg-gray-300 text-gray-700">
              <tr>
                {['Image', 'Name', 'Description', 'Price (₹)', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-center font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-3">No products found for this category.</td>
                </tr>
              ) : (
                filteredProducts.map(({ id, image, name, description, price }) => (
                  <tr key={id} className="hover:bg-gray-100">
                    <td className="px-4 py-3 text-center">
                      <img src={image} alt={name} className="w-10 h-10 rounded-md mx-auto" />
                    </td>
                    <td className="px-4 py-3 text-center font-medium">{name}</td>
                    <td className="px-4 py-3 text-center">{truncateText(description)}</td>
                    <td className="px-4 py-3 text-center">{price}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-3 justify-center">
                        <button className="text-blue-500 hover:text-blue-700"><FaEdit size={18} /></button>
                        <button className="text-red-500 hover:text-red-700"><FaTrash size={18} /></button>
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
