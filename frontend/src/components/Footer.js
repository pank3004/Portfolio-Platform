// Footer Component
// Footer that appears on all pages

import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Portfolio Platform. All rights reserved.</p>
        <p>Built with MERN Stack</p>
      </div>
    </footer>
  );
}

export default Footer;
