import axios from 'axios';
import { getToken } from './tokenService';
export const addProduct = async (productData) => {
    const response = await axios.post('http://localhost:5000/seller/add_product', productData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response;
};
export const getProduct = async () => {
    const response = await axios.get('http://localhost:5000/products');
    return response.data;
};
