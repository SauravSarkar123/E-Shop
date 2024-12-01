import React, { createContext, useState, useEffect, useContext } from 'react';

// Create OrdersContext
const OrdersContext = createContext();

// Provider Component
export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

// Custom Hook for easier access
export const useOrders = () => useContext(OrdersContext);
