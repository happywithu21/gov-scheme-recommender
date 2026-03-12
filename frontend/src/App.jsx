import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import EligibilityForm from './pages/EligibilityForm';
import Recommendations from './pages/Recommendations';
import SchemeDetails from './pages/SchemeDetails';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eligibility" element={<EligibilityForm />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/scheme/:id" element={<SchemeDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
