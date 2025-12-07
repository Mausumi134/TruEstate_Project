import * as salesService from '../services/salesService.js';

export const getSalesData = async (req, res) => {
  try {
    const {
      search,
      customerRegion,
      gender,
      minAge,
      maxAge,
      productCategory,
      tags,
      paymentMethod,
      startDate,
      endDate,
      sortBy,
      sortOrder,
      page,
      limit
    } = req.query;

    const filters = {
      search,
      customerRegion: customerRegion || '',
      gender: gender || '',
      minAge: minAge ? parseInt(minAge) : null,
      maxAge: maxAge ? parseInt(maxAge) : null,
      productCategory: productCategory || '',
      tags: tags || '',
      paymentMethod: paymentMethod || '',
      startDate,
      endDate
    };

    const pagination = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10
    };

    const sorting = {
      sortBy: sortBy || 'date',
      sortOrder: sortOrder || 'desc'
    };

    const result = await salesService.getFilteredSalesData(filters, sorting, pagination);
    
    res.json(result);
  } catch (error) {
    console.error('Error in getSalesData:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFilterOptions = async (req, res) => {
  try {
    const options = await salesService.getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error in getFilterOptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
