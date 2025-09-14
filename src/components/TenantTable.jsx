// File: src/components/TenantTable.jsx
import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

const TenantTable = ({ tenants, openModal }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Room</th>
            <th className="px-4 py-3 text-left">Rent</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tenants.map(t => (
            <tr key={t.id}>
              <td className="px-4 py-4">{t.name}</td>
              <td className="px-4 py-4">{t.room}</td>
              <td className="px-4 py-4">₹{t.rent}</td>
              <td className="px-4 py-4">{t.payments && t.payments.length ? 'Paid' : 'Pending'}</td>
              <td className="px-4 py-4 text-right">
                <button onClick={() => openModal('editTenant', t)} className="mr-2"><Edit className="w-4 h-4" /></button>
                <button onClick={() => { if (confirm('Delete?')) { /* call delete */ } }}><Trash2 className="w-4 h-4" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TenantTable
