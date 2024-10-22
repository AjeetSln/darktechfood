// src/apiService.js
import axios from 'axios';


const API_URL = 'http://localhost:3000/api/menu';

export const getAllMenuItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/getallMenu`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;  
    }
};
