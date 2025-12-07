import React from 'react';
import '../styles/SalesTable.css';

function SalesTable({ data }) {
  if (!data || data.length === 0) {
    return <div className="no-data">No transactions found</div>;
  }

  return (
    <div className="sales-table-container">
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
              <td>{transaction.transactionId}</td>
              <td>{new Date(transaction.date).toLocaleDateString('en-GB')}</td>
              <td>{transaction.customerId}</td>
              <td>{transaction.customerName}</td>
              <td>{transaction.phoneNumber}</td>
              <td>{transaction.gender}</td>
              <td>{transaction.age}</td>
              <td>{transaction.productCategory}</td>
              <td>{transaction.quantity}</td>
              <td>₹{transaction.totalAmount?.toLocaleString('en-IN')}</td>
              <td>{transaction.customerRegion}</td>
              <td>{transaction.productId}</td>
              <td>{transaction.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
