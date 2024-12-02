import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext'; // Adjust import based on your file structure

const InputField = ({ id, label, type, placeholder, value, error, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryId } = location.state || {};
  const { products, updateProducts } = useContext(ProductsContext);

  const validateForm = () => {
    const newErrors = {};
    const { name, price, stock, imageUrl } = formData; // Exclude `description` from validation
    if (!name.trim()) newErrors.name = 'Product name is required.';
    if (!price || Number(price) <= 0) newErrors.price = 'Enter a valid price.';
    if (!stock || Number(stock) < 0) newErrors.stock = 'Enter a valid stock quantity.';
    if (!imageUrl.trim() || !/^https?:\/\/.+\..+/.test(imageUrl.trim())) newErrors.imageUrl = 'Enter a valid URL.';
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
      const newProduct = {
        id: products.length + 1, // Generate new ID
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.imageUrl,
        categoryId: categoryId,
        status: true,
        sales: 0,
      };

      if (window.confirm('Are you sure you want to add this product?')) {
        updateProducts((prevProducts) => [...prevProducts, newProduct]);
        // Pass categoryId when navigating back to ProductsList
        navigate('/productlist', { state: { categoryId } });
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Add Product</h1>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <InputField
            id="name"
            label="Product Name *"
            type="text"
            placeholder="Enter product name"
            value={formData.name}
            error={errors.name}
            onChange={handleInputChange}
          />
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          <div className="flex gap-4">
            <InputField
              id="price"
              label="Price *"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              error={errors.price}
              onChange={handleInputChange}
            />
            <InputField
              id="stock"
              label="Stock *"
              type="number"
              placeholder="Enter stock"
              value={formData.stock}
              error={errors.stock}
              onChange={handleInputChange}
            />
          </div>
          <InputField
            id="imageUrl"
            label="Product Image URL *"
            type="url"
            placeholder="Enter image URL"
            value={formData.imageUrl}
            error={errors.imageUrl}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
