import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <Link to="/">🏛️ GovScheme Recommender</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/eligibility" className="btn btn-primary btn-sm">Check Eligibility</Link>
      </nav>
    </header>
  );
}
