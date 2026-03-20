import React from 'react';

export default function HowToApply() {
  return (
    <div className="page-container fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="form-title">How To Apply for Schemes</h1>
        <p className="form-subtitle">A step-by-step guide to securing your government benefits.</p>
      </div>

      <div className="shadow-card" style={{ padding: '3rem' }}>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>1</div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Check Eligibility</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Use our Recommendation Engine to anonymously verify if you qualify for a scheme based on age, income, category, and state.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>2</div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Gather Documents</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Review the "Required Documents" section on the Scheme Details page. Ensure you have digital copies of your Aadhaar Card, Income Certificate, and standard photos.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>3</div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Access the Official Portal</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Click the "Apply Now" button on the Scheme Details page. You will be securely redirected to the official government application portal.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>4</div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Track Status</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Save the application reference ID provided by the government portal to track your application status locally on the respective ministry's webpage.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
