export const applySearch = (data, searchTerm) => {
  if (!searchTerm) return data;
  
  const lowerSearch = searchTerm.toLowerCase();
  
  return data.filter(item => {
    const customerName = (item.customerName || '').toLowerCase();
    const phoneNumber = (item.phoneNumber || '').toLowerCase();
    
    return customerName.includes(lowerSearch) || phoneNumber.includes(lowerSearch);
  });
};

export const applyFilters = (data, filters) => {
  let filtered = data;

  if (filters.customerRegion) {
    filtered = filtered.filter(item => item.customerRegion === filters.customerRegion);
  }

  if (filters.gender) {
    filtered = filtered.filter(item => item.gender === filters.gender);
  }

  if (filters.minAge !== null || filters.maxAge !== null) {
    filtered = filtered.filter(item => {
      const age = item.age;
      const meetsMin = filters.minAge === null || age >= filters.minAge;
      const meetsMax = filters.maxAge === null || age <= filters.maxAge;
      return meetsMin && meetsMax;
    });
  }

  if (filters.productCategory) {
    filtered = filtered.filter(item => item.productCategory === filters.productCategory);
  }

  if (filters.tags) {
    filtered = filtered.filter(item => {
      return item.tags && item.tags.includes(filters.tags);
    });
  }

  if (filters.paymentMethod) {
    filtered = filtered.filter(item => item.paymentMethod === filters.paymentMethod);
  }

  if (filters.startDate || filters.endDate) {
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.date);
      const meetsStart = !filters.startDate || itemDate >= new Date(filters.startDate);
      const meetsEnd = !filters.endDate || itemDate <= new Date(filters.endDate);
      return meetsStart && meetsEnd;
    });
  }

  return filtered;
};

export const applySorting = (data, sorting) => {
  const { sortBy, sortOrder } = sorting;
  
  return [...data].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'quantity':
        comparison = a.quantity - b.quantity;
        break;
      case 'customerName':
        comparison = (a.customerName || '').localeCompare(b.customerName || '');
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

export const applyPagination = (data, pagination) => {
  const { page, limit } = pagination;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return data.slice(startIndex, endIndex);
};
