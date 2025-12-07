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
- Coordinate data processing operations
- Manage data initialization and caching
- Return processed data to controllers

**Utils**
- `dataLoader.js`: CSV file parsing and data loading
- `dataProcessor.js`: Pure functions for filtering, sorting, searching, and pagination

**Routes (`routes/salesRoutes.js`)**
- Define API endpoints
- Map routes to controller functions

### Data Flow
1. Client sends HTTP request to API endpoint
2. Express router directs request to appropriate controller
3. Controller parses request parameters and calls service
4. Service applies search, filters, sorting via utility functions
5. Service applies pagination and returns formatted result
6. Controller sends JSON response to client

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
- **In-memory data caching**: CSV loaded once on first request for performance
- **Pure utility functions**: Separate concerns, easier testing
- **Query parameter API**: RESTful design, flexible filtering

### Frontend
- **Debounced search**: Reduces API calls, improves UX
- **Controlled components**: Single source of truth for state
- **Custom hooks**: Reusable data fetching logic
- **CSS modules**: Scoped styling, no conflicts

## Performance Considerations
- Backend caches parsed CSV data in memory
- Frontend debounces search input
- Pagination limits data transfer
- Filters applied server-side for efficiency
