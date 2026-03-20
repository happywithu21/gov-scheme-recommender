import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import heroImg from '../assets/hero.png';

export default function Hero() {
  return (
    <div className="hero-grid bg-pattern">
      <div className="hero-content fade-in">
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
          Find Government Schemes <br />
          <span className="text-gradient">You Are Eligible For</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '2.5rem', maxWidth: '540px' }}>
          Discover benefits, subsidies, and programs tailored to your profile. Join thousands of citizens accessing their rightful benefits.
        </p>
        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
          <Link to="/find" className="btn btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1.1rem', gap: '0.75rem' }}>
            Check Eligibility <ArrowRight size={20} />
          </Link>
          <Link to="/schemes" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', gap: '0.75rem' }}>
            Browse All Schemes <Search size={20} />
          </Link>
        </div>
        
        <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ 
                width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', 
                border: '2px solid white', marginLeft: '-10px', overflow: 'hidden'
              }}>
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: 0 }}>
            <strong>10,000+</strong> Indians found schemes this month
          </p>
        </div>
      </div>
      
      <div className="hero-image-container" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
          zIndex: -1
        }}></div>
        <img 
          src={heroImg} 
          alt="Government Schemes Illustration" 
          style={{ width: '100%', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', animation: 'float 6s ease-in-out infinite' }} 
        />
        
        {/* Decorative Floating Card */}
        <div style={{
          position: 'absolute', bottom: '10%', left: '-5%', background: 'white', padding: '1rem',
          borderRadius: '12px', boxShadow: 'var(--shadow-card)', border: '1px solid #f1f5f9',
          animation: 'slideUp 0.8s ease-out 0.5s both', display: 'flex', gap: '1rem', alignItems: 'center'
        }}>
          <div style={{ width: '40px', height: '40px', background: '#ecfdf5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', margin: 0, color: 'var(--text-light)' }}>Instant Match</p>
            <p style={{ fontSize: '0.875rem', margin: 0, fontWeight: 'bold' }}>Eligible for PM-Kisan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
