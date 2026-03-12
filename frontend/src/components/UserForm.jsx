import { useState } from 'react';

export default function UserForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    gender: '',
    category: '',
    state: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      age: formData.age ? parseInt(formData.age) : null,
      income: formData.income ? parseFloat(formData.income) : null,
      gender: formData.gender || null,
      category: formData.category || null,
      state: formData.state || null
    });
  };

  return (
    <form className="user-form shadow-card" onSubmit={handleSubmit}>
      <h2 className="form-title">Determine Your Eligibility</h2>
      <p className="form-subtitle">Fill in your details below. We'll match you with the best government schemes.</p>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Age <span className="required">*</span></label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 25" required min="0" max="120" />
        </div>
        <div className="form-group">
          <label>Gender <span className="required">*</span></label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Annual Family Income (INR)</label>
        <input type="number" name="income" value={formData.income} onChange={handleChange} placeholder="e.g. 150000" min="0" />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Any</option>
            <option value="General">General</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC">OBC</option>
          </select>
        </div>
        <div className="form-group">
          <label>State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="e.g. Maharashtra" />
        </div>
      </div>

      <button type="submit" className="btn btn-primary submit-btn" disabled={isLoading}>
        {isLoading ? 'Analyzing Schemes...' : 'Find Schemes'}
      </button>
    </form>
  );
}
