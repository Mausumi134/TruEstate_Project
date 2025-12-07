import React, { useState, useEffect } from 'react';
import { getFilterOptions } from '../services/api';
import '../styles/FilterPanel.css';

function FilterPanel({ filters, onFilterChange }) {
  const [filterOptions, setFilterOptions] = useState(null);
  const [localFilters, setLocalFilters] = useState(filters);

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

  const handleMultiSelectChange = (field, value) => {
    const currentValues = localFilters[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    const updated = { ...localFilters, [field]: newValues };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleAgeChange = (field, value) => {
    const updated = { ...localFilters, [field]: value ? parseInt(value) : null };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleDateChange = (field, value) => {
    const updated = { ...localFilters, [field]: value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const clearFilters = () => {
    const cleared = {
      search: filters.search,
      customerRegion: [],
      gender: [],
      minAge: null,
      maxAge: null,
      productCategory: [],
      tags: [],
      paymentMethod: [],
      startDate: '',
      endDate: ''
    };
    setLocalFilters(cleared);
    onFilterChange(cleared);
  };

  if (!filterOptions) return <div>Loading filters...</div>;

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        <button onClick={clearFilters} className="clear-btn">Clear All</button>
      </div>

      <div className="filter-section">
        <h3>Customer Region</h3>
        {filterOptions.customerRegions.map(region => (
          <label key={region} className="filter-checkbox">
            <input
              type="checkbox"
              checked={localFilters.customerRegion.includes(region)}
              onChange={() => handleMultiSelectChange('customerRegion', region)}
            />
            <span>{region}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Gender</h3>
        {filterOptions.genders.map(gender => (
          <label key={gender} className="filter-checkbox">
            <input
              type="checkbox"
              checked={localFilters.gender.includes(gender)}
              onChange={() => handleMultiSelectChange('gender', gender)}
            />
            <span>{gender}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Age Range</h3>
        <div className="age-inputs">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.minAge || ''}
            onChange={(e) => handleAgeChange('minAge', e.target.value)}
            min={filterOptions.ageRange.min}
            max={filterOptions.ageRange.max}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={localFilters.maxAge || ''}
            onChange={(e) => handleAgeChange('maxAge', e.target.value)}
            min={filterOptions.ageRange.min}
            max={filterOptions.ageRange.max}
          />
        </div>
      </div>

      <div className="filter-section">
        <h3>Product Category</h3>
        {filterOptions.productCategories.map(category => (
          <label key={category} className="filter-checkbox">
            <input
              type="checkbox"
              checked={localFilters.productCategory.includes(category)}
              onChange={() => handleMultiSelectChange('productCategory', category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Tags</h3>
        <div className="tags-container">
          {filterOptions.tags.map(tag => (
            <label key={tag} className="filter-checkbox">
              <input
                type="checkbox"
                checked={localFilters.tags.includes(tag)}
                onChange={() => handleMultiSelectChange('tags', tag)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Payment Method</h3>
        {filterOptions.paymentMethods.map(method => (
          <label key={method} className="filter-checkbox">
            <input
              type="checkbox"
              checked={localFilters.paymentMethod.includes(method)}
              onChange={() => handleMultiSelectChange('paymentMethod', method)}
            />
            <span>{method}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Date Range</h3>
        <div className="date-inputs">
          <input
            type="date"
            value={localFilters.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
          />
          <span>to</span>
          <input
            type="date"
            value={localFilters.endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
