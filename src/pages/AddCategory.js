import React, { useState, useContext } from 'react';
import { CategoriesContext } from '../context/CategoriesContext'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
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

const AddCategory = () => {
  const { categories, updateCategories } = useContext(CategoriesContext);
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({ name: '', imageUrl: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { name, imageUrl } = formData, newErrors = {};
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
      const userConfirmed = window.confirm('Are you sure you want to add this category?');
      if (userConfirmed) {
        const newCategory = {
          id: categories.length + 1, // Generate a new ID
          name: formData.name,
          image: formData.imageUrl,
          status: true, // Default status set to true
        };
        updateCategories([...categories, newCategory]); // Update categories
        setFormData({ name: '', imageUrl: '' }); // Clear form
        alert('Category added successfully!');
        navigate('/categorylist'); // Redirect to category list
      }
    }
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Add Category</h1>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <InputField id="name" label="Category Name" type="text" placeholder="Enter category name" value={formData.name} error={errors.name} onChange={handleInputChange} />
          <InputField id="imageUrl" label="Category Image URL" type="url" placeholder="Enter image URL" value={formData.imageUrl} error={errors.imageUrl} onChange={handleInputChange} />
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">Create Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
