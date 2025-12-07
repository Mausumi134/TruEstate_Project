import React, { useState, useEffect } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ value, onChange }) {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onChange]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by customer name or phone number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
