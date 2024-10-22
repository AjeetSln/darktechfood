import React, { useEffect, useState } from 'react';
import './CompletedOrder.css'; // Import the CSS file
import Footer from './Footer';
import { BiSearch } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';


const CompletedOrder = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [query, setQuery] = useState('');
  const BASE_URL = process.env.BASE_URL;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCancelClick = () => {
    setQuery('');
  };

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/orders/completedOrders`); // Updated endpoint
        const data = await response.json();
        setCompletedOrders(data);
      } catch (error) {
        console.error('Failed to fetch completed orders:', error);
      }
    };

    fetchCompletedOrders();
  }, []);

  // Filtered orders based on the search query
  const filteredOrders = completedOrders.filter(order =>
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
              <li className="nav-item active">
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
      <div className="completed-orders-container">
        <h2 className="completed-orders-title">Completed Orders</h2>
        {filteredOrders.length === 0 ? (
          <p className="no-orders-text">No completed orders.</p>
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
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CompletedOrder;
