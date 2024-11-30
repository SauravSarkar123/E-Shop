import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Header from '../components/Header';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, image: 'https://via.placeholder.com/50', name: 'Vegetables', stock: 20, sales: 5000, status: true },
    { id: 2, image: 'https://via.placeholder.com/50', name: 'Fruits', stock: 15, sales: 3000, status: false },
    { id: 3, image: 'https://via.placeholder.com/50', name: 'Dairy Products', stock: 30, sales: 10000, status: true },
  ]);

  const toggleStatus = (id) => setCategories((prev) => prev.map((cat) => (cat.id === id ? { ...cat, status: !cat.status } : cat)));

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">Categories List</h1>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:bg-purple-700 transition">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Category
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-gray-600">
            <thead className="bg-gray-300 text-gray-700">
              <tr>{['Image', 'Name', 'Stock', 'Sales', 'Status', 'Actions'].map((header) => <th key={header} className="px-4 py-3 text-center font-semibold">{header}</th>)}</tr>
            </thead>
            <tbody>
              {categories.map(({ id, image, name, stock, sales, status }) => (
                <tr key={id} className="hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-3 text-center"><img src={image} alt={name} className="w-10 h-10 rounded-md object-cover mx-auto" /></td>
                  <td className="px-4 py-3 text-center font-medium">{name}</td>
                  <td className="px-4 py-3 text-center">{stock}</td>
                  <td className="px-4 py-3 text-center">₹ {sales.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleStatus(id)} className={`w-10 h-5 rounded-full flex items-center mx-auto ${status ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <span className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${status ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-3 justify-center">
                      <button className="text-blue-500 hover:text-blue-700"><FaEdit size={18} /></button>
                      <button className="text-red-500 hover:text-red-700"><FaTrash size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
