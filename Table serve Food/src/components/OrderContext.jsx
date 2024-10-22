import React, { createContext, useContext, useState } from 'react';

// Create a Context for the orders
const OrderContext = createContext();

// Provider component
export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const addOrder = (order) => {
        setOrders((prevOrders) => [...prevOrders, order]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

// Custom hook for easy access to the context
export const useOrders = () => {
    return useContext(OrderContext);
};
