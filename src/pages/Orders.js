import React from 'react';
import Header from '../components/Header';
import { useOrders } from '../context/OrdersContext'; // Import useOrders

const OrdersPage = () => {
  const { orders } = useOrders(); // Fetch orders from context

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Orders</h1>
        
        {orders.length > 0 ? (
          <div className="space-y-8">
            {orders
              .slice() // Create a shallow copy to avoid mutating original array
              .reverse() // Reverse the order of the copied array
              .map(({ id, items }) => {
                const total = items.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
                return (
                  <div key={id} className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-gray-700">Order ID: {id}</h2>
                      <p className="text-lg font-semibold text-green-600">Total: Rs. {total}</p>
                    </div>
                    <h3 className="text-md font-medium text-gray-600 mb-4">Items</h3>
                    <div className="divide-y divide-gray-400 bg-gray-200 rounded-md p-4">
                      {items.map(({ name, price, quantity, image }, idx) => (
                        <div key={idx} className="flex items-center gap-4 py-4">
                          <img src={image} alt={name} className="w-16 h-16 rounded-md object-cover" />
                          <div className="flex-1">
                            <h4 className="text-gray-800 font-medium">{name}</h4>
                            <p className="text-gray-500">Rs. {price}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500">Qty: {quantity}</p>
                            <p className="text-gray-800 font-semibold">Rs. {price * quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-gray-700">No orders placed yet.</h2>
            <p className="text-gray-600 mt-4">Start shopping to place your first order!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
