import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import EligibilityForm from './pages/EligibilityForm';
import Recommendations from './pages/Recommendations';
import SchemeDetails from './pages/SchemeDetails';
import AllSchemes from './pages/AllSchemes';
import Categories from './pages/Categories';
import Compare from './pages/Compare';
import Insights from './pages/Insights';
import HowToApply from './pages/HowToApply';
import About from './pages/About';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find" element={<EligibilityForm />} />
            <Route path="/schemes" element={<AllSchemes />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/apply" element={<HowToApply />} />
            <Route path="/about" element={<About />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/scheme/:id" element={<SchemeDetails />} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
