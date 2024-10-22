import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authToken'); // Check if the user is authenticated
    
    return isAuthenticated ? children : <Navigate to="/admin" />; // Redirect to admin if not authenticated
};

export default ProtectedRoute;
