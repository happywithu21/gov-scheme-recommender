import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { recommendSchemes } from '../services/api';
import SchemeCard from '../components/SchemeCard';

export default function Recommendations() {
  const location = useLocation();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract user profile from router state
  const profile = location.state?.profile;

  useEffect(() => {
    if (!profile) {
      setLoading(false);
      setError("No profile data found. Please fill out the eligibility form.");
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const data = await recommendSchemes(profile);
        setSchemes(data.recommendations || []);
      } catch (err) {
        setError('Failed to load recommendations. Please ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [profile]);

  if (loading) return <div className="text-center" style={{ marginTop: '4rem' }}><h2>Loading tailored schemes...</h2></div>;
  
  if (error) return (
    <div className="text-center" style={{ marginTop: '4rem' }}>
      <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{error}</p>
      <Link to="/eligibility" className="btn btn-primary">Go to Form</Link>
    </div>
  );

  return (
    <div className="recommendations-container">
      <h2 style={{ marginBottom: '0.5rem' }}>Your Recommended Schemes</h2>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
        We found {schemes.length} schemes matching your eligibility criteria.
      </p>

      {schemes.length === 0 ? (
        <div className="shadow-card text-center">
          <h3>No Exact Matches Found</h3>
          <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>Try adjusting your criteria in the form to broader definitions.</p>
          <Link to="/eligibility" className="btn btn-outline">Modify Search</Link>
        </div>
      ) : (
        <div className="schemes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {schemes.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      )}
    </div>
  );
}
