import React from 'react';
import { useNavigate } from 'react-router-dom';


function AdminDashboardOverview() {
  const navigate=useNavigate()
  return (
    <main className="admin-content container-fluid">
      <div className="admin-page-heading">
        <div><p className="admin-kicker">MONDAY, JUNE 02, 2025</p><h1>Good morning, admin.</h1><p>Here is what is happening across your store today.</p></div>
        <button className="admin-outline-button" onClick={() => navigate("/")}>View storefront</button>
      </div>
      <div className="admin-stats-grid">
        <div className="admin-stat"><span>Total revenue</span><strong>Rs.24,850</strong><small className="stat-positive">+12.5% this month</small></div>
        <div className="admin-stat"><span>Orders today</span><strong>38</strong><small className="stat-positive">+8 from yesterday</small></div>
        <div className="admin-stat"><span>Active customers</span><strong>1,284</strong><small>Across all channels</small></div>
        <div className="admin-stat"><span>Low stock items</span><strong>07</strong><small className="stat-warning">Needs attention</small></div>
      </div>
      <div className="admin-dashboard-grid">
        <section className="admin-panel admin-quick-panel">
          <div className="admin-panel-heading"><div><p className="admin-kicker">WORKSPACE</p><h2>Quick actions</h2></div></div>
          <button onClick={() => navigate("/aproduct")}><span className="action-icon">+</span><span><strong>Add product</strong><small>Create a new listing</small></span><b>-&gt;</b></button>
          <button onClick={() => navigate("/aallproduct")}><span className="action-icon">#</span><span><strong>Manage inventory</strong><small>Review all products</small></span><b>-&gt;</b></button>
          <button onClick={() => navigate("/asales")}><span className="action-icon">%</span><span><strong>View analytics</strong><small>Track store performance</small></span><b>-&gt;</b></button>
        </section>
        <section className="admin-panel">
          <div className="admin-panel-heading"><div><p className="admin-kicker">RECENT ACTIVITY</p><h2>Latest orders</h2></div><button onClick={() => navigate("/aorder")}>View all -&gt;</button></div>
          <div className="admin-order-row"><span className="order-avatar">AM</span><span><strong>#2097 · Amina Malik</strong><small>2 items · Cash on delivery</small></span><b>Rs.5,400</b></div>
          <div className="admin-order-row"><span className="order-avatar orange">WK</span><span><strong>#2096 · Waleed Khan</strong><small>1 item · Card payment</small></span><b>Rs.2,100</b></div>
          <div className="admin-order-row"><span className="order-avatar green">SA</span><span><strong>#2095 · Sana Ahmed</strong><small>3 items · Cash on delivery</small></span><b>Rs.8,250</b></div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboardOverview;