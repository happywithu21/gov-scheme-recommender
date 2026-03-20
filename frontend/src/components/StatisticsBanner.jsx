import React from 'react';
import { Landmark, MapPin, Users, Award } from 'lucide-react';

const stats = [
  {
    icon: <Landmark size={28} />,
    value: "250+",
    label: "Government Schemes",
    color: "#2563EB",
    delay: "stagger-1"
  },
  {
    icon: <MapPin size={28} />,
    value: "28",
    label: "States Covered",
    color: "#10B981",
    delay: "stagger-2"
  },
  {
    icon: <Users size={28} />,
    value: "15",
    label: "Scheme Categories",
    color: "#F59E0B",
    delay: "stagger-3"
  },
  {
    icon: <Award size={28} />,
    value: "100%",
    label: "Transparent Data",
    color: "#6366F1",
    delay: "stagger-4"
  }
];

export default function StatisticsBanner() {
  return (
    <section className="stats-banner fade-in" style={{ padding: '4rem 0', background: 'var(--white)', borderBottom: '1px solid #f1f5f9' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`stat-card hover-lift ${stat.delay}`}
              style={{ 
                textAlign: 'center',
                padding: '2rem',
                borderRadius: '24px',
                background: '#f8fafc',
                border: '1px solid #f1f5f9',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div style={{ 
                background: `${stat.color}15`, 
                width: '60px', 
                height: '60px', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: stat.color,
                margin: '0 auto 1.5rem',
                transition: 'transform 0.3s ease'
              }} className="stat-icon">
                {stat.icon}
              </div>
              <h3 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '900', 
                color: 'var(--text-dark)', 
                margin: '0 0 0.5rem',
                letterSpacing: '-1px'
              }}>{stat.value}</h3>
              <p style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                color: 'var(--text-light)', 
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
