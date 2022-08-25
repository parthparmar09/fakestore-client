import React from "react";

export default function Footer() {



  return (
        <footer className="footer mt-auto pt-3 px-5  d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top ">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <a href="/" className="nav-link px-2 text-muted">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link px-2 text-muted">
            Links
          </a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link px-2 text-muted">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link px-2 text-muted">
            FAQs
          </a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link px-2 text-muted">
            About
          </a>
        </li>
      </ul>
      <p className="text-center text-muted">© 2022 FakeStore, Inc</p>
    </footer>
  );
}
