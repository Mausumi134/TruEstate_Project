# Retail Sales Management System - Backend

## Overview
Backend API for the Retail Sales Management System, providing endpoints for searching, filtering, sorting, and paginating sales transaction data.

## Tech Stack
- Node.js
- Express.js
- CSV Parser

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Ensure the CSV dataset is in the root directory

3. Start the development server:
```bash
npm run dev
```

4. Start the production server:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### GET /api/sales
Get filtered, sorted, and paginated sales data

Query Parameters:
- `search` - Search by customer name or phone number
- `customerRegion` - Filter by regions (comma-separated)
- `gender` - Filter by gender (comma-separated)
- `minAge`, `maxAge` - Age range filter
- `productCategory` - Filter by categories (comma-separated)
- `tags` - Filter by tags (comma-separated)
- `paymentMethod` - Filter by payment methods (comma-separated)
- `startDate`, `endDate` - Date range filter
- `sortBy` - Sort field (date, quantity, customerName)
- `sortOrder` - Sort direction (asc, desc)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### GET /api/sales/filter-options
Get available filter options
