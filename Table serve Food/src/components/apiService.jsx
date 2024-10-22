// src/apiService.js
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

const API_URL = `${BASE_URL}/api/menu`;  // Corrected template literal

export const getAllMenuItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/getallMenu`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;  
    }
};
