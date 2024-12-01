import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CategoriesContext } from '../context/CategoriesContext'; // Import the context

const InputField = ({ id, label, type, placeholder, value, error, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const UpdateCategory = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { categories, updateCategories } = useContext(CategoriesContext); // Access context
  const [formData, setFormData] = useState({ id: '', name: '', imageUrl: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (state?.category) {
      const { id, name, image } = state.category;
      setFormData({ id, name, imageUrl: image });
    }
  }, [state]);

  const validateForm = () => {
    const { name, imageUrl } = formData;
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Category name is required.';
    else if (name.trim().length < 3) newErrors.name = 'Category name must be at least 3 characters long.';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Category image URL is required.';
    else if (!/^https?:\/\/.+\..+/.test(imageUrl.trim())) newErrors.imageUrl = 'Enter a valid URL.';
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedCategories = categories.map((category) =>
        category.id === formData.id
          ? { ...category, name: formData.name, image: formData.imageUrl }
          : category
      );
      updateCategories(updatedCategories); // Update the context
      navigate('/categorylist'); // Navigate back to the categories page after updating
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 md:max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Update Category</h1>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <InputField
            id="name"
            label="Category Name"
            type="text"
            placeholder="Enter category name"
            value={formData.name}
            error={errors.name}
            onChange={handleInputChange}
          />
          <InputField
            id="imageUrl"
            label="Category Image URL"
            type="url"
            placeholder="Enter image URL"
            value={formData.imageUrl}
            error={errors.imageUrl}
            onChange={handleInputChange}
          />
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">Update Category</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
