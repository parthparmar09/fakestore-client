import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  const { giveAlert , cartItems ,setCartItems } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    setCartItems([])
    navigate("/");
    giveAlert("warning", "logged out");
  };

  return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-lg-4 fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="fa-solid fa-store-slash px-2"></i>
            FakeStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
         <div className="collapse navbar-collapse text-center" id="navbar" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <Link
                  className={
                    "nav-link " + (location.pathname === "/" ? "active" : "")
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
          <Link className={"nav-link dropdown-toggle" + (location.pathname === "/category/:category" ? "active" : "")} to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/category/all">All</Link></li>

            <li><Link className="dropdown-item" to="/category/electronics">Electronics</Link></li>
            <li><Link className="dropdown-item" to="/category/jewelery">Jewelery</Link></li>
            <li><Link className="dropdown-item" to="/category/men's clothing">Men's wear</Link></li>
            <li><Link className="dropdown-item" to="/category/women's clothing">Women's wear</Link></li>
          </ul></li>
        
              <li className="nav-item">
                <Link
                  className={
                    "nav-link " +
                    (location.pathname === "/orders" ? "active" : "")
                  }
                  aria-current="page"
                  to="/orders"
                >
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "nav-link " +
                    (location.pathname === "/contact" ? "active" : "")
                  }
                  aria-current="page"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="input-group" id="search-group">
              <input
                className="form-control border-end-0 border rounded-pill"
                type="text"
                id="example-search-input"
                placeholder="search"
              />
              <span className="input-group-append mx-2">
                <button className="btn btn-light rounded-pill ms-n3" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
            <Link type="button" to='/mycart' className="btn btn-outline-secondary mx-2 position-relative">
            <i className="fa-brands fa-opencart text-light" ></i>
              
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" id="cart-badge">
                {cartItems.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>

            {localStorage.getItem("token") ? (
              <Link
                className="btn mx-2 my-2 btn-secondary"
                onClick={logout}
                to="/"
              >
                Log out
              </Link>
            ) : (
              <Link className="btn mx-2 my-2 btn-secondary" to="/login">
                Log in
              </Link>
            )}
          </div> 
        </div>
      </nav>
  );
}

export default Navbar;
