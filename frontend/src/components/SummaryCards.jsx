import React from 'react';
import '../styles/SummaryCards.css';

function SummaryCards({ data, pagination }) {
  const calculateSummary = () => {
    if (!data || data.length === 0) {
      return {
        totalUnits: 0,
        totalAmount: 0,
        totalDiscount: 0,
        recordCount: 0
      };
    }

    const totalUnits = data.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalAmount = data.reduce((sum, item) => sum + (item.finalAmount || 0), 0);
    const totalDiscount = data.reduce((sum, item) => {
      const discount = (item.totalAmount || 0) - (item.finalAmount || 0);
      return sum + discount;
    }, 0);

    return {
      totalUnits,
      totalAmount,
      totalDiscount,
      recordCount: pagination?.totalRecords || 0
    };
  };

  const summary = calculateSummary();

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="card-header">
          <div className="card-title">Total units sold</div>
          <svg className="card-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 6V9M9 12H9.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="card-value">{summary.totalUnits.toLocaleString('en-IN')}</div>
        <div className="card-subtitle">Total quantity sold</div>
      </div>

      <div className="summary-card">
        <div className="card-header">
          <div className="card-title">Total Amount</div>
          <svg className="card-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 6V9M9 12H9.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="card-value">
          ₹{summary.totalAmount.toLocaleString('en-IN')}
        </div>
        <div className="card-subtitle">{summary.recordCount} transactions</div>
      </div>

      <div className="summary-card">
        <div className="card-header">
          <div className="card-title">Total Discount</div>
          <svg className="card-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 6V9M9 12H9.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="card-value">
          ₹{summary.totalDiscount.toLocaleString('en-IN')}
        </div>
        <div className="card-subtitle">{summary.recordCount} transactions</div>
      </div>
    </div>
  );
}

export default SummaryCards;
