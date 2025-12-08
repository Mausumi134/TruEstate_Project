import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, disconnectDB } from '../config/database.js';
import Sale from '../models/Sale.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    console.log('Clearing existing data...');
    await Sale.deleteMany({});

    const csvPath = path.join(__dirname, '../../../truestate_assignment_dataset.csv');
    const sales = [];
    let rowCount = 0;
    const BATCH_SIZE = 1000;

    console.log('Reading CSV file...');

    const stream = fs.createReadStream(csvPath, { encoding: 'utf8' })
      .pipe(csv({
        skipEmptyLines: true,
        trim: true,
        mapHeaders: ({ header }) => header.trim()
      }));

    for await (const row of stream) {
      rowCount++;

      // Parse date properly
      const dateParts = row['Date'].split('/');
      const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

      sales.push({
        transactionId: row['Transaction ID'],
        date: date,
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

      // Insert in batches
      if (sales.length >= BATCH_SIZE) {
        await Sale.insertMany(sales, { ordered: false });
        console.log(`Imported ${rowCount} rows...`);
        sales.length = 0; // Clear array
      }
    }

    // Insert remaining records
    if (sales.length > 0) {
      await Sale.insertMany(sales, { ordered: false });
    }

    console.log(`✅ Successfully imported ${rowCount} sales records to MongoDB!`);
    
    // Create indexes
    console.log('Creating indexes...');
    await Sale.createIndexes();
    console.log('✅ Indexes created successfully!');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    await disconnectDB();
    process.exit(1);
  }
};

importData();
