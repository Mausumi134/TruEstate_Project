import React from 'react';
import '../styles/SortingDropdown.css';

function SortingDropdown({ sorting, onSortChange }) {
  const handleSortByChange = (e) => {
    onSortChange({ ...sorting, sortBy: e.target.value });
  };

  const handleSortOrderChange = (e) => {
    onSortChange({ ...sorting, sortOrder: e.target.value });
  };

  return (
    <div className="sorting-dropdown">
      <label>Sort by:</label>
      <select value={sorting.sortBy} onChange={handleSortByChange}>
        <option value="date">Date</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name</option>
      </select>
      
      <select value={sorting.sortOrder} onChange={handleSortOrderChange}>
        <option value="desc">
          {sorting.sortBy === 'customerName' ? 'Z-A' : 'Descending'}
        </option>
        <option value="asc">
          {sorting.sortBy === 'customerName' ? 'A-Z' : 'Ascending'}
        </option>
      </select>
    </div>
  );
}

export default SortingDropdown;
