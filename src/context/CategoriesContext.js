import React, { createContext, useState, useEffect } from 'react';

// Move initialCategories outside the component to make it static
const initialCategories = [
  {
    id: 1,
    name: 'Vegetables',
    image: 'https://media.istockphoto.com/id/1203599923/photo/food-background-with-assortment-of-fresh-organic-vegetables.jpg?s=612x612&w=0&k=20&c=DZy1JMfUBkllwiq1Fm_LXtxA4DMDnExuF40jD8u9Z0Q=',
  },
  {
    id: 2,
    name: 'Fruits',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaVSaCcQy85soS7b-9Jhm9tRMf5B_U79SduQ&s',
  },
  {
    id: 3,
    name: 'Foods',
    image: 'https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98=',
  },
];

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem('categories');
    const stored = storedCategories ? JSON.parse(storedCategories) : [];
    // Merge initial and stored categories, ensuring uniqueness
    const mergedCategories = [
      ...initialCategories,
      ...stored.filter(
        (storedCategory) => !initialCategories.some((initial) => initial.id === storedCategory.id)
      ),
    ];
    return mergedCategories;
  });

  useEffect(() => {
    // Save only new categories (exclude initialCategories)
    const newCategories = categories.filter(
      (category) => !initialCategories.some((initial) => initial.id === category.id)
    );
    localStorage.setItem('categories', JSON.stringify(newCategories));
  }, [categories]);

  const updateCategories = (newCategories) => setCategories(newCategories);

  return (
    <CategoriesContext.Provider value={{ categories, updateCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
