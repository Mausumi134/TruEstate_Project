# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Start Backend

```bash
cd backend
npm run dev
```

**Wait for:** "Data loaded and ready" message in console
**Backend URL:** http://localhost:5000

### Step 3: Start Frontend

Open a **new terminal**:

```bash
cd frontend
npm run dev
```

**Frontend URL:** http://localhost:3000

## 🎯 What You'll See

### Layout
```
┌─────────────┬──────────────────────────────────────────┐
│             │  Sales Management System    [Search Box] │
│  Sidebar    ├──────────────────────────────────────────┤
│             │  [Filters: Region|Gender|Age|Category... │
│  - Dashboard│                                           │
│  - Nexus    │  [Total Units] [Total Amount] [Discount] │
│  - Intake   │                                           │
│  - Services │  ┌────────────────────────────────────┐  │
│  - Invoices │  │  Transaction Table (13 columns)    │  │
│    ✓ Proforma│  │  ID | Date | Customer | Phone...  │  │
│    - Final  │  └────────────────────────────────────┘  │
│             │                                           │
│             │  [1] [2] [3] [4] [5] [6]  ← Pagination   │
└─────────────┴──────────────────────────────────────────┘
```

## 🧪 Quick Test

### Test 1: Search
1. Type a name in search box (e.g., "Kumar")
2. See results filter instantly

### Test 2: Filter
1. Click "Customer Region" dropdown
2. Select "North"
3. See only North region customers

### Test 3: Sort
1. Click "Sort By" dropdown
2. Select "Date (Newest First)"
3. See data reorder

### Test 4: Pagination
1. Click page "2"
2. See next 10 records
3. Notice page 2 is now dark

### Test 5: Combined
1. Search for "Kumar"
2. Filter by Region = "South"
3. Sort by "Quantity (High to Low)"
4. All work together!

## 📋 All Filters Available

1. **Customer Region** - North, South, East, West, Central
2. **Gender** - Male, Female
3. **Age Range** - 18-25, 26-35, 36-45, 46-60, 60+
4. **Product Category** - Electronics, Clothing, Beauty, etc.
5. **Tags** - wireless, portable, fashion, etc.
6. **Payment Method** - UPI, Credit Card, Debit Card, Cash
7. **Date** - Select any date to filter from

## 🎨 UI Features

### Sidebar
- Click "Services" to expand/collapse submenu
- Click "Invoices" to expand/collapse submenu
- "Proforma Invoices" is highlighted in blue

### Filter Bar
- All filters are pill-shaped dropdowns
- Hover to see border color change
- Click to open dropdown
- Select empty option to clear filter

### Summary Cards
- Show totals for current filtered data
- Update in real-time when filters change
- Hover for lift effect

### Table
- 13 columns showing all data
- Hover over rows for highlight
- Horizontal scroll on small screens
- Clean, minimal design

### Pagination
- Shows up to 6 page numbers
- Current page has dark background
- Click any number to jump to that page
- Centered alignment

## 🔍 Data Info

- **Total Records**: ~100,000 (limited for memory)
- **Page Size**: 10 records per page
- **Load Time**: 10-30 seconds on first start
- **Subsequent Loads**: Instant (cached in memory)

## ⚡ Performance Tips

1. **First Load**: Be patient, CSV is large
2. **Filters**: Single-select is faster than multi-select
3. **Search**: Debounced for better performance
4. **Pagination**: Server-side for efficiency

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Or change port in backend/.env
PORT=5001
```

### Frontend won't start
```bash
# Check if port 3000 is in use
# Or Vite will automatically use 3001
```

### Memory error
```bash
# Already configured with 4GB
# If still issues, increase in backend/package.json:
"dev": "nodemon --max-old-space-size=8192 src/index.js"
```

### No data showing
1. Check backend console for "Data loaded and ready"
2. Check browser console for errors
3. Verify CSV file is in root directory

## 📚 Documentation

- **FEATURE_VERIFICATION.md** - Complete feature checklist
- **TROUBLESHOOTING.md** - Detailed troubleshooting
- **COMPLETE_PROJECT_STATUS.md** - Full project overview
- **NEW_UI_SPECIFICATION.md** - UI design details

## ✅ Checklist

Before testing, ensure:
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] "Data loaded and ready" message shown
- [ ] Browser opened to http://localhost:3000
- [ ] No console errors

## 🎉 You're Ready!

The application is fully functional with:
- ✅ All 7 filters working
- ✅ Search functionality
- ✅ 6 sort options
- ✅ 13-column table
- ✅ 3 summary cards
- ✅ Pagination (1-6)
- ✅ Responsive design

**Enjoy exploring the Sales Management System!** 🚀
