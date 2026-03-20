import { useState, useEffect } from 'react';
import { fetchAllSchemes } from '../services/api';
import { AlertCircle, Plus, X } from 'lucide-react';

export default function Compare() {
  const [allSchemes, setAllSchemes] = useState([]);
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only scheme Name and IDs for the dropdown to start
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchAllSchemes({}, 0, 500); // Fetch all for selection
        setAllSchemes(result.data || []);
      } catch (err) {
        console.error("Failed to load schemes for comparison");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAddScheme = (e) => {
    const schemeId = parseInt(e.target.value);
    if (!schemeId) return;
    
    const schemeToAdd = allSchemes.find(s => s.id === schemeId);
    if (schemeToAdd && selectedSchemes.length < 3 && !selectedSchemes.find(s => s.id === schemeId)) {
      setSelectedSchemes([...selectedSchemes, schemeToAdd]);
    }
    // Reset select
    e.target.value = "";
  };

  const removeScheme = (id) => {
    setSelectedSchemes(selectedSchemes.filter(s => s.id !== id));
  };

  const renderCell = (content) => {
    return content || <span style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>Not specified</span>;
  };

  return (
    <div className="page-container fade-in" style={{ maxWidth: '1400px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="form-title">Compare Schemes</h1>
        <p className="form-subtitle">Select up to 3 schemes side-by-side to understand which specific benefits fit your profile best.</p>
      </div>

      {loading ? (
        <div className="spinner" style={{ margin: '4rem auto' }}></div>
      ) : (
        <div className="compare-workspace shadow-card" style={{ padding: '2rem' }}>
          
          {/* Controls Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: 0 }}>Selected ({selectedSchemes.length}/3)</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <select 
                onChange={handleAddScheme}
                disabled={selectedSchemes.length >= 3}
                style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', minWidth: '300px' }}
                defaultValue=""
              >
                <option value="" disabled>-- Add Scheme to Compare --</option>
                {allSchemes.map(s => (
                  <option key={s.id} value={s.id} disabled={selectedSchemes.find(selected => selected.id === s.id)}>
                    {s.scheme_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Empty State */}
          {selectedSchemes.length === 0 ? (
             <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-light)' }}>
              <AlertCircle size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>No schemes selected. Use the dropdown above to add schemes to the comparison table.</p>
             </div>
          ) : (
             <div style={{ overflowX: 'auto' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '1.5rem 1rem', background: '#f8fafc', width: '200px', borderBottom: '2px solid var(--border-color)' }}>Criteria</th>
                      
                      {selectedSchemes.map(scheme => (
                        <th key={scheme.id} style={{ padding: '1.5rem 1rem', background: '#f8fafc', borderBottom: '2px solid var(--primary)', position: 'relative', width: `${100 / selectedSchemes.length}%` }}>
                          <div style={{ paddingRight: '2rem' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{scheme.scheme_name}</h4>
                            <span className="badge" style={{ fontSize: '0.75rem' }}>{scheme.state || 'All India'}</span>
                          </div>
                          <button 
                            onClick={() => removeScheme(scheme.id)}
                            style={{ position: 'absolute', top: '1.5rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}
                          >
                            <X size={18} />
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Benefits Row */}
                    <tr>
                      <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)' }}>Core Benefit</td>
                      {selectedSchemes.map(scheme => (
                        <td key={scheme.id} style={{ padding: '1.5rem 1rem', borderBottom: '1px solid var(--border-color)', verticalAlign: 'top', background: '#f0fdf4' }}>
                          {renderCell(scheme.benefits)}
                        </td>
                      ))}
                    </tr>
                    
                    {/* Attributes */}
                    <tr>
                      <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)' }}>Target Category</td>
                      {selectedSchemes.map(scheme => (
                        <td key={scheme.id} style={{ padding: '1.5rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
                          {scheme.category || 'General'}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)' }}>Age Limits</td>
                      {selectedSchemes.map(scheme => (
                        <td key={scheme.id} style={{ padding: '1.5rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
                          {scheme.min_age || 0} to {scheme.max_age || 'Any'} Yrs
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)' }}>Family Income Limit</td>
                      {selectedSchemes.map(scheme => (
                        <td key={scheme.id} style={{ padding: '1.5rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
                          {scheme.income_limit && scheme.income_limit > 0 ? `₹${scheme.income_limit.toLocaleString()}` : "No Max Limit"}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)' }}>Target Gender</td>
                      {selectedSchemes.map(scheme => (
                        <td key={scheme.id} style={{ padding: '1.5rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
                          {scheme.gender || 'All'}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)' }}>Documents</td>
                      {selectedSchemes.map(scheme => (
                        <td key={scheme.id} style={{ padding: '1.5rem 1rem', borderBottom: '1px solid var(--border-color)', verticalAlign: 'top', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                          {renderCell(scheme.documents_required)}
                        </td>
                      ))}
                    </tr>

                  </tbody>
               </table>
             </div>
          )}

        </div>
      )}
    </div>
  );
}
