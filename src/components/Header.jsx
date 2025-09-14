// File: src/components/Header.jsx
import React from 'react'
import { Building, LogOut } from 'lucide-react'

const Header = ({ role, user, onLogout, userId }) => {
  return (
    <header className="bg-white shadow-md z-10 sticky top-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Building className="w-8 h-8 text-indigo-500" />
          <span className="text-xl font-bold">Rental Management</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600 hidden sm:block">{role === 'admin' ? `Admin: ${user.email}` : `Tenant: ${userId}`}</div>
          <button onClick={onLogout} className="flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
