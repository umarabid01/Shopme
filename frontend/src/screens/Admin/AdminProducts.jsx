import React from 'react'
import ProductManagement from '../../components/Admin/ProductManagement'
import AdminHeader from '../../components/Admin/AdminHeader'
import AdminFooter from '../../components/Admin/AdminFooter'

function AdminProducts() {
  return (
    <div className="admin-shell d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
        <AdminHeader/>
        <ProductManagement/>
            
        </main>
        <AdminFooter/>
    </div>
      
  )
}

export default AdminProducts