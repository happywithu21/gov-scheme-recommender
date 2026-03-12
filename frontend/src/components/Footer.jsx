export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} GovScheme Recommender. Initiated for Indian Citizens.</p>
      <p className="subtitle">Data natively sourced from data.gov.in</p>
    </footer>
  );
}
