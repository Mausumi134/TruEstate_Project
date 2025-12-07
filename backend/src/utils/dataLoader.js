import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvPath = path.join(__dirname, '../../../truestate_assignment_dataset.csv');
    let rowCount = 0;
    const MAX_ROWS = 100000; // Limit to prevent memory issues

    console.log('Starting to load CSV data...');

    fs.createReadStream(csvPath, { highWaterMark: 64 * 1024 })
      .pipe(csv())
      .on('data', (row) => {
        // Limit rows to prevent memory overflow
        if (rowCount >= MAX_ROWS) {
          return;
        }
        
        rowCount++;
        
        // Only parse essential fields to reduce memory
        results.push({
          transactionId: row['Transaction ID'],
          date: row['Date'],
          customerId: row['Customer ID'],
          customerName: row['Customer Name'],
          phoneNumber: row['Phone Number'],
          gender: row['Gender'],
          age: parseInt(row['Age']) || 0,
          customerRegion: row['Customer Region'],
          customerType: row['Customer Type'],
          productId: row['Product ID'],
          productName: row['Product Name'],
          brand: row['Brand'],
          productCategory: row['Product Category'],
          tags: row['Tags'] ? row['Tags'].split(',').map(tag => tag.trim()) : [],
          quantity: parseInt(row['Quantity']) || 0,
          pricePerUnit: parseFloat(row['Price per Unit']) || 0,
          discountPercentage: parseFloat(row['Discount Percentage']) || 0,
          totalAmount: parseFloat(row['Total Amount']) || 0,
          finalAmount: parseFloat(row['Final Amount']) || 0,
          paymentMethod: row['Payment Method'],
          orderStatus: row['Order Status'],
          deliveryType: row['Delivery Type'],
          storeId: row['Store ID'],
          storeLocation: row['Store Location'],
          salespersonId: row['Salesperson ID'],
          employeeName: row['Employee Name']
        });

        // Log progress every 10000 rows
        if (rowCount % 10000 === 0) {
          console.log(`Loaded ${rowCount} rows...`);
        }
      })
      .on('end', () => {
        console.log(`CSV loading complete. Total rows: ${results.length}`);
        resolve(results);
      })
      .on('error', (error) => {
        console.error('Error loading CSV:', error);
        reject(error);
      });
  });
};
