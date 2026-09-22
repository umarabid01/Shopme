
import React from 'react'
import UserDirectory from '../../components/Admin/UserDirectory'
import AdminHeader from '../../components/Admin/AdminHeader'
import AdminFooter from '../../components/Admin/AdminFooter'

function AdminUsers() {
  return (
    <div className="admin-shell d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
        <AdminHeader/>
        <UserDirectory/>
            
        </main>
        <AdminFooter/>
    </div>
  )
}

export default AdminUsers