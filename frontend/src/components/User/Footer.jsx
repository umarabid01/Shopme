import React from "react";

function Footer() {
  return (
    <footer className="store-footer mt-auto">
      <div className="container py-4 d-flex flex-wrap justify-content-between gap-3">
        <div>
          <strong className="footer-brand">shopme</strong>
          <p className="mb-0 mt-2">Everyday goods, thoughtfully picked.</p>
        </div>
        <div className="footer-links d-flex gap-4 align-items-center">
          <span>FAQs</span>
          <span>Contact us</span>
          <span>Lahore, PK</span>
        </div>
        <small className="w-100">© 2026 shopme. Built for better browsing.</small>
      </div>
    </footer>
  );
}

export default Footer;
