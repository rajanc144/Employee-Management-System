import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-4">
      <div className="container text-center">
        <span className="text-muted">
          © {new Date().getFullYear()} Employee Management System. All rights reserved.
          <br />
          Designed by Enzo Leman
        </span>
      </div>
    </footer>
  );
};

export default FooterComponent;