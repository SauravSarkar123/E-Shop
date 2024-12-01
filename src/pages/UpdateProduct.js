import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import Header from '../components/Header';

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

const UpdateProduct = () => {
  const { state } = useLocation(), { productId, categoryId } = state || {};
  const { products, updateProducts } = useContext(ProductsContext);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', stock: '', imageUrl: '', categoryId: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const product = productId && products.find((p) => p.id === productId);
    product && setFormData({ ...product, imageUrl: product.image });
  }, [productId, products]);

  const validateForm = () => {
    const { name, description, price, stock, imageUrl } = formData;
    const newErrors = {
      name: !name.trim() && 'Product name is required.',
      description: !description.trim() && 'Description is required.',
      price: (!price || isNaN(price) || +price <= 0) && 'Enter a valid price greater than 0.',
      stock: (!stock || isNaN(stock) || +stock < 0) && 'Enter a valid stock quantity (0 or greater).',
      imageUrl: (!imageUrl.trim() || !/^https?:\/\/.+\..+/.test(imageUrl)) && 'Enter a valid URL.',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleInputChange = ({ target: { name, value } }) => setFormData((prev) => ({ ...prev, [name]: value }));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const confirmUpdate = window.confirm("Are you sure you want to update this product?");
      if (confirmUpdate) {
        updateProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, ...formData, image: formData.imageUrl } : p))
        );
        navigate('/productlist', { state: { categoryId } });
      }
    }
  };  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 md:max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Update Product</h1>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <InputField id="name" label="Product Name" type="text" placeholder="Enter product name" value={formData.name} error={errors.name} onChange={handleInputChange} />
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <div className="flex gap-4">
            <InputField id="price" label="Price" type="number" placeholder="Enter price" value={formData.price} error={errors.price} onChange={handleInputChange} />
            <InputField id="stock" label="Stock" type="number" placeholder="Enter stock" value={formData.stock} error={errors.stock} onChange={handleInputChange} />
          </div>
          <InputField id="imageUrl" label="Product Image URL" type="url" placeholder="Enter image URL" value={formData.imageUrl} error={errors.imageUrl} onChange={handleInputChange} />
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
