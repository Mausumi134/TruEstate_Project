import Sale from '../models/Sale.js';

export const getFilteredSalesData = async (filters, sorting, pagination) => {
  try {
    // Build MongoDB query
    const query = {};

    // Search functionality
    if (filters.search) {
      query.$or = [
        { customerName: { $regex: filters.search, $options: 'i' } },
        { phoneNumber: { $regex: filters.search, $options: 'i' } }
      ];
    }

    // Multi-select filters
    if (filters.customerRegion && filters.customerRegion.length > 0) {
      query.customerRegion = { $in: filters.customerRegion };
    }

    if (filters.gender && filters.gender.length > 0) {
      query.gender = { $in: filters.gender };
    }

    if (filters.productCategory && filters.productCategory.length > 0) {
      query.productCategory = { $in: filters.productCategory };
    }

    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    if (filters.paymentMethod && filters.paymentMethod.length > 0) {
      query.paymentMethod = { $in: filters.paymentMethod };
    }

    // Age range filter
    if (filters.minAge !== null || filters.maxAge !== null) {
      query.age = {};
      if (filters.minAge !== null) query.age.$gte = filters.minAge;
      if (filters.maxAge !== null) query.age.$lte = filters.maxAge;
    }

    // Date range filter
    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) query.date.$gte = new Date(filters.startDate);
      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999);
        query.date.$lte = endDate;
      }
    }

    // Build sort object
    const sortObj = {};
    if (sorting.sortBy === 'date') {
      sortObj.date = sorting.sortOrder === 'asc' ? 1 : -1;
    } else if (sorting.sortBy === 'quantity') {
      sortObj.quantity = sorting.sortOrder === 'asc' ? 1 : -1;
    } else if (sorting.sortBy === 'customerName') {
      sortObj.customerName = sorting.sortOrder === 'asc' ? 1 : -1;
    }

    // Get total count
    const totalRecords = await Sale.countDocuments(query);

    // Get paginated data
    const skip = (pagination.page - 1) * pagination.limit;
    const data = await Sale.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(pagination.limit)
      .lean();

    return {
      data,
      pagination: {
        currentPage: pagination.page,
        pageSize: pagination.limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / pagination.limit)
      }
    };
  } catch (error) {
    console.error('Error in getFilteredSalesData:', error);
    throw error;
  }
};

export const getFilterOptions = async () => {
  try {
    const [
      customerRegions,
      genders,
      productCategories,
      tags,
      paymentMethods,
      ageStats
    ] = await Promise.all([
      Sale.distinct('customerRegion'),
      Sale.distinct('gender'),
      Sale.distinct('productCategory'),
      Sale.distinct('tags'),
      Sale.distinct('paymentMethod'),
      Sale.aggregate([
        {
          $group: {
            _id: null,
            minAge: { $min: '$age' },
            maxAge: { $max: '$age' }
          }
        }
      ])
    ]);

    return {
      customerRegions: customerRegions.filter(Boolean).sort(),
      genders: genders.filter(Boolean).sort(),
      productCategories: productCategories.filter(Boolean).sort(),
      tags: tags.filter(Boolean).sort(),
      paymentMethods: paymentMethods.filter(Boolean).sort(),
      ageRange: {
        min: ageStats[0]?.minAge || 0,
        max: ageStats[0]?.maxAge || 100
      }
    };
  } catch (error) {
    console.error('Error in getFilterOptions:', error);
    throw error;
  }
};
