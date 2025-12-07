import React from 'react';
import '../styles/SalesTable.css';

function SalesTable({ data }) {
  const handleCopyPhone = (phoneNumber) => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      // Optional: Show a toast notification
      console.log('Phone number copied:', phoneNumber);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  if (!data || data.length === 0) {
    return (
      <div className="no-data">
        <span className="no-data-icon">📊</span>
        <div className="no-data-text">No transactions found</div>
        <div className="no-data-hint">Try adjusting your filters</div>
      </div>
    );
  }

  return (
    <div className="sales-table-container">
      <div className="table-scroll-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Customer name</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Product Category</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Customer region</th>
              <th>Product ID</th>
              <th>Employee name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => (
              <tr key={transaction.transactionId || index}>
                <td className="transaction-id">{transaction.transactionId}</td>
                <td>{new Date(transaction.date).toLocaleDateString('en-GB')}</td>
                <td>{transaction.customerId}</td>
                <td className="customer-name">{transaction.customerName}</td>
                <td>
                  <div className="phone-cell">
                    <span className="phone-number">{transaction.phoneNumber}</span>
                    <button 
                      className="phone-action" 
                      onClick={() => handleCopyPhone(transaction.phoneNumber)}
                      title="Copy phone number"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M2 9V3C2 2.44772 2.44772 2 3 2H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </td>
                <td>
                  <span className={`gender-badge ${transaction.gender?.toLowerCase()}`}>
                    {transaction.gender}
                  </span>
                </td>
                <td>{transaction.age}</td>
                <td>
                  <span className="category-badge">{transaction.productCategory}</span>
                </td>
                <td className="quantity-cell text-right">{transaction.quantity}</td>
                <td className="text-right">₹{transaction.totalAmount?.toLocaleString('en-IN')}</td>
                <td>{transaction.customerRegion}</td>
                <td>{transaction.productId}</td>
                <td>{transaction.employeeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesTable;
