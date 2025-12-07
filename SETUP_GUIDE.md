# Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Installation Steps

### 1. Install All Dependencies
From the root directory:
```bash
npm run install:all
```

Or manually:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Verify CSV Dataset
Ensure `truestate_assignment_dataset.csv` is in the root directory.

### 3. Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

### 4. Start Frontend Server
In a new terminal:
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:3000

### 5. Access Application
Open your browser and navigate to: http://localhost:3000

## Testing the Features

### Search
- Type customer name or phone number in the search bar
- Results update automatically with 300ms debounce

### Filters
- Select multiple options from filter panel
- Use age range inputs (min/max)
- Select date range for transactions
- Click "Clear All" to reset filters

### Sorting
- Use dropdown to sort by Date, Quantity, or Customer Name
- Toggle between ascending/descending order

### Pagination
- Navigate using Previous/Next buttons
- Click page numbers for direct navigation
- Shows 10 items per page

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify CSV file exists in root directory
- Check Node.js version (v16+)

### Frontend won't start
- Check if port 3000 is available
- Verify backend is running
- Clear node_modules and reinstall

### No data showing
- Verify backend is running and accessible
- Check browser console for errors
- Verify CSV file is properly formatted

## Production Build

### Build Frontend
```bash
cd frontend
npm run build
```

### Deploy
- Backend: Deploy to services like Heroku, Railway, or Render
- Frontend: Deploy to Vercel, Netlify, or similar
- Update VITE_API_URL in frontend .env for production API URL
