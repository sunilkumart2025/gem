// File: src/components/Sidebar.jsx
import React from 'react'
import { LayoutDashboard } from 'lucide-react'

const Sidebar = ({ role, activeMenu, setActiveMenu, roleToggle }) => {
  return (
    <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
      <div className="p-4 rounded-lg bg-indigo-100 mb-4">
        <h4 className="text-sm font-semibold text-indigo-700">User ID</h4>
        <p className="text-xs font-mono text-indigo-900 break-all">(visible when logged in)</p>
      </div>
      <div className="space-y-1">
        <button onClick={() => setActiveMenu('dashboard')} className={`flex items-center w-full px-4 py-3 rounded-lg ${activeMenu === 'dashboard' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </button>
        <div className="p-4">
          <label className="flex items-center cursor-pointer">
            <span className="mr-3 text-sm font-medium text-gray-700">Switch Role</span>
            <input type="checkbox" className="sr-only" onChange={roleToggle} />
            <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
          </label>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
