import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Coins, ExternalLink, ArrowRight, CheckCircle, Info } from 'lucide-react';

export default function SchemeCard({ scheme }) {
  // Gracefully handle potentially long descriptions
  const renderDescription = () => {
    if (!scheme.description) return "No description available.";
    return scheme.description.length > 100 
      ? `${scheme.description.substring(0, 100)}...` 
      : scheme.description;
  };

  return (
    <div className="scheme-card shadow-card hover-lift fade-in-up" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      padding: '2rem', 
      borderRadius: '20px',
      border: '1px solid #f1f5f9',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative colored strip based on category */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
        background: scheme.category === 'Health' ? '#ef4444' : 
                    scheme.category === 'Education' ? '#3b82f6' : 
                    scheme.category === 'Agriculture' ? '#10b981' : 'var(--primary)'
      }}></div>

      <div className="card-header" style={{ marginBottom: '1.2rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', fontWeight: '800', lineHeight: '1.3' }}>{scheme.scheme_name}</h3>
      </div>
      
      <div className="card-body" style={{ flexGrow: 1, marginBottom: '1.5rem' }}>
        <p className="scheme-desc" style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{renderDescription()}</p>
        
        {/* Benefit Highlight Section */}
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', marginBottom: '1.2rem', display: 'flex', gap: '0.75rem' }}>
          <CheckCircle size={18} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Key Benefit</p>
            <p style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-dark)', margin: 0 }}>
              {scheme.benefits ? (scheme.benefits.length > 60 ? `${scheme.benefits.substring(0, 60)}...` : scheme.benefits) : "Direct financial / service support."}
            </p>
          </div>
        </div>

        {/* Eligibility Preview */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Info size={16} color="var(--primary)" />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>
                Eligible for ages {scheme.min_age || 0}-{scheme.max_age || "Unlimited"}
            </p>
        </div>

        <div className="scheme-meta-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {scheme.state && 
            <span className="badge" style={{ background: '#ecfdf5', color: '#065f46' }}>
                <MapPin size={12} /> {scheme.state}
            </span>}
            {scheme.category && 
            <span className="badge" style={{ background: '#eff6ff', color: '#1e40af' }}>
                <Users size={12} /> {scheme.category}
            </span>}
            {scheme.income_limit && 
            <span className="badge" style={{ background: '#fff7ed', color: '#9a3412' }}>
                <Coins size={12} /> ₹{scheme.income_limit.toLocaleString()}
            </span>}
        </div>
      </div>

      <div className="card-actions" style={{ display: 'flex', gap: '0.8rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
        <Link to={`/scheme/${scheme.id}`} className="btn btn-outline tap-effect" style={{ flex: 1, fontSize: '0.9rem', padding: '0.7rem' }}>
          Details
        </Link>
        {scheme.application_link ? (
          <a href={scheme.application_link} target="_blank" rel="noopener noreferrer" className="btn btn-gradient tap-effect" style={{ flex: 1.5, fontSize: '0.9rem', padding: '0.7rem', gap: '0.5rem' }}>
            Apply <ExternalLink size={16} />
          </a>
        ) : (
          <button disabled className="btn btn-outline" style={{ flex: 1.5, opacity: 0.5, fontSize: '0.9rem' }}>Offline</button>
        )}
      </div>
    </div>
  );
}
