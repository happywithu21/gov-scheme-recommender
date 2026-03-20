import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { recommendSchemes } from '../services/api';
import SchemeCard from '../components/SchemeCard';
import { AlertCircle, CheckCircle } from 'lucide-react';

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

  if (loading) return <div className="spinner" style={{ margin: '4rem auto' }}></div>;
  
  if (error) return (
    <div className="text-center page-container" style={{ marginTop: '4rem' }}>
      <AlertCircle size={48} style={{ color: 'var(--text-light)', margin: '0 auto 1.5rem', opacity: 0.5 }} />
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>{error}</p>
      <Link to="/find" className="btn btn-primary">Go to Eligibility Form</Link>
    </div>
  );

  return (
    <div className="recommendations-container page-container fade-in">
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 className="form-title">Your Matches</h1>
        <p className="form-subtitle">Based on your anonymous profile, we found {schemes.length} eligible programs.</p>
      </div>

      {schemes.length === 0 ? (
        <div className="shadow-card text-center" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
          <AlertCircle size={64} style={{ color: 'var(--text-light)', margin: '0 auto 1.5rem', opacity: 0.5 }} />
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>No exact matches found</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
            We couldn't find schemes that precisely match all your criteria at this time. Try removing some restrictions like specific categories or occupations.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/find" className="btn btn-outline">Edit Profile</Link>
            <Link to="/schemes" className="btn btn-primary">Browse All Schemes</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="shadow-card" style={{ padding: '1.5rem', marginBottom: '3rem', background: '#F0FDF4', borderLeft: '4px solid var(--secondary)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <CheckCircle size={32} style={{ color: 'var(--secondary)' }} />
            <div>
              <h3 style={{ margin: 0, color: '#166534' }}>Eligibility Verified</h3>
              <p style={{ margin: 0, color: '#166534', opacity: 0.9 }}>You meet the baseline demographic criteria for the schemes below. Select "View Details" to see required documentation.</p>
            </div>
          </div>

          <div className="schemes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {schemes.map(wrapper => (
              <SchemeCard key={wrapper.scheme?.id || wrapper.id} scheme={wrapper.scheme || wrapper} />
            ))}
          </div>
        </>
      )}

      {schemes.length > 0 && (
         <div style={{ textAlign: 'center', marginTop: '4rem' }}>
           <Link to="/find" className="btn btn-outline" style={{ padding: '0.8rem 2rem' }}>
              &larr; Refine My Profile
           </Link>
         </div>
      )}
    </div>
  );
}
