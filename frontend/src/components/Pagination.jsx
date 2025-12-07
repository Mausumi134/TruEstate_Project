import React from 'react';
import '../styles/Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange, totalRecords }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 6;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      {totalRecords && (
        <div className="pagination-info">
          Showing <strong>{totalRecords}</strong> records
        </div>
      )}
      
      <div className="page-numbers">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="page-btn nav-btn"
        >
          ← Previous
        </button>
        
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="page-btn nav-btn"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Pagination;
