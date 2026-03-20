import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SchemeCard from '../components/SchemeCard';
import FilterSidebar from '../components/FilterSidebar';
import { fetchAllSchemes } from '../services/api';

export default function AllSchemes() {
  const location = useLocation();
  const prefilledCategory = location.state?.prefilledCategory || 'All';
  const prefilledState = location.state?.prefilledState || 'All India';
  
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination & Filter State
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 12; // Items per page
  
  const [activeFilters, setActiveFilters] = useState({
    search: '',
    category: prefilledCategory,
    state: prefilledState,
    income_max: 1000000,
    gender: 'All'
  });

  // Debounce API calls slightly
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchAllSchemes(activeFilters, skip, limit);
        setSchemes(result.data || []);
        setTotalCount(result.total || 0);
        setError(null);
      } catch (err) {
        setError('Failed to load schemes. Ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    const timerId = setTimeout(() => {
      loadData();
    }, 300); // 300ms debounce

    return () => clearTimeout(timerId);
  }, [activeFilters, skip]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    setSkip(0); // Reset to page 1 on filter change
  };

  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  return (
    <div className="page-container" style={{ maxWidth: '1400px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="form-title">Scheme Directory</h1>
        <p className="form-subtitle">Browse {totalCount > 0 ? totalCount : 'all'} government schemes tailored for citizens</p>
      </div>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Left Sidebar */}
        <aside style={{ flex: '1 1 300px', maxWidth: '350px' }}>
          <FilterSidebar 
            onFilterChange={handleFilterChange} 
            initialFilters={activeFilters} 
            totalCount={totalCount} 
          />
        </aside>

        {/* Right Content Area */}
        <section style={{ flex: '3 1 800px' }}>
          
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div className="spinner"></div>
            </div>
          )}
          
          {error && (
            <div className="shadow-card text-center" style={{ padding: '3rem', color: 'red' }}>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && schemes.length === 0 && (
            <div className="shadow-card text-center" style={{ padding: '4rem' }}>
              <h3>No match found</h3>
              <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Try adjusting your filters or search terms.</p>
            </div>
          )}

          {!loading && !error && schemes.length > 0 && (
            <>
              <div className="schemes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {schemes.map((scheme, index) => (
                  <div key={scheme.id} className={`stagger-${(index % 6) + 1}`}>
                    <SchemeCard scheme={scheme} />
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
                  <button 
                    className="btn btn-outline"
                    disabled={skip === 0}
                    onClick={() => setSkip(skip - limit)}
                  >
                    Previous
                  </button>
                  <span style={{ fontWeight: 500, color: 'var(--text-light)' }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    className="btn btn-primary"
                    disabled={skip + limit >= totalCount}
                    onClick={() => setSkip(skip + limit)}
                  >
                    Next Page
                  </button>
                </div>
              )}
            </>
          )}

        </section>
      </div>
    </div>
  );
}
