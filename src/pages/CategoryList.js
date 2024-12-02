import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { CategoriesContext } from '../context/CategoriesContext';
import { ProductsContext } from '../context/ProductsContext';

const CategoriesPage = () => {
  const { categories, updateCategories } = useContext(CategoriesContext);
  const { products } = useContext(ProductsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      // Always redirect to /categorylist on back/forward button press
      navigate('/categorylist');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const toggleStatus = (id) =>
    updateCategories(categories.map((cat) => (cat.id === id ? { ...cat, status: !cat.status } : cat)));

  const deleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?'))
      updateCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleEdit = (category) => navigate('/updatecategory', { state: { category } });

  const getCategoryStats = (categoryId) => {
    const filteredProducts = products.filter((p) => p.categoryId === categoryId);
    return {
      totalStock: filteredProducts.reduce((acc, p) => acc + p.stock, 0),
      totalSales: filteredProducts.reduce((acc, p) => acc + p.sales, 0),
    };
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Categories List</h1>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:bg-purple-700 transition"
            onClick={() => navigate('/addcategory')}
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
            Add Category
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-gray-600">
            <thead className="bg-gray-300 text-gray-700">
              <tr>
                {['Image', 'Name', 'Stock', 'Sales', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="px-4 py-3 text-center font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500 font-medium"
                  >
                    No categories available.
                  </td>
                </tr>
              ) : (
                categories.map(({ id, image, name, status }) => {
                  const { totalStock, totalSales } = getCategoryStats(id);
                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => navigate('/productlist', { state: { categoryId: id } })}
                    >
                      <td className="px-4 py-3 text-center">
                        <img
                          src={image}
                          alt={name}
                          className="w-10 h-10 rounded-md object-cover mx-auto"
                        />
                      </td>
                      <td className="px-4 py-3 text-center font-medium">{name}</td>
                      <td className="px-4 py-3 text-center">{totalStock}</td>
                      <td className="px-4 py-3 text-center">₹ {totalSales.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStatus(id);
                          }}
                          className={`w-10 h-5 rounded-full flex items-center mx-auto ${
                            status ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                              status ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex gap-3 justify-center">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit({ id, image, name, stock: totalStock, sales: totalSales, status });
                            }}
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCategory(id);
                            }}
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
