# Architecture Document

## Backend Architecture

### Overview
The backend follows a layered architecture pattern with clear separation of concerns.

### Folder Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── models/          # MongoDB schemas
│   ├── config/          # Database configuration
│   ├── scripts/         # Data import scripts
│   ├── utils/           # Helper functions
│   ├── routes/          # API route definitions
│   └── index.js         # Application entry point
├── package.json
└── README.md
```

### Module Responsibilities

**Controllers (`controllers/salesController.js`)**
- Handle HTTP requests and responses
- Parse query parameters
- Validate input data
- Call service layer functions
- Format API responses

**Services (`services/salesService.js`)**
- Implement business logic
- Build MongoDB queries based on filters
- Execute database operations
- Return processed data to controllers

**Models (`models/Sale.js`)**
- Define MongoDB schema for sales data
- Configure indexes for optimized queries
- Define data validation rules

**Config (`config/database.js`)**
- MongoDB connection management
- Connection pooling configuration
- Error handling for database operations

**Scripts (`scripts/importData.js`)**
- One-time CSV to MongoDB data import
- Batch processing for large datasets
- Index creation after import

**Routes (`routes/salesRoutes.js`)**
- Define API endpoints
- Map routes to controller functions

### Data Flow
1. Client sends HTTP request to API endpoint
2. Express router directs request to appropriate controller
3. Controller parses request parameters and calls service
4. Service builds MongoDB query with filters, search, and sorting
5. Service executes query with pagination
6. MongoDB returns filtered and paginated results
7. Controller sends JSON response to client

## Frontend Architecture

### Overview
Component-based React architecture with custom hooks for data management.

### Folder Structure
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── services/        # API communication
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # CSS modules
│   ├── App.jsx          # Root component
│   └── main.jsx         # Application entry
├── public/
├── index.html
├── vite.config.js
└── package.json
```

### Module Responsibilities

**Pages (`pages/SalesPage.jsx`)**
- Main application page
- Manages application state (filters, sorting, pagination)
- Coordinates child components
- Handles user interactions

**Components**
- `SearchBar.jsx`: Search input with debouncing
- `FilterPanel.jsx`: Multi-select and range filters
- `SortingDropdown.jsx`: Sort controls
- `SalesTable.jsx`: Data table display
- `Pagination.jsx`: Page navigation controls

**Services (`services/api.js`)**
- Axios instance configuration
- API endpoint functions
- Request/response handling

**Hooks (`hooks/useSalesData.js`)**
- Custom hook for data fetching
- Manages loading and error states
- Triggers API calls on dependency changes

### Data Flow
1. User interacts with UI (search, filter, sort, paginate)
2. Page component updates state
3. State change triggers `useSalesData` hook
4. Hook calls API service with current parameters
5. API service sends request to backend
6. Response updates hook state
7. Components re-render with new data

## Key Design Decisions

### Backend
- **MongoDB Atlas**: Cloud database for scalability and reliability
- **Indexed queries**: Optimized database indexes for fast filtering
- **Query parameter API**: RESTful design, flexible filtering
- **Mongoose ODM**: Schema validation and query building

### Frontend
- **Debounced search**: Reduces API calls, improves UX
- **Controlled components**: Single source of truth for state
- **Custom hooks**: Reusable data fetching logic
- **CSS modules**: Scoped styling, no conflicts

## Performance Considerations
- MongoDB indexes on frequently queried fields (region, gender, category, tags, date)
- Text indexes for full-text search on customer name and phone
- Server-side pagination reduces data transfer
- Frontend debounces search input to reduce API calls
- Filters and sorting executed at database level for efficiency
- Connection pooling for optimal database performance
