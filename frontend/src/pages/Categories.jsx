import { useNavigate } from 'react';
import { BookOpen, Sprout, Briefcase, GraduationCap, Heart, Users } from 'lucide-react';

export default function Categories() {
  const navigate = useNavigate();
  
  const categoryData = [
    { name: "Students", icon: <GraduationCap size={40} />, color: "#3B82F6", routeParam: "Students", count: "40+ Schemes" },
    { name: "Farmers", icon: <Sprout size={40} />, color: "#10B981", routeParam: "Farmers", count: "25+ Schemes" },
    { name: "Women", icon: <Heart size={40} />, color: "#EC4899", routeParam: "Women", count: "30+ Schemes" },
    { name: "Entrepreneurs", icon: <Briefcase size={40} />, color: "#F59E0B", routeParam: "Entrepreneurs", count: "15+ Schemes" },
    { name: "Senior Citizens", icon: <Users size={40} />, color: "#6366F1", routeParam: "Senior Citizens", count: "20+ Schemes" },
    { name: "General", icon: <BookOpen size={40} />, color: "#64748B", routeParam: "General", count: "100+ Schemes" }
  ];

  const handleCategoryClick = (categoryName) => {
    // Navigate to All Schemes page with the category filter pre-applied via state
    navigate(`/schemes`, { state: { prefilledCategory: categoryName } });
  };

  return (
    <div className="page-container fade-in">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="form-title">Browse by Category</h1>
        <p className="form-subtitle">Find government initiatives tailored to your specific life stage and occupation.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {categoryData.map((cat, idx) => (
          <div 
            key={idx} 
            className="category-card shadow-card"
            onClick={() => handleCategoryClick(cat.routeParam)}
            style={{ 
              padding: '2.5rem 2rem', 
              textAlign: 'center', 
              cursor: 'pointer',
              borderTop: `4px solid ${cat.color}`,
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ color: cat.color, marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              {cat.icon}
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>{cat.name}</h2>
            <p style={{ color: 'var(--text-light)', fontWeight: 500 }}>{cat.count}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: '4rem 0', marginTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Schemes by State</h2>
          <p style={{ color: 'var(--text-light)' }}>Find welfare programs localized to your region.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
          {["Maharashtra", "Punjab", "Karnataka", "Delhi", "Uttar Pradesh", "Tamil Nadu"].map((state, idx) => (
            <div 
              key={idx}
              className="state-card btn-outline"
              onClick={() => navigate('/schemes', { state: { prefilledState: state } })}
              style={{ padding: '1.5rem', textAlign: 'center', cursor: 'pointer', borderRadius: '12px', fontWeight: 'bold' }}
            >
              {state}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
