import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, FileText, Check, AlertCircle, Calendar } from 'lucide-react';
import { fetchSchemeById } from '../services/api';

export default function SchemeDetails() {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadScheme = async () => {
      try {
        const data = await fetchSchemeById(id);
        setScheme(data);
      } catch (err) {
        setError('Failed to load scheme details.');
      } finally {
        setLoading(false);
      }
    };
    loadScheme();
  }, [id]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column', gap: '1rem' }}>
      <div className="spinner"></div>
      <p>Loading scheme data...</p>
    </div>
  );

  if (error || !scheme) return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      <AlertCircle size={48} style={{ margin: '0 auto 1rem' }} />
      <h2>{error || "Scheme not found."}</h2>
      <Link to="/schemes">Return to All Schemes</Link>
    </div>
  );

  // Split comma separated documents nicely
  const docsList = scheme.documents_required ? scheme.documents_required.split(',').map(d => d.trim()) : [];

  return (
    <div className="scheme-details-page fade-in" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Navigation Breadcrumb */}
      <Link to="/schemes" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '2rem' }}>
        <ArrowLeft size={20} /> Back to Search
      </Link>

      {/* Hero Header */}
      <div className="scheme-header" style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', marginBottom: '2rem', borderTop: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>{scheme.category || 'General'}</span>
          <span className="badge" style={{ background: '#FCE7F3', color: '#BE185D' }}>{scheme.ministry || 'Government of India'}</span>
          <span className="badge" style={{ background: '#FEF3C7', color: '#D97706' }}>{scheme.state || 'All India'}</span>
        </div>
        
        <h1 style={{ fontSize: '2.5rem', color: 'var(--text-dark)', marginBottom: '1rem' }}>{scheme.scheme_name}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', lineHeight: '1.6' }}>{scheme.description}</p>
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          {scheme.application_link ? (
            <a href={scheme.application_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Apply Now on Official Portal
            </a>
          ) : (
             <button className="btn btn-primary" disabled style={{ opacity: 0.5, padding: '1rem 2rem' }}>Application Offline</button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem', height: '100%' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
              <CheckCircle size={24} /> Key Benefits
            </h3>
            <div style={{ background: '#F0FDF4', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary)' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#166534', margin: 0 }}>
                {scheme.benefits || "Direct benefits applied upon successful verification."}
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
              <Calendar size={24} /> Detailed Eligibility
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-light)' }}>Age Criteria:</span>
                <strong>{scheme.min_age || 0} to {scheme.max_age || "No Limits"} Years</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-light)' }}>Income Limit:</span>
                <strong>{scheme.income_limit && scheme.income_limit > 0 ? `Under ₹ ${scheme.income_limit.toLocaleString()}` : "No Limit"}</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-light)' }}>Gender:</span>
                <strong>{scheme.gender || "All Genders"}</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <FileText size={24} /> Required Documents
          </h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Please gather the following documents before beginning your application:</p>
          
          {docsList.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {docsList.map((doc, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                  <Check size={20} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontWeight: 500 }}>{doc}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontStyle: 'italic', color: 'gray' }}>No specific documents specified. Contact local authorities.</p>
          )}
        </div>

      </div>

    </div>
  );
}
