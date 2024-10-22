import React, { useState } from 'react';
import './cart.css';
import CheckoutForm from './CheckoutForm';
import Footer from './Footer';

const Cart = ({ onUpdateQuantity, cart, setCart }) => {
  const cartItems = cart || [];
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // Manages modal open/close

  // Function to calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.amount * item.price, 0);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      // If cart is empty, show alert
      alert('Your cart is empty. Please add items to proceed to checkout.');
      return; // Stop the function execution if cart is empty
    }
    setIsCheckoutOpen(true);
  };

  return (
    <div className='cart'>
      <div className="cart-container">
        <h2 className="cart-header">Your Cart</h2>
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={item._id} className="cart-item">
                <span className="item-number">{index + 1}.</span> {/* Numbering outside of the box */}
                <div className="item-info">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-prices">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="item-actions">
                  <button
                    className="quantity-btn"
                    onClick={() => onUpdateQuantity(item._id, item.amount - 1)}
                    disabled={item.amount <= 1}
                  >
                    -
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => onUpdateQuantity(item._id, item.amount + 1)}
                  >
                    +
                  </button>
                  <button className="remove-btn" onClick={() => removeItem(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Display total price */}
        <div className="cart-total">
          Total: ${getTotalPrice().toFixed(2)}
        </div>

        {/* Proceed to Checkout Button */}
        <button className="checkout-btn" onClick={proceedToCheckout}>
          Proceed to Checkout
        </button>

        {/* Checkout Modal */}
        <CheckoutForm
          isOpen={isCheckoutOpen} // Pass the state to control modal visibility
          onClose={() => setIsCheckoutOpen(false)} // Pass the function to close the modal
          cartItems={cartItems} // Passing cart items to the form
          totalAmount={getTotalPrice()} // Passing total amount to the form
        />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
