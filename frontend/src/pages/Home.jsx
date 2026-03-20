import Hero from '../components/Hero';
import StatisticsBanner from '../components/StatisticsBanner';
import PopularSchemes from '../components/PopularSchemes';
import { Zap, ShieldCheck, Landmark } from 'lucide-react';

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <StatisticsBanner />

      <div className="features-section" style={{ padding: '6rem 0' }}>
        <div className="text-center mb-12" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Why Use Our Platform?</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}>State-of-the-art technology for citizen welfare.</p>
        </div>

      <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
        <div className="shadow-card text-center transition-transform">
          <Zap size={48} color="var(--secondary)" className="mb-4 mx-auto" />
          <h3 className="mb-2 mt-4 text-xl font-bold">Fast & Accurate</h3>
          <p className="subtitle text-light">Powered by a precise matching algorithm analyzing real-time eligibility criteria.</p>
        </div>
        <div className="shadow-card text-center transition-transform">
          <ShieldCheck size={48} color="var(--primary)" className="mb-4 mx-auto" />
          <h3 className="mb-2 mt-4 text-xl font-bold">Privacy First</h3>
          <p className="subtitle text-light">Your demographic inputs are never stored permanently without transparent consent.</p>
        </div>
        <div className="shadow-card text-center transition-transform">
          <Landmark size={48} color="var(--text-dark)" className="mb-4 mx-auto" />
          <h3 className="mb-2 mt-4 text-xl font-bold">Official Sources</h3>
          <p className="subtitle text-light">Data actively curated directly from the Open Government Data Platform (data.gov.in).</p>
        </div>
        </div>
      </div>
      
      <div style={{ padding: '4rem 0' }}>
        <PopularSchemes />
      </div>

    </div>
  );
}
