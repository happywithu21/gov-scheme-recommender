import { useState } from 'react';
import { Search, Filter, RefreshCcw, ChevronDown, ChevronUp, User, Users, MapPin, Briefcase, GraduationCap, Sprout, Heart, UserPlus } from 'lucide-react';

export default function FilterSidebar({ onFilterChange, initialFilters, totalCount }) {
  const [filters, setFilters] = useState(initialFilters || {
    search: '',
    category: 'All',
    state: 'All India',
    income_max: 1000000,
    gender: 'All'
  });

  const [expanded, setExpanded] = useState({
    keyword: true,
    quick: true,
    category: true,
    location: true,
    income: true
  });

  const toggleSection = (section) => setExpanded(prev => ({ ...prev, [section]: !prev[section] }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'income_max' ? Number(value) : value;
    const newFilters = { ...filters, [name]: parsedValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const setQuickFilter = (category) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaults = {
      search: '',
      category: 'All',
      state: 'All India',
      income_max: 1000000,
      gender: 'All'
    };
    setFilters(defaults);
    onFilterChange(defaults);
  };

  const categories = ["All", "General", "OBC", "SC", "ST"];
  const quickFilters = [
    { label: "Students", icon: <GraduationCap size={14} />, value: "Students" },
    { label: "Farmers", icon: <Sprout size={14} />, value: "Farmers" },
    { label: "Women", icon: <Heart size={14} />, value: "Women" },
    { label: "Entrepreneurs", icon: <Briefcase size={14} />, value: "Entrepreneurs" },
    { label: "Senior Citizens", icon: <User size={14} />, value: "Senior Citizens" },
  ];
  const states = ["All India", "National", "Andhra Pradesh", "Bihar", "Delhi", "Karnataka", "Maharashtra", "Uttar Pradesh"];

  const SectionHeader = ({ title, section, icon: Icon }) => (
    <div 
      onClick={() => toggleSection(section)}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '1rem', marginTop: section === 'keyword' ? 0 : '1.5rem' }}
    >
      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-dark)' }}>
        {Icon && <Icon size={16} color="var(--primary)" />} {title}
      </h4>
      {expanded[section] ? <ChevronUp size={16} color="var(--text-light)" /> : <ChevronDown size={16} color="var(--text-light)" />}
    </div>
  );

  return (
    <div className="filter-sidebar shadow-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9', position: 'sticky', top: '100px' }}>
      
      <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}><Filter size={20} color="var(--primary)" /> Filters</h3>
          <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '600' }}>
            <RefreshCcw size={14} /> Reset
          </button>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', margin: 0 }}>
           {totalCount || 0} Schemes Found
        </p>
      </div>

      <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)', paddingRight: '5px' }}>
        {/* Search */}
        <SectionHeader title="Search" section="keyword" icon={Search} />
        {expanded.keyword && (
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Search by name..."
                style={{ width: '100%', paddingLeft: '2.5rem', borderRadius: '12px', background: '#f8fafc' }}
              />
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
          </div>
        )}

        {/* Quick Filters */}
        <SectionHeader title="Quick Filters" section="quick" icon={UserPlus} />
        {expanded.quick && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {quickFilters.map(q => (
              <button 
                key={q.value}
                onClick={() => setQuickFilter(q.value)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '0.5rem 0.8rem', borderRadius: '50px', 
                  fontSize: '0.75rem', fontWeight: '600', border: '1px solid #e2e8f0', cursor: 'pointer',
                  background: filters.category === q.value ? 'var(--gradient-primary)' : 'white',
                  color: filters.category === q.value ? 'white' : 'var(--text-light)',
                  transition: 'all 0.2s',
                  boxShadow: filters.category === q.value ? '0 4px 10px rgba(37, 99, 235, 0.2)' : 'none'
                }}
              >
                {q.icon} {q.label}
              </button>
            ))}
          </div>
        )}

        {/* Social Category */}
        <SectionHeader title="Category" section="category" icon={Users} />
        {expanded.category && (
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <select name="category" value={filters.category} onChange={handleChange} style={{ width: '100%', borderRadius: '12px' }} className="custom-select">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
              {!categories.includes(filters.category) && filters.category !== 'All' && <option value={filters.category}>{filters.category}</option>}
            </select>
          </div>
        )}

        {/* Location */}
        <SectionHeader title="State" section="location" icon={MapPin} />
        {expanded.location && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <select name="state" value={filters.state} onChange={handleChange} style={{ width: '100%', borderRadius: '12px' }} className="custom-select">
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            
            <div className="form-group">
                <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Gender Restriction</label>
                <select name="gender" value={filters.gender} onChange={handleChange} style={{ width: '100%', borderRadius: '12px' }} className="custom-select">
                    <option value="All">Any Gender</option>
                    <option value="Male">Male Only</option>
                    <option value="Female">Female Only</option>
                </select>
            </div>
          </div>
        )}

        {/* Income Range */}
        <SectionHeader title="Family Income" section="income" icon={Wallet} />
        {expanded.income && (
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '1rem' }}>Up to ₹ {filters.income_max >= 1000000 ? "10L+ (Any)" : filters.income_max.toLocaleString()}</p>
            <input 
              type="range" 
              name="income_max" 
              min="0" 
              max="1000000" 
              step="50000"
              value={filters.income_max} 
              onChange={handleChange} 
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>
        )}
      </div>

    </div>
  );
}
