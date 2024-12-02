import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { ProductsContext } from '../context/ProductsContext';

const CartItems = () => {
  const { cart, updateQuantity, clearCart } = useContext(CartContext);
  const { addOrder } = useOrders();
  const { products, updateProducts } = useContext(ProductsContext);
  const navigate = useNavigate();

  const totalPrice = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleUpdateQuantity = (productId, newQuantity) => {
    const product = products.find((p) => p.id === parseInt(productId));
    if (!product) return;
  
    // If the quantity becomes 0 or less, remove the item from the cart
    if (newQuantity <= 0) {
      updateQuantity(productId, 0); // Remove the item from the cart
    } else {
      updateQuantity(productId, newQuantity); // Update the quantity normally
    }
  };
  

  const handlePlaceOrder = () => {
    if (!Object.keys(cart).length) return alert('Your cart is empty!');
    if (window.confirm('Are you sure you want to place this order?')) {
      // Update the stock and sales in ProductsContext
      const updatedProducts = products.map((product) => {
        const cartItem = cart[product.id];
        if (cartItem) {
          return {
            ...product,
            stock: product.stock - cartItem.quantity, // Reduce stock
            sales: product.sales + cartItem.quantity * product.price, // Add sales as quantity * price
          };
        }
        return product;
      });
  
      updateProducts(updatedProducts); // Update the products in context
      addOrder({ id: `#${Date.now()}`, items: Object.values(cart) }); // Add the order
      clearCart(); // Clear the cart
      alert('Order placed successfully!');
      navigate('/orders'); // Redirect to orders page
    }
  };  

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-black mb-6">Cart Items</h1>
        {Object.keys(cart).length ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              {Object.entries(cart).map(([id, item]) => {
                const product = products.find((p) => p.id === parseInt(id));
                const isStockExceeded = product && item.quantity >= product.stock;
                return (
                  <div key={id} className="flex items-center bg-white shadow-md rounded-md p-4 gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                      <p className="text-gray-600">Rs. {item.price}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleUpdateQuantity(id, item.quantity - 1)}
                        className="w-8 h-8 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(id, item.quantity + 1)}
                        className={`w-8 h-8 rounded-md ${
                          isStockExceeded
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                        disabled={isStockExceeded}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full md:w-1/3 bg-white shadow-md rounded-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
              <div className="space-y-2">
                {Object.entries(cart).map(([id, item]) => (
                  <div key={id} className="flex justify-between text-gray-700">
                    <span>{item.name}</span>
                    <span>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-bold text-gray-800">
                <span>Total Price</span>
                <span>Rs. {totalPrice}</span>
              </div>
              <button
                className="w-full bg-purple-500 text-white font-bold py-3 rounded-md mt-6 hover:bg-purple-600"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-700">
            <h2 className="text-xl font-bold">Your cart is empty</h2>
            <p className="mt-4">Start adding items to your cart!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItems;
