// File: src/components/TenantDashboard.jsx
import React from 'react'

const TenantDashboard = ({ tenants, openModal }) => {
  const userEmail = typeof window !== 'undefined' && window.__user_email ? window.__user_email : null
  const tenant = tenants.find(t => t.email === userEmail) || tenants[0]
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold">Tenant Dashboard</h2>
      {tenant ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded"> <h3>Your Details</h3> <p>Name: {tenant.name}</p> <p>Room: {tenant.room}</p></div>
          <div className="bg-white p-6 rounded"> <h3>Current Bill</h3> <p>Rent: ₹{tenant.rent}</p> <p>Electricity: {tenant.electricityUsage}</p> <button className="mt-3 bg-green-600 text-white px-3 py-2 rounded">Pay Now</button></div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded mt-6">No tenant data available. Contact admin.</div>
      )}
    </div>
  )
}

export default TenantDashboard
