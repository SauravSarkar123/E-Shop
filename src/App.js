// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CategoriesProvider } from './context/CategoriesContext'; // Import the context provider
import HomePage from './pages/HomePage';
import ProductListing from './pages/ProductListing';
import './App.css';

function App() {
  return (
    // Wrap the application with CategoriesProvider
    <CategoriesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListing />} />
        </Routes>
      </Router>
    </CategoriesProvider>
  );
}

export default App;
