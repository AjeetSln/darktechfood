import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './orderStatus.css';

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { name, tableNo, mobileNo, orderDetails } = location.state || {};
  
  const estimatedTime = orderDetails?.estimatedTime; 
  const items = orderDetails?.items || []; 
  const totalAmount = orderDetails?.totalAmount;

  const convertTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const handleClose = () => {
    navigate('/'); 
  };

  return (
    <div className="order-status-container">
      <h2>Order Confirmation</h2>
      <p>Thank you, {name}! Your order is confirmed.</p>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-details">
          <p><strong>Table Number:</strong> {tableNo}</p>
          <p><strong>Mobile Number:</strong> {mobileNo}</p>
          <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
          <p><strong>Estimated Delivery Time:</strong> {convertTime(estimatedTime)}</p>
        </div>
      </div>

      <div className="items-list">
        <h3>Your Order Items</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Quantity: {item.amount}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="tracking">
        <h3>Order Status</h3>
        <p>Your order is currently being prepared!</p>
        <div className="status-bar">
          <div className="status-progress" style={{ width: '60%' }}></div>
        </div>
        <p>Your order will be ready in approximately {convertTime(estimatedTime)}.</p>
      </div>
    </div>
  );
};

export default OrderStatus;
