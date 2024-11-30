// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CategoriesProvider } from './context/CategoriesContext'; // Import the context provider
import HomePage from './pages/HomePage';
import ProductListing from './pages/ProductListing';
import ProductInfo from './pages/ProductInfo';
import CartItems from './pages/CartItems';
import OrdersPage from './pages/Orders';
import CategoriesPage from './pages/CategoryList';
import './App.css';

function App() {
  return (
    // Wrap the application with CategoriesProvider
    <CategoriesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/productinfo" element={<ProductInfo />} />
          <Route path="/cart" element={<CartItems />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/categorylist" element={<CategoriesPage />} />
        </Routes>
      </Router>
    </CategoriesProvider>
  );
}

export default App;
