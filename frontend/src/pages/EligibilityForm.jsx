import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';

export default function EligibilityForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (profileData) => {
    setIsLoading(true);
    // In a real application, you might handle local state management here (e.g. Redux / Context).
    // For this prototype, we'll navigate directly to the recommendations page and pass the profile state 
    // so the recommendations page can execute the fetch.
    setTimeout(() => {
      setIsLoading(false);
      navigate('/recommendations', { state: { profile: profileData } });
    }, 600); // Artificial delay to simulate processing
  };

  return (
    <div className="page-container">
      <UserForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
}
