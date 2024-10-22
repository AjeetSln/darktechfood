import React from 'react';
import { useOrders } from './OrderContext'; // Import the custom hook for orders

const AdminOrders = () => {
  const { orders } = useOrders(); // Get the orders from context
  console.log('Current orders:', orders); 
  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="admin-orders-container">
      <h2>Admin Orders</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>Order for {order.name}</h3>
            <p><strong>Table No:</strong> {order.tableNo}</p>
            <p><strong>Mobile No:</strong> {order.mobileNo}</p>
            <p><strong>Card Number:</strong> {order.paymentInfo.cardNumber}</p>
            <p><strong>Time Remaining:</strong> {formatTime(order.estimatedTime)}</p>
          </div>
        ))
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default AdminOrders;
