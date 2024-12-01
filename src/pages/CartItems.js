import React, { useContext } from 'react';
import Header from '../components/Header';
import { CartContext } from '../context/CartContext'; // Import CartContext
import { useOrders } from '../context/OrdersContext'; // Import OrdersContext

const CartItems = () => {
  const { cart, updateQuantity, clearCart } = useContext(CartContext);
  const { addOrder } = useOrders();

  const totalPrice = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const confirmOrder = window.confirm(
      'Are you sure you want to place this order?'
    );
    if (confirmOrder) {
      const newOrder = {
        id: `#${Date.now()}`, // Generate unique ID
        items: Object.values(cart),
      };

      addOrder(newOrder); // Add the order to OrdersContext
      clearCart(); // Clear the cart
      alert('Order placed successfully!');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-black mb-6">Cart Items</h1>
        {Object.keys(cart).length > 0 ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              {Object.entries(cart).map(([id, item]) => (
                <div
                  key={id}
                  className="flex items-center bg-white shadow-md rounded-md p-4 gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600">Rs. {item.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateQuantity(id, cart[id].quantity - 1)}
                      className="w-8 h-8 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(id, cart[id].quantity + 1)}
                      className="w-8 h-8 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
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
