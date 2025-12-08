import React, { useState, useEffect } from 'react';
import { getFilterOptions } from '../services/api';
import '../styles/FilterBar.css';

function FilterBar({ filters, sorting, onFilterChange, onSortChange }) {
  const [filterOptions, setFilterOptions] = useState(null);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const options = await getFilterOptions();
      setFilterOptions(options);
    } catch (error) {
      console.error('Failed to load filter options:', error);
    }
  };

  if (!filterOptions) return <div>Loading filters...</div>;

  const ageRanges = [
    { label: 'All Ages', min: null, max: null },
    { label: '18-25', min: 18, max: 25 },
    { label: '26-35', min: 26, max: 35 },
    { label: '36-45', min: 36, max: 45 },
    { label: '46-60', min: 46, max: 60 },
    { label: '60+', min: 60, max: 100 }
  ];

  const handleAgeRangeChange = (e) => {
    const [min, max] = e.target.value.split('-');
    onFilterChange('minAge', min === 'null' ? null : parseInt(min));
    onFilterChange('maxAge', max === 'null' ? null : parseInt(max));
  };

  const currentAgeRange = filters.minAge !== null || filters.maxAge !== null
    ? `${filters.minAge || 0}-${filters.maxAge || 100}`
    : 'null-null';

  const handleRefresh = () => {
    // Reset all filters
    onFilterChange('customerRegion', '');
    onFilterChange('gender', '');
    onFilterChange('minAge', null);
    onFilterChange('maxAge', null);
    onFilterChange('productCategory', '');
    onFilterChange('tags', '');
    onFilterChange('paymentMethod', '');
    onFilterChange('startDate', '');
    onFilterChange('endDate', '');
    onSortChange({ sortBy: 'date', sortOrder: 'desc' });
  };

  return (
    <div className="filter-bar">
      <button 
        onClick={handleRefresh}
        className="refresh-button"
        title="Reset all filters"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5 2.87858 12.5858 4.24264M12.5858 4.24264V1M12.5858 4.24264H9.34315" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <select 
        value={filters.customerRegion} 
        onChange={(e) => onFilterChange('customerRegion', e.target.value)}
        className="filter-dropdown"
      >
        <option value="">Customer Region</option>
        {filterOptions.customerRegions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>

      <select 
        value={filters.gender} 
        onChange={(e) => onFilterChange('gender', e.target.value)}
        className="filter-dropdown"
      >
        <option value="">Gender</option>
        {filterOptions.genders.map(gender => (
          <option key={gender} value={gender}>{gender}</option>
        ))}
      </select>

      <select 
        value={currentAgeRange}
        onChange={handleAgeRangeChange}
        className="filter-dropdown"
      >
        <option value="null-null">Age Range</option>
        {ageRanges.slice(1).map(range => (
          <option key={range.label} value={`${range.min}-${range.max}`}>
            {range.label}
          </option>
        ))}
      </select>

      <select 
        value={filters.productCategory} 
        onChange={(e) => onFilterChange('productCategory', e.target.value)}
        className="filter-dropdown"
      >
        <option value="">Product Category</option>
        {filterOptions.productCategories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <select 
        value={filters.tags} 
        onChange={(e) => onFilterChange('tags', e.target.value)}
        className="filter-dropdown"
      >
        <option value="">Tags</option>
        {filterOptions.tags.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>

      <select 
        value={filters.paymentMethod} 
        onChange={(e) => onFilterChange('paymentMethod', e.target.value)}
        className="filter-dropdown"
      >
        <option value="">Payment Method</option>
        {filterOptions.paymentMethods.map(method => (
          <option key={method} value={method}>{method}</option>
        ))}
      </select>

      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => onFilterChange('startDate', e.target.value)}
        className="filter-dropdown date-input"
        placeholder="Start Date"
      />

      <select 
        value={`${sorting.sortBy}-${sorting.sortOrder}`}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split('-');
          onSortChange({ sortBy, sortOrder });
        }}
        className="filter-dropdown sort-dropdown"
      >
        <option value="customerName-asc">Sort By → Customer Name (A–Z)</option>
        <option value="customerName-desc">Sort By → Customer Name (Z–A)</option>
        <option value="date-desc">Sort By → Date (Newest First)</option>
        <option value="date-asc">Sort By → Date (Oldest First)</option>
        <option value="quantity-desc">Sort By → Quantity (High to Low)</option>
        <option value="quantity-asc">Sort By → Quantity (Low to High)</option>
      </select>
    </div>
  );
}

export default FilterBar;
