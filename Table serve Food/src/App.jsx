import React, { useEffect, useContext, useState } from 'react';
import './components/lider.css';
import './components/headline.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuList from './components/MenuList';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './components/Footer.css';
import Cart from './components/Cart';
import PaymentDetails from './components/PaymentDetails ';
import AdminLogin from './components/AdminLogin';
import OrderStatus from './components/Orderstatus';
import AdminOrders from './components/Orderdetails';
import { OrderProvider } from './components/OrderContext';
import CheckoutForm from './components/CheckoutForm';
import PendingOrder from './components/PendingOrder';
import CompletedOrder from './components/CompletedOrder';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [cart, setCart] = useState([]);

  // Load cart from local storage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, amount: cartItem.amount + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, amount: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    console.log(`Updating quantity for item: ${itemId} New quantity: ${newQuantity}`);
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item._id === itemId);
      if (!cartItem) {
        console.error(`Item with id ${itemId} does not exist in the cart.`);
        return prevCart;
      }
      if (newQuantity > 0) {
        return prevCart.map((item) =>
          item._id === itemId ? { ...item, amount: newQuantity } : item
        );
      } else {
        return prevCart.filter((item) => item._id !== itemId);
      }
    });
  };

  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MenuList cart={cart} setCart={setCart} onAddToCart={handleAddToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            }
          />
          <Route
            path="/payment"
            element={<PaymentDetails/>}
          />
          <Route
            path="/admin"
            element={<AdminLogin/>}
          />
          <Route
            path="/admin/orders"
            element={<AdminOrders/>}
          />
          <Route
            path="/checkout"
            element={<CheckoutForm/>}
          />
          <Route path="/orderstatus" element={<OrderStatus/>} />
          <Route
                path="/pendingOrder"
                element={
                    <ProtectedRoute>
                        <PendingOrder />
                    </ProtectedRoute>
                }
            />
          <Route path="/CompletedOrder" element={<CompletedOrder/>} />
          <Route
            path="/login"
            element={<Login/>}
          />

        </Routes>
      </Router>
    </OrderProvider>
  );
};

export default App;
