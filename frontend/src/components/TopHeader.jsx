import React from 'react';
import '../styles/TopHeader.css';

function TopHeader({ searchValue, onSearchChange }) {
  return (
    <header className="top-header">
      <div className="header-left">
        <h1>Sales Management System</h1>
      </div>
      <div className="header-right">
        <div className="search-container">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            className="header-search"
            placeholder="Name, Phone no."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}

export default TopHeader;
