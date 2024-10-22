import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './check.css';

const CheckoutForm = ({ isOpen, onClose, cartItems, totalAmount }) => {
  const [name, setName] = useState('');
  const [tableNo, setTableNo] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  
  const navigate = useNavigate();

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateTableNo = (tableNo) => /^[0-9]{1,3}$/.test(tableNo);
  const validateMobileNo = (mobileNo) => /^[0-9]{10}$/.test(mobileNo);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateName(name) && validateTableNo(tableNo) && validateMobileNo(mobileNo)) {
      navigate('/payment', { 
        state: { 
          name, 
          tableNo, 
          mobileNo, 
          cartItems, 
          totalAmount 
        } 
      });
      
      onClose();
    } else {
      alert('Please fill in all fields with valid information');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              pattern="[A-Za-z\s]+"
              title="Name should contain only letters"
            />
          </div>
          <div>
            <label>Table Number:</label>
            <input
              type="text"
              value={tableNo}
              onChange={(e) => setTableNo(e.target.value)}
              required
              pattern="\d{1,3}"
              maxLength={3}
              title="Table number should be a number with max 3 digits"
            />
          </div>
          <div>
            <label>Mobile Number:</label>
            <input
              type="tel"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
              pattern="\d{10}"
              maxLength={10}
              title="Mobile number should contain exactly 10 digits"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;