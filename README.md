# Retail Sales Management System

🔗 **Live Application:** [https://truestate-project-1.onrender.com](https://truestate-project-1.onrender.com)

## Overview
A full-stack web application for managing retail sales data with advanced search, filtering, sorting, and pagination capabilities. The system processes structured sales data from CSV format and provides an intuitive interface for data exploration and analysis. Built with modern web technologies following clean architecture principles and professional coding standards.

## Tech Stack

**Frontend:**
- React 18.3 - UI library
- Vite 5.4 - Build tool and dev server
- Axios - HTTP client for API communication
- CSS3 - Custom styling with CSS variables

**Backend:**
- Node.js 18+ - Runtime environment
- Express.js 4.19 - Web framework
- MongoDB Atlas - Database (M0 Free tier)
- Mongoose - ODM for MongoDB
- CORS - Cross-origin resource sharing

## Search Implementation Summary

Full-text search is implemented across **Customer Name** and **Phone Number** fields with case-insensitive matching. The search functionality uses a debouncing mechanism (300ms delay) to optimize API calls and reduce server load. Search queries are processed on the backend using efficient string matching algorithms. The search state is maintained across all filter and sort operations, ensuring a seamless user experience. Empty search results are handled gracefully with appropriate user feedback.

## Filter Implementation Summary

Multi-select and range-based filtering is implemented for seven key attributes: **Customer Region**, **Gender**, **Age Range**, **Product Category**, **Tags**, **Payment Method**, and **Date Range**. Filters work both independently and in combination, with all filter logic processed on the backend for optimal performance. The filter state is preserved during search and sort operations. Age filtering uses predefined ranges (18-25, 26-35, 36-45, 46-60, 60+) while date filtering supports custom range selection. Filter options are dynamically loaded from the dataset to ensure accuracy.

## Sorting Implementation Summary

Sorting is available for three key fields: **Date** (newest/oldest first), **Quantity** (high to low / low to high), and **Customer Name** (A-Z / Z-A). All sorting operations are performed on the backend to handle large datasets efficiently. The default sort order is by date in descending order (newest first). Sort state is preserved across pagination, search, and filter operations. The sorting dropdown provides clear labels for each option to enhance usability.

## Pagination Implementation Summary

Server-side pagination is implemented with a fixed page size of **10 items per page**. The pagination component includes Previous/Next navigation buttons and numbered page buttons for direct access. The current page state is maintained across all search, filter, and sort operations. Pagination information displays the total number of records and current page position. Disabled states are applied to navigation buttons at the first and last pages to prevent invalid navigation attempts.

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- MongoDB Atlas account (free tier)

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
The backend server will start on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend application will start on `http://localhost:5173`

### Environment Configuration
Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salesdb?retryWrites=true&w=majority
```

Create a `.env` file in the frontend directory (optional):
```
VITE_API_URL=http://localhost:5000
```

### Data Import
Import CSV data to MongoDB (one-time setup):
```bash
cd backend
node src/scripts/importData.js
```

### Running the Application
1. Ensure MongoDB Atlas is configured in backend/.env
2. Import data using the script above (first time only)
3. Start the backend server (runs on port 5000)
4. Start the frontend development server (runs on port 5173)
5. Open your browser and navigate to `http://localhost:5173`
6. The application will load with the sales data ready for exploration

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## Live Deployment

**Frontend:** [https://truestate-project-1.onrender.com](https://truestate-project-1.onrender.com)  
**Backend API:** [https://truestate-project.onrender.com](https://truestate-project.onrender.com)

The application is deployed on Render with:
- Frontend: Static site deployment
- Backend: Web service with Node.js
- Database: MongoDB Atlas (M0 Free tier - 512 MB)

## Project Structure
```
root/
├── backend/          # Backend API server
├── frontend/         # React frontend application
├── docs/            # Architecture documentation
└── README.md        # This file
```

For detailed architecture information, see [docs/architecture.md](docs/architecture.md)
