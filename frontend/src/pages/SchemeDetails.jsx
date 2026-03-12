import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSchemeById } from '../services/api';

export default function SchemeDetails() {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchSchemeById(id);
        setScheme(data);
      } catch (err) {
        setError("Scheme not found or backend server is unavailable.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center" style={{ marginTop: '4rem' }}><h2>Loading details...</h2></div>;
  if (error || !scheme) return <div className="text-center" style={{ marginTop: '4rem' }}><h2>{error || "Scheme not found."}</h2><Link to="/" className="btn btn-primary mt-4">Go Home</Link></div>;

  return (
    <div className="scheme-details-container shadow-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to={-1} className="btn-outline btn-sm" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>&larr; Back</Link>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{scheme.scheme_name}</h1>
      
      <div className="scheme-tags" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {scheme.state && <span className="badge">State: {scheme.state}</span>}
        {scheme.category && <span className="badge">Category: {scheme.category}</span>}
        {scheme.income_limit && <span className="badge">Income Limit: ₹{scheme.income_limit}</span>}
      </div>

      <div className="details-section" style={{ marginBottom: '2rem' }}>
        <h3>Overview</h3>
        <p>{scheme.description}</p>
      </div>

      <div className="details-section" style={{ marginBottom: '2rem' }}>
        <h3>Benefits</h3>
        <p>{scheme.benefits || "Details about benefits are not listed for this scheme."}</p>
      </div>

      <div className="details-section" style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px' }}>
        <h3>Eligibility Criteria Breakdown</h3>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Age:</strong> {scheme.min_age || 0} to {scheme.max_age || 'Any'} years</li>
          <li><strong>Income:</strong> {scheme.income_limit ? `Up to ₹${scheme.income_limit} annually` : 'No limit specified'}</li>
          <li><strong>Gender:</strong> {scheme.gender || 'All'}</li>
          <li><strong>Social Category:</strong> {scheme.category || 'All Categories'}</li>
        </ul>
      </div>

      {scheme.documents_required && (
        <div className="details-section" style={{ marginBottom: '2rem' }}>
          <h3>Documents Required</h3>
          <p>{scheme.documents_required}</p>
        </div>
      )}

      {scheme.application_link && (
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <a href={scheme.application_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 3rem' }}>
            Apply for Scheme Officially
          </a>
        </div>
      )}
    </div>
  );
}
