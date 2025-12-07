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
        <div className="card-title">Total units sold</div>
        <div className="card-value">{summary.totalUnits}</div>
      </div>

      <div className="summary-card">
        <div className="card-title">Total Amount</div>
        <div className="card-value">
          ₹{summary.totalAmount.toLocaleString('en-IN')}
          <span className="card-subtitle">({summary.recordCount} SRs)</span>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-title">Total Discount</div>
        <div className="card-value">
          ₹{summary.totalDiscount.toLocaleString('en-IN')}
          <span className="card-subtitle">({summary.recordCount} SRs)</span>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
