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
      customerRegion: customerRegion ? (Array.isArray(customerRegion) ? customerRegion : customerRegion.split(',')) : [],
      gender: gender ? (Array.isArray(gender) ? gender : gender.split(',')) : [],
      minAge: minAge ? parseInt(minAge) : null,
      maxAge: maxAge ? parseInt(maxAge) : null,
      productCategory: productCategory ? (Array.isArray(productCategory) ? productCategory : productCategory.split(',')) : [],
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',')) : [],
      paymentMethod: paymentMethod ? (Array.isArray(paymentMethod) ? paymentMethod : paymentMethod.split(',')) : [],
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
