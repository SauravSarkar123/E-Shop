import React, { createContext, useState, useEffect } from 'react';

const initialCategories = [
  {
    id: 1,
    name: 'Vegetables',
    image:
      'https://media.istockphoto.com/id/1203599923/photo/food-background-with-assortment-of-fresh-organic-vegetables.jpg?s=612x612&w=0&k=20&c=DZy1JMfUBkllwiq1Fm_LXtxA4DMDnExuF40jD8u9Z0Q=',
    stock: 15,
    sales: 5000,
    status: true, // Added status field
  },
  {
    id: 2,
    name: 'Fruits',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaVSaCcQy85soS7b-9Jhm9tRMf5B_U79SduQ&s',
    stock: 20,
    sales: 8000,
    status: true, // Added status field
  },
  {
    id: 3,
    name: 'Foods',
    image:
      'https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98=',
    stock: 10,
    sales: 10000,
    status: true, // Added status field
  },
];

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem('categories');
    const stored = storedCategories ? JSON.parse(storedCategories) : [];
    const mergedCategories = [
      ...initialCategories,
      ...stored.filter(
        (storedCategory) => !initialCategories.some((initial) => initial.id === storedCategory.id)
      ),
    ];
    return mergedCategories;
  });

  useEffect(() => {
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