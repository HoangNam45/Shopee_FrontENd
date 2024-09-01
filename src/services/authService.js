import axios from 'axios';

export const register = async (userData) => {
    const response = await axios.post(`http://localhost:5000/auth/register`, userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post(`http://localhost:5000/auth/login`, credentials);
    return response.data;
};
