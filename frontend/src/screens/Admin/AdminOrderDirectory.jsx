import React from 'react'
import OrderDirectory from '../../components/Admin/OrderDirectory'
import AdminHeader from '../../components/Admin/AdminHeader'
import AdminFooter from '../../components/Admin/AdminFooter'

function AdminOrderDirectory() {
  return (
    <div className="admin-shell d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
        <AdminHeader/>
        <OrderDirectory/>
            
        </main>
        <AdminFooter/>
    </div>
  )
}

export default AdminOrderDirectory