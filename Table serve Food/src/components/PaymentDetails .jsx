import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payment.css';
import axios from 'axios';

const PaymentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure the data passed from the checkout page
  const { name, tableNo, mobileNo, cartItems, totalAmount } = location.state || {};
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [error, setError] = useState(null); // State to hold error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate payment success (you can replace this with real payment processing logic)
    const paymentSuccessful = true; // Update this for real payment processing

    if (paymentSuccessful) {
      const orderDetails = {
        name,
        tableNo,
        mobileNo,
        paymentInfo,
        items: cartItems,
        totalAmount,
        estimatedTime: 30 * 60, // For example, 30 minutes in seconds
      };

      try {
        // Send order details to the backend
        const response = await axios.post('http://localhost:3000/api/orders', orderDetails);
        
        if (response.status === 201) {
          console.log('Order saved successfully:', response.data);
          // Navigate to the OrderStatus page with order details
          navigate('/orderstatus', {
            state: { name, tableNo, mobileNo, orderDetails },
          });
        } else {
          // If response is not successful, set error message
          setError('Failed to save order. Please try again.');
        }
      } catch (error) {
        console.error('Error saving order:', error);
        setError('Error saving order. Please try again.');
      }
    } else {
      setError('Payment failed! Please try again.'); // Provide feedback on payment failure
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input
            type="text"
            name="expirationDate"
            value={paymentInfo.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="password"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Payment</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default PaymentDetails;
