import React from 'react'
import ProductDirectory from '../../components/Admin/ProductDirectory'
import AdminHeader from '../../components/Admin/AdminHeader'
import AdminFooter from '../../components/Admin/AdminFooter'

function AdminProductDirectory() {
  return (
  <div className="admin-shell d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
        <AdminHeader/>
        <ProductDirectory/>
            
        </main>
        <AdminFooter/>
    </div>
  )
}

export default AdminProductDirectory