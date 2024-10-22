import React, { useEffect, useState, useRef } from 'react';
import './PendingOrder.css'; // Import the CSS file
import Footer from './Footer';
import { BiSearch } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const PendingOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const idleTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Idle timeout duration (in milliseconds) - 30 minutes
  const idleTimeoutDuration = 30 * 60 * 1000; // 30 minutes

  // Function to reset the idle timer
  const resetIdleTimer = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      // Log out and navigate to the login page if idle timeout is reached
      navigate('/admin'); // Replace with your actual login route
    }, idleTimeoutDuration);
  };

  // Set up event listeners for user activity (mouse and keyboard events)
  useEffect(() => {
    const handleUserActivity = () => {
      resetIdleTimer();
    };

    // Add event listeners to track user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    // Set initial idle timer
    resetIdleTimer();

    // Clean up event listeners and timer on unmount
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []); // Empty array ensures this effect runs only once on mount

  // Fetching orders and completing order logic remains the same
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/orders'); // Replace with your actual API endpoint
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch pending orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
      } else {
        console.error('Failed to complete order:', response.statusText);
      }
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCancelClick = () => {
    setQuery('');
  };

  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="screen">
      <div>
        <h2>Welcome to Admin Page</h2>
        <nav className="navbar navbar-expand-lg">
          <button className="navbar-toggler" onClick={toggleMenu} type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`navbar-collapse ${isMenuOpen ? 'show' : 'collapse'}`} id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <a className="nav-link" href="/pendingOrder">Pending Orders</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/completedOrder">Completed Orders</a>
              </li>
            </ul>
          </div>
          <form>
            <div className="search">
              <BiSearch className='search_icon' />
              <input
                type="search"
                value={query}
                onChange={handleSearchChange}
                placeholder='Search Customer Name....'
                className="search-input"
              />
              <MdCancel onClick={handleCancelClick} className='cancel' />
            </div>
          </form>
        </nav>
      </div>
      <div className="pending-orders-container">
        <h2 className="pending-orders-title">Pending Orders</h2>
        {filteredOrders.length === 0 ? (
          <p className="no-orders-text">No pending orders.</p>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order, index) => (
              <div key={order._id} className="order-card">
                <span className="order-number">{index + 1}.</span>
                <h3>Name: {order.name}</h3>
                <p><strong>Table No:</strong> {order.tableNo}</p>
                <p><strong>Mobile No:</strong> {order.mobileNo}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                <h4>Items:</h4>
                <div className="items-list">
                  {order.items.map((item) => (
                    <div key={item._id} className="item-card">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <p><strong>{item.name}</strong></p>
                        <p>{item.description}</p>
                        <p><strong>Price:</strong> ${item.price}</p>
                        <p><strong>Quantity:</strong> {item.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="complete-order-button" onClick={() => handleCompleteOrder(order._id)}>Complete Order</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PendingOrder;
