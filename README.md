# Retail Sales Management System

## Overview
A full-stack web application for managing retail sales data with advanced search, filtering, sorting, and pagination capabilities. Built with React and Node.js.

## Tech Stack
**Frontend:** React 18, Vite, Axios, CSS3  
**Backend:** Node.js, Express.js, CSV Parser

## Search Implementation Summary
Full-text search implemented across customer name and phone number fields with case-insensitive matching. Uses debouncing (300ms) to optimize API calls and maintains search state across filter and sort operations.

## Filter Implementation Summary
Multi-select filtering for customer region, gender, product category, tags, and payment method. Range-based filtering for age and date. All filters work independently and in combination, with state preserved during search and sort operations.

## Sorting Implementation Summary
Sorting by date (newest first), quantity, and customer name (A-Z). Implemented on the backend for efficiency with preserved filter and search states. Default sort is by date in descending order.

## Pagination Implementation Summary
Server-side pagination with 10 items per page. Includes next/previous navigation and page number display. Maintains active search, filter, and sort states across page changes.

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Full Application
1. Ensure the CSV dataset is in the root directory
2. Start backend server (runs on port 5000)
3. Start frontend server (runs on port 3000)
4. Access the application at http://localhost:3000
