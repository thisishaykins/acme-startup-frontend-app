import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/invoice'; // Update with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const createInvoice = (invoiceData) => api.post('/', invoiceData);
export const getInvoices = () => api.get('/');
export const getInvoiceById = (id) => api.get(`/${id}`);