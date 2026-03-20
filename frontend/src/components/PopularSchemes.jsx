import { useState, useEffect } from 'react';
import SchemeCard from './SchemeCard';
import { fetchAllSchemes } from '../services/api';

export default function PopularSchemes() {
  const [popularSchemes, setPopularSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopular = async () => {
      try {
        // Fetch a small chunk of diverse schemes to simulate 'Popular'
        const result = await fetchAllSchemes({}, 0, 3);
        setPopularSchemes(result.data || []);
      } catch (err) {
        console.error("Could not load popular schemes", err);
      } finally {
        setLoading(false);
      }
    };
    loadPopular();
  }, []);

  if (loading) return <div className="spinner" style={{ margin: '2rem auto' }}></div>;

  if (popularSchemes.length === 0) return null;

  return (
    <div style={{ padding: '4rem 0', background: '#f8fafc' }}>
      <div className="page-container" style={{ margin: '0 auto', maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Trending Schemes</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Most applied government initiatives this month.</p>
          </div>
        </div>

        <div className="schemes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {popularSchemes.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
    </div>
  );
}
