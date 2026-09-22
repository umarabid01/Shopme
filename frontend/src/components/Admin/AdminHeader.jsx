import React from 'react'
import { useNavigate } from 'react-router-dom';
import { clearCurrentAdmin, getCurrentAdmin } from '../../utils/auth';

function AdminHeader() {
  const navigate = useNavigate();
  const admin = getCurrentAdmin();

  const handleLogout = () => {
    clearCurrentAdmin();
    navigate("/alogin", { replace: true });
  };
  return (
    <header className="admin-header">
      <div className="container-fluid admin-header-inner">
        <button className="admin-brand" onClick={() => navigate("/ahome")}>
          <span className="admin-brand-mark">s</span>
          <span>shopme</span>
        </button>
        <nav className="admin-nav" aria-label="Admin navigation">
          <button onClick={() => navigate("/ahome")}>Overview</button>
          <button onClick={() => navigate("/aallproduct")}>Products</button>
          <button onClick={() => navigate("/aorder")}>Orders</button>
          <button onClick={() => navigate("/auser")}>Customers</button>
          <button className="admin-nav-primary" onClick={() => navigate("/aproduct")}>+ Add product</button>
          <span className="admin-account">{admin?.email || "Admin"}</span>
          <button className="admin-logout" onClick={handleLogout}>Sign out</button>
        </nav>
      </div>
    </header>
  );
}

export default AdminHeader