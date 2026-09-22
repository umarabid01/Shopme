import React from 'react'
import SalesReport from '../../components/Admin/SalesReport'
import AdminHeader from '../../components/Admin/AdminHeader'
import AdminFooter from '../../components/Admin/AdminFooter'

function AdminSales() {
  return (
    <div className="admin-shell d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
        <AdminHeader/>
        <SalesReport/>
            
        </main>
        <AdminFooter/>
    </div>
  )
}

export default AdminSales