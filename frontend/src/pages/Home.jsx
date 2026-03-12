import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section text-center" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
          Find Government Schemes Designed For You
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '2.5rem' }}>
          Discover eligibility for hundreds of central and state-level welfare programs in India quickly and easily.
        </p>
        <Link to="/eligibility" className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}>
          Check Your Eligibility Now
        </Link>
      </div>

      <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        <div className="shadow-card text-center" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</h2>
          <h3>Fast & Accurate</h3>
          <p className="subtitle">Powered by a precise matching algorithm.</p>
        </div>
        <div className="shadow-card text-center" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</h2>
          <h3>Privacy First</h3>
          <p className="subtitle">Your data is never stored permanently without your consent.</p>
        </div>
        <div className="shadow-card text-center" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏛️</h2>
          <h3>Official Sources</h3>
          <p className="subtitle">Data natively pulled from data.gov.in datasets.</p>
        </div>
      </div>
    </div>
  );
}
