import React, { createContext, useState, useEffect } from 'react';

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize the cart state from localStorage or with an empty object
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : {};
  });

  // Save the cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add or update a product in the cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingQuantity = prevCart[product.id]?.quantity || 0;
      return {
        ...prevCart,
        [product.id]: {
          ...product,
          quantity: existingQuantity + quantity,
        },
      };
    });
  };

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        // Remove the product if the quantity is 0 or less
        const updatedCart = { ...prevCart };
        delete updatedCart[productId];
        return updatedCart;
      }
      return {
        ...prevCart,
        [productId]: {
          ...prevCart[productId],
          quantity,
        },
      };
    });
  };

  // Clear the cart
  const clearCart = () => setCart({});

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
