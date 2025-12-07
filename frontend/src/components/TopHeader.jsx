import React from 'react';
import '../styles/TopHeader.css';

function TopHeader({ searchValue, onSearchChange }) {
  return (
    <header className="top-header">
      <div className="header-left">
        <h1>Sales Management System</h1>
      </div>
      <div className="header-right">
        <input
          type="text"
          className="header-search"
          placeholder="Name, Phone no."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
}

export default TopHeader;
