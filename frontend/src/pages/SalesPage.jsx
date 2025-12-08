import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import FilterBar from '../components/FilterBar';
import SummaryCards from '../components/SummaryCards';
import SalesTable from '../components/SalesTable';
import Pagination from '../components/Pagination';
import { useSalesData } from '../hooks/useSalesData';
import '../styles/SalesPage.css';

function SalesPage() {
  const [filters, setFilters] = useState({
    search: '',
    customerRegion: '',
    gender: '',
    minAge: null,
    maxAge: null,
    productCategory: '',
    tags: '',
    paymentMethod: '',
    startDate: '',
    endDate: ''
  });

  const [sorting, setSorting] = useState({
    sortBy: 'customerName',
    sortOrder: 'asc'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, pagination, loading, error } = useSalesData(filters, sorting, currentPage, pageSize);

  const handleSearchChange = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSorting(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="sales-page">
      <Sidebar />
      
      <div className="main-container">
        <TopHeader 
          searchValue={filters.search} 
          onSearchChange={handleSearchChange} 
        />
        
        <div className="content-area">
          <FilterBar 
            filters={filters}
            sorting={sorting}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          
          <SummaryCards data={data} pagination={pagination} />
          
          {loading && <div className="loading">Loading transactions...</div>}
          {error && <div className="error">Error: {error}</div>}
          
          {!loading && !error && (
            <>
              <SalesTable data={data} />
              <Pagination
                currentPage={currentPage}
                totalPages={pagination?.totalPages || 1}
                totalRecords={pagination?.totalRecords || 0}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalesPage;
