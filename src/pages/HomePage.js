import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CategoriesContext } from '../context/CategoriesContext';

const HomePage = () => {
  const { categories } = useContext(CategoriesContext);
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    navigate(`/products?category=${encodeURIComponent(name)}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-left text-gray-800 mb-6">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map(({ id, image, name }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transform transition hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-blue-300 cursor-pointer"
              onClick={() => handleCategoryClick(name)}
            >
              <img src={image} alt={name} className="rounded-md w-full h-40 object-cover mb-4" />
              <h2 className="text-lg font-medium text-gray-700">{name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
