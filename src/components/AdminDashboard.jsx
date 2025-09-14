// File: src/components/AdminDashboard.jsx
import React from 'react'
import TenantTable from './TenantTable'

const AdminDashboard = ({ tenants, announcements, openModal, appId }) => {
  const totalIncome = tenants.reduce((sum, t) => sum + (t.payments ? t.payments.reduce((ps, p) => ps + (p.amount || 0), 0) : 0), 0)
  const pending = tenants.filter(t => !(t.payments && t.payments.length)).length

  const sendAnnouncement = async () => {
    const title = prompt('Enter title')
    const message = prompt('Enter message')
    if (title && message) {
      try {
        // addDoc requires import here; for clarity use a direct import if needed in this file in your real project
        alert('Announcement added (mock).')
      } catch (e) { console.error(e) }
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg"> <p>Total Tenants</p> <p className="text-3xl font-bold">{tenants.length}</p> </div>
        <div className="bg-white p-6 rounded-lg"> <p>Pending Payments</p> <p className="text-3xl font-bold text-red-500">{pending}</p> </div>
        <div className="bg-white p-6 rounded-lg"> <p>Monthly Income</p> <p className="text-3xl font-bold text-green-500">₹{totalIncome}</p> </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl">Tenant Management</h3>
            <button onClick={() => openModal('addTenant')} className="bg-indigo-600 text-white px-4 py-2 rounded">Add Tenant</button>
          </div>
          <TenantTable tenants={tenants} openModal={openModal} />
        </div>
        <div className="bg-white p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl">Announcements</h3>
            <button onClick={sendAnnouncement} className="bg-blue-600 text-white px-4 py-2 rounded">New</button>
          </div>
          <ul className="space-y-3">
            {announcements.map(a => (
              <li key={a.id} className="p-3 bg-gray-50 rounded"> <strong>{a.title}</strong> <div className="text-sm text-gray-600">{a.message}</div> </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
