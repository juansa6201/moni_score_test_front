// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h2 className="navbar-brand">Moni Score</h2>
      <div className="container">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link to="/" className="nav-link">Scorear Cliente</Link>
            </li>
            <li className="nav-item">
              <Link to="/list" className="nav-link">Listar Scores</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;