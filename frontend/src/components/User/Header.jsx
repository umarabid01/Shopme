import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/auth";

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const user = getCurrentUser();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate("/", { state: { search } });
  };

  return (
    <header className="store-header">
      <div className="container py-3">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <button className="brand-mark me-lg-3" onClick={() => navigate("/")}>
            <span className="brand-dot" />
            Shopme
          </button>

          <form className="store-search flex-grow-1" onSubmit={handleSearch}>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              aria-label="Search products"
            />
            <button className="search-button" type="submit" aria-label="Search">Search</button>
          </form>

          <nav className="header-actions d-flex align-items-center gap-2 ms-lg-auto">
            <button className="nav-link-button" onClick={() => navigate(user ? "/order" : "/login")}>Orders</button>
            <button className="cart-button" onClick={() => navigate(user ? "/cart" : "/login")}>
              Cart <span className="cart-arrow">-&gt;</span>
            </button>
            <button className="nav-link-button" onClick={() => navigate("/login")}>{user ? user.first_name : "Sign in"}</button>
            <button className="profile-button" onClick={() => navigate(user ? "/profile" : "/login")} aria-label="Open profile">
              {user?.photo ? <img src={user.photo} alt="Profile" /> : (user?.first_name?.[0] || "P")}
            </button>
          </nav>
        </div>
      </div>
      </header>
  );
}

export default Header;
