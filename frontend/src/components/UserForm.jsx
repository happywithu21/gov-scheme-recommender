import React, { useState } from 'react';
import { User, MapPin, Wallet, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function UserForm({ onSubmit }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    state: '',
    income: '',
    category: '',
    occupation: '',
    education: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      age: formData.age ? parseInt(formData.age, 10) : null,
      income: formData.income ? parseFloat(formData.income) : null,
    };
    Object.keys(payload).forEach(key => {
      if (payload[key] === '') {
        delete payload[key];
      }
    });
    onSubmit(payload);
  };

  const StepIndicator = ({ currentStep }) => (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`}>
          <User size={18} />
        </div>
        <div className={`step-line-new ${currentStep >= 2 ? 'active' : ''}`}></div>
        <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`}>
          <MapPin size={18} />
        </div>
        <div className={`step-line-new ${currentStep >= 3 ? 'active' : ''}`}></div>
        <div className={`step-dot ${currentStep >= 3 ? 'active' : ''}`}>
          <Wallet size={18} />
        </div>
      </div>
      <p style={{ textAlign: 'center', fontWeight: '600', color: 'var(--text-light)', fontSize: '0.9rem' }}>
        Step {currentStep} of 3: {currentStep === 1 ? 'Personal' : currentStep === 2 ? 'Demographics' : 'Financial'}
      </p>
    </div>
  );

  return (
    <div className="user-form shadow-card fade-in" style={{ padding: '3rem', borderRadius: '24px' }}>
      <StepIndicator currentStep={step} />

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        <div className="form-container" style={{ minHeight: '300px' }}>
          {step === 1 && (
            <div className="form-animation-in">
              <h2 className="form-title" style={{ textAlign: 'left', marginBottom: '2rem', fontSize: '1.5rem' }}>Personal Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="age">Age Group <span className="required">*</span></label>
                  <select id="age" name="age" value={formData.age} onChange={handleChange} required className="custom-select">
                    <option value="">Select Age Group</option>
                    <option value="20">18 - 25</option>
                    <option value="30">26 - 35</option>
                    <option value="40">36 - 45</option>
                    <option value="53">46 - 60</option>
                    <option value="70">60+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender <span className="required">*</span></label>
                  <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="custom-select">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-animation-in">
              <h2 className="form-title" style={{ textAlign: 'left', marginBottom: '2rem', fontSize: '1.5rem' }}>Demographics</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="state">State of Residence <span className="required">*</span></label>
                  <select id="state" name="state" value={formData.state} onChange={handleChange} required className="custom-select">
                    <option value="">Select State</option>
                    <option value="National">National (All India)</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Social Category <span className="required">*</span></label>
                  <select id="category" name="category" value={formData.category} onChange={handleChange} required className="custom-select">
                    <option value="">Select Category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-animation-in">
              <h2 className="form-title" style={{ textAlign: 'left', marginBottom: '2rem', fontSize: '1.5rem' }}>Financial & Education</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="income">Annual Family Income (INR) <span className="required">*</span></label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>₹</span>
                    <input type="number" id="income" name="income" min="0" step="1000" value={formData.income} onChange={handleChange} required style={{ paddingLeft: '2.5rem' }} placeholder="Enter annual income" />
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="education">Education Level</label>
                    <select id="education" name="education" value={formData.education} onChange={handleChange} className="custom-select">
                      <option value="">Select Level</option>
                      <option value="None">None</option>
                      <option value="10th Pass">10th Pass</option>
                      <option value="12th Pass">12th Pass</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Post Graduate">Post Graduate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="occupation">Occupation</label>
                    <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="e.g., Farmer" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
          {step > 1 ? (
            <button type="button" className="btn btn-outline" onClick={prevStep} style={{ gap: '0.5rem' }}>
              <ArrowLeft size={18} /> Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <button type="submit" className="btn btn-gradient" style={{ gap: '0.5rem', padding: '0.8rem 2rem' }}>
              Next Step <ArrowRight size={18} />
            </button>
          ) : (
            <button type="submit" className="btn btn-gradient" style={{ gap: '0.5rem', padding: '0.8rem 2rem' }}>
              Find My Schemes <CheckCircle2 size={18} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
