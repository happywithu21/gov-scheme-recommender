import React from 'react';
import { Info, HelpCircle } from 'lucide-react';

export function About() {
  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="shadow-card text-center">
        <Info color="var(--primary)" size={48} style={{ marginBottom: '1rem' }} />
        <h1>About the Project</h1>
        <p style={{ marginTop: '1rem', color: 'var(--text-light)', lineHeight: '1.8' }}>
          YojanaMitra was created to bridge the information gap between Indian citizens and welfare programs. Your companion for government schemes — utilizing the national Open Government Data Platform India (data.gov.in), 
          this platform empowers citizens to input key metrics and instantly discover the government schemes they are eligible for.
        </p>
      </div>
    </div>
  );
}

export function HowToApply() {
  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="shadow-card text-center">
        <HelpCircle color="var(--secondary)" size={48} style={{ marginBottom: '1rem' }} />
        <h1>Application Guidelines</h1>
        <div style={{ textAlign: 'left', marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Standard Documents Needed:</h3>
          <ul>
            <li>Valid Aadhar Card</li>
            <li>Recent Passport Sized Photographs</li>
            <li>Income Certificate (if applicable)</li>
            <li>Caste Certificate (if applicable)</li>
            <li>Local Domicile / Resident Proof</li>
          </ul>
          <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
            Note: Every scheme operates uniquely. When viewing a scheme via the "Compare" or "Find Schemes" tab, click the <b>Apply</b> link to be redirected to the official government portal for specialized forms.
          </p>
        </div>
      </div>
    </div>
  );
}
