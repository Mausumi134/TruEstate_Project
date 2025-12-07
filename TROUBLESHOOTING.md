# Troubleshooting Guide

## Memory Issues (Heap Out of Memory)

### Problem
The CSV file is very large (50MB+) and can cause Node.js to run out of memory when loading all data.

### Solutions Implemented

#### 1. Increased Memory Limit
The backend now runs with increased memory allocation:
```bash
node --max-old-space-size=4096 src/index.js
```

This is configured in:
- `package.json` scripts
- `nodemon.json` configuration

#### 2. Optimized Data Loading
- Added row limit (100,000 rows max) to prevent overflow
- Increased buffer size for file reading
- Added progress logging every 10,000 rows
- Data loads on server startup instead of first request

#### 3. Memory-Efficient Processing
- Filters applied sequentially to reduce memory copies
- Pagination limits data returned to client
- Only essential fields are processed

### How to Run

#### Option 1: Using npm scripts (Recommended)
```bash
cd backend
npm run dev
```
The memory limit is already configured in package.json.

#### Option 2: Manual with custom memory
```bash
cd backend
node --max-old-space-size=8192 src/index.js
```

#### Option 3: Using nodemon directly
```bash
cd backend
nodemon --max-old-space-size=4096 src/index.js
```

### If Still Having Issues

#### 1. Reduce Dataset Size
If the CSV is too large, you can:
- Use a smaller sample of the data
- Modify `MAX_ROWS` in `backend/src/utils/dataLoader.js`

```javascript
const MAX_ROWS = 50000; // Reduce from 100000
```

#### 2. Increase Memory Further
For very large datasets:
```bash
node --max-old-space-size=8192 src/index.js
```

#### 3. Use Database Instead
For production with very large datasets, consider:
- MongoDB
- PostgreSQL
- MySQL

This would eliminate in-memory storage issues.

## Other Common Issues

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

Or change the port in `backend/.env`:
```
PORT=5001
```

### CSV File Not Found

**Error:** `ENOENT: no such file or directory`

**Solution:**
Ensure `truestate_assignment_dataset.csv` is in the root directory:
```
root/
├── backend/
├── frontend/
└── truestate_assignment_dataset.csv  ← Here
```

### CORS Errors

**Error:** `Access to fetch at 'http://localhost:5000' has been blocked by CORS`

**Solution:**
CORS is already configured in `backend/src/index.js`. If issues persist:
1. Check backend is running
2. Verify frontend is calling correct URL
3. Check browser console for actual error

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd backend
npm install

cd ../frontend
npm install
```

### Frontend Not Loading

**Checklist:**
1. Backend is running on port 5000
2. Frontend is running on port 3000
3. No console errors in browser
4. Check Network tab for failed requests

## Performance Tips

### 1. Data Loading
- First load takes 10-30 seconds for large CSV
- Subsequent requests are fast (data cached in memory)
- Watch console for "Data loaded and ready" message

### 2. Filtering
- Single-select filters are faster than multi-select
- Date range filters can be slow on large datasets
- Search is optimized with case-insensitive matching

### 3. Pagination
- Keep page size at 10-20 items
- Larger page sizes increase load time
- Pagination is server-side for efficiency

## Development Tips

### Hot Reload Issues
If nodemon isn't restarting:
```bash
# Kill nodemon
Ctrl+C

# Restart
npm run dev
```

### Clear Cache
```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend
cd frontend
rm -rf node_modules
npm install
```

### Check Logs
Backend logs show:
- Data loading progress
- Number of rows loaded
- API requests
- Errors

Watch the console for helpful messages!

## System Requirements

### Minimum
- Node.js 16+
- 4GB RAM
- 1GB free disk space

### Recommended
- Node.js 18+
- 8GB RAM
- 2GB free disk space
- SSD for faster CSV loading

## Getting Help

If issues persist:
1. Check console logs (backend and frontend)
2. Verify all dependencies installed
3. Ensure CSV file is in correct location
4. Try with smaller dataset first
5. Check system resources (RAM, CPU)

## Quick Reset

If everything is broken:
```bash
# Stop all processes
Ctrl+C (in both terminals)

# Clean install
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install

# Restart
cd backend
npm run dev

# In new terminal
cd frontend
npm run dev
```

This should resolve most issues!
