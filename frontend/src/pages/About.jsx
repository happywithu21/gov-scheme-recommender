import React from 'react';
import { Shield, Target, Smartphone } from 'lucide-react';

export default function About() {
  return (
    <div className="page-container fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="form-title">About Our Mission</h1>
        <p className="form-subtitle">Bridging the gap between government welfare and citizens through modern technology.</p>
      </div>

      <div className="shadow-card" style={{ padding: '3rem', marginBottom: '3rem', lineHeight: 1.7, color: 'var(--text-light)' }}>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          The Government Scheme Recommendation System was created to simplify the discovery process for thousands of welfare programs available across India. Navigating official portals can be overwhelming, often resulting in eligible citizens missing out on transformative benefits.
        </p>
        <p style={{ fontSize: '1.1rem' }}>
          Our AI-driven recommendation engine analyzes demographic data in real-time, mapping citizen profiles against the official eligibility matrices provided by data.gov.in.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div className="shadow-card text-center" style={{ padding: '2rem' }}>
          <Shield size={40} style={{ color: 'var(--secondary)', margin: '0 auto 1.5rem' }} />
          <h3 style={{ marginBottom: '1rem' }}>Privacy Focused</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>We utilize anonymous matching. Your demographic inputs are never linked to your personal identity without explicitly requesting consent.</p>
        </div>

        <div className="shadow-card text-center" style={{ padding: '2rem' }}>
          <Target size={40} style={{ color: 'var(--primary)', margin: '0 auto 1.5rem' }} />
          <h3 style={{ marginBottom: '1rem' }}>Data Integrity</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Schemes are automatically synced and curated from Open Government Databases, ensuring you receive precise and updated legal criteria.</p>
        </div>

        <div className="shadow-card text-center" style={{ padding: '2rem' }}>
          <Smartphone size={40} style={{ color: '#F59E0B', margin: '0 auto 1.5rem' }} />
          <h3 style={{ marginBottom: '1rem' }}>Accessibility</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Designed from the ground-up to be easily understood and accessible on mobile devices, reaching citizens in rural sub-divisions.</p>
        </div>
      </div>
    </div>
  );
}
