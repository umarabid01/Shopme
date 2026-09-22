import React from 'react'
import AdminHeader from '../../components/Admin/AdminHeader'
import AdminFooter from '../../components/Admin/AdminFooter'
import AdminDashboardOverview from '../../components/Admin/AdminDashboardOverview'

function AdminDashboard() {
  return (
    <div className="admin-shell d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <AdminHeader/>
        <AdminDashboardOverview/>
      
        
        </main>
        <AdminFooter/>
    </div>
  )
}

export default AdminDashboard