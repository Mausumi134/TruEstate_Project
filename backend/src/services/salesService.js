import { loadSalesData } from '../utils/dataLoader.js';
import { applyFilters, applySearch, applySorting, applyPagination } from '../utils/dataProcessor.js';

let salesData = [];

export const initializeData = async () => {
  salesData = await loadSalesData();
  console.log(`Loaded ${salesData.length} sales records`);
};

export const getFilteredSalesData = async (filters, sorting, pagination) => {
  if (salesData.length === 0) {
    await initializeData();
  }

  let filteredData = [...salesData];

  if (filters.search) {
    filteredData = applySearch(filteredData, filters.search);
  }

  filteredData = applyFilters(filteredData, filters);
  filteredData = applySorting(filteredData, sorting);

  const totalRecords = filteredData.length;
  const paginatedData = applyPagination(filteredData, pagination);

  return {
    data: paginatedData,
    pagination: {
      currentPage: pagination.page,
      pageSize: pagination.limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / pagination.limit)
    }
  };
};

export const getFilterOptions = async () => {
  if (salesData.length === 0) {
    await initializeData();
  }

  const uniqueValues = {
    customerRegions: [...new Set(salesData.map(item => item.customerRegion))].filter(Boolean).sort(),
    genders: [...new Set(salesData.map(item => item.gender))].filter(Boolean).sort(),
    productCategories: [...new Set(salesData.map(item => item.productCategory))].filter(Boolean).sort(),
    tags: [...new Set(salesData.flatMap(item => item.tags || []))].filter(Boolean).sort(),
    paymentMethods: [...new Set(salesData.map(item => item.paymentMethod))].filter(Boolean).sort(),
    ageRange: {
      min: Math.min(...salesData.map(item => item.age).filter(age => !isNaN(age))),
      max: Math.max(...salesData.map(item => item.age).filter(age => !isNaN(age)))
    }
  };

  return uniqueValues;
};
