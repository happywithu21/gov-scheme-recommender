import { NavLink, Link } from 'react-router-dom';
import { Home, Library, Grid, Repeat, BarChart3, BookOpen, Info } from 'lucide-react';

export default function Navigation() {
  return (
    <header className="navbar fade-in">
      <div className="nav-brand">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.8rem', background: 'var(--gradient-primary)', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>🏛️</span>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: '1', color: 'var(--text-dark)' }}>YojanaMitra</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '500' }}>Your companion for government schemes</span>
          </span>
        </Link>
      </div>
      
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Home size={18} /> Home
        </NavLink>
        <NavLink to="/schemes" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Library size={18} /> All Schemes
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Grid size={18} /> Categories
        </NavLink>
        <NavLink to="/compare" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Repeat size={18} /> Compare
        </NavLink>
        <NavLink to="/insights" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <BarChart3 size={18} /> Insights
        </NavLink>
        
        <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 0.5rem' }}></div>
        
        <NavLink to="/apply" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <BookOpen size={18} /> Guide
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Info size={18} /> Help
        </NavLink>
        
        <Link to="/find" className="btn btn-gradient btn-sm" style={{ marginLeft: '1rem', padding: '0.6rem 1.2rem', borderRadius: '50px' }}>
          Check Eligibility
        </Link>
      </nav>
    </header>
  );
}
