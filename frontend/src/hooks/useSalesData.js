import { useState, useEffect } from 'react';
import { getSalesData } from '../services/api';

export const useSalesData = (filters, sorting, page, pageSize) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getSalesData(filters, sorting, page, pageSize);
        setData(result.data);
        setPagination(result.pagination);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching sales data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, sorting, page, pageSize]);

  return { data, pagination, loading, error };
};
