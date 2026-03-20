import { Link } from 'react-router-dom';
import { Landmark, Github, Twitter, Mail, HelpCircle, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" style={{ 
      background: 'white', 
      padding: '5rem 2rem 2rem', 
      borderTop: '1px solid #f1f5f9',
      marginTop: '6rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Brand and Description */}
          <div style={{ gridColumn: 'span 1.5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem', background: 'var(--gradient-primary)', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>🏛️</span>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-dark)' }}>YojanaMitra</span>
            </div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Your companion for government schemes</p>
            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '300px' }}>
              YojanaMitra helps citizens discover and access government benefits using official open data from data.gov.in.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="#" className="hover-scale"><Twitter size={20} color="var(--text-light)" /></a>
              <a href="#" className="hover-scale"><Github size={20} color="var(--text-light)" /></a>
              <a href="#" className="hover-scale"><Mail size={20} color="var(--text-light)" /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 style={{ color: 'var(--text-dark)', fontWeight: '700', marginBottom: '1.5rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/" style={{ color: 'var(--text-light)', fontSize: '0.9rem', textDecoration: 'none' }} className="nav-links a:hover">Home</Link></li>
              <li><Link to="/find" style={{ color: 'var(--text-light)', fontSize: '0.9rem', textDecoration: 'none' }}>Find Schemes</Link></li>
              <li><Link to="/schemes" style={{ color: 'var(--text-light)', fontSize: '0.9rem', textDecoration: 'none' }}>All Schemes</Link></li>
              <li><Link to="/categories" style={{ color: 'var(--text-light)', fontSize: '0.9rem', textDecoration: 'none' }}>Categories</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ color: 'var(--text-dark)', fontWeight: '700', marginBottom: '1.5rem' }}>Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/apply" style={{ color: 'var(--text-light)', fontSize: '0.9rem', textDecoration: 'none' }}>How to Apply</Link></li>
              <li><Link to="/about" style={{ color: 'var(--text-light)', fontSize: '0.9rem', textDecoration: 'none' }}>FAQ</Link></li>
              <li><Link to="/about" style={{ color: 'var(--text-light)', fontSize: '0.9rem', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li><Link to="/about" style={{ color: 'var(--text-light)', fontSize: '0.9rem', textDecoration: 'none' }}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Data Source */}
          <div>
            <h4 style={{ color: 'var(--text-dark)', fontWeight: '700', marginBottom: '1.5rem' }}>Official Source</h4>
            <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: 'var(--primary)', 
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}>
              data.gov.in <ExternalLink size={14} />
            </a>
            <p style={{ color: 'var(--text-light)', fontSize: '0.8rem', marginTop: '1rem', lineHeight: '1.5' }}>
              Leveraging the Open Government Data Platform for transparency.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          paddingTop: '2rem', 
          borderTop: '1px solid #f1f5f9', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} YojanaMitra. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>
            Made with <span style={{ color: '#ef4444' }}>❤️</span> for Bharat
          </div>
        </div>
      </div>
    </footer>
  );
}

