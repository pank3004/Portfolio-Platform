// Navbar Component
// Navigation bar that appears on all pages

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Portfolio Platform
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/study-materials">Study Materials</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/ai-updates">AI Updates</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/admin/login">Admin</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
