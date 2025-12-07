import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getSalesData = async (filters, sorting, page, limit) => {
  const params = {
    search: filters.search || '',
    customerRegion: filters.customerRegion || '',
    gender: filters.gender || '',
    minAge: filters.minAge,
    maxAge: filters.maxAge,
    productCategory: filters.productCategory || '',
    tags: filters.tags || '',
    paymentMethod: filters.paymentMethod || '',
    startDate: filters.startDate,
    endDate: filters.endDate,
    sortBy: sorting.sortBy,
    sortOrder: sorting.sortOrder,
    page,
    limit
  };

  const response = await api.get('/sales', { params });
  return response.data;
};

export const getFilterOptions = async () => {
  const response = await api.get('/sales/filter-options');
  return response.data;
};

export default api;
