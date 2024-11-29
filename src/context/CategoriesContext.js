import React, { createContext, useState } from 'react';

// Create the context
export const CategoriesContext = createContext();

// Helper function to generate random colors
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Provider component
export const CategoriesProvider = ({ children }) => {
  // Dynamic categories data
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Vegetables',
      image:
        'https://media.istockphoto.com/id/1203599923/photo/food-background-with-assortment-of-fresh-organic-vegetables.jpg?s=612x612&w=0&k=20&c=DZy1JMfUBkllwiq1Fm_LXtxA4DMDnExuF40jD8u9Z0Q=',
    },
    {
      id: 2,
      name: 'Fruits',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaVSaCcQy85soS7b-9Jhm9tRMf5B_U79SduQ&s',
    },
    {
      id: 3,
      name: 'Foods',
      image:
        'https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98=',
    },
  ]);

  // Assign random colors to categories
  const categoryColors = categories.reduce((acc, category) => {
    acc[category.id] = generateRandomColor();
    return acc;
  }, {});

  // Function to dynamically update categories
  const updateCategories = (newCategories) => {
    setCategories(newCategories);
  };

  return (
    <CategoriesContext.Provider value={{ categories, updateCategories, categoryColors }}>
      {children}
    </CategoriesContext.Provider>
  );
};
