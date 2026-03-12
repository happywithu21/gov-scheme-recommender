import { Link } from 'react-router-dom';

export default function SchemeCard({ scheme }) {
  // Gracefully handle potentially long descriptions
  const renderDescription = () => {
    if (!scheme.description) return "No description available.";
    return scheme.description.length > 120 
      ? `${scheme.description.substring(0, 120)}...` 
      : scheme.description;
  };

  return (
    <div className="scheme-card shadow-card">
      <div className="card-header">
        <h3>{scheme.scheme_name}</h3>
      </div>
      
      <div className="card-body">
        <p className="scheme-desc">{renderDescription()}</p>
        
        <div className="scheme-meta-tags">
          {scheme.state && scheme.state !== 'All' && <span className="badge state-badge">📍 {scheme.state}</span>}
          {scheme.category && scheme.category !== 'All' && <span className="badge category-badge">👥 {scheme.category}</span>}
          {scheme.income_limit && <span className="badge income-badge">💰 Up to ₹{scheme.income_limit}</span>}
        </div>
      </div>

      <div className="card-actions">
        <Link to={`/scheme/${scheme.id}`} className="btn btn-outline">View Details</Link>
        {scheme.application_link && (
          <a href={scheme.application_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Apply Here</a>
        )}
      </div>
    </div>
  );
}
