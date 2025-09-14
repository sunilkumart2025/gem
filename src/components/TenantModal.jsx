// File: src/components/TenantModal.jsx
import React, { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const TenantModal = ({ isOpen, type, tenant, onClose, appId }) => {
  const [form, setForm] = useState({ name: '', email: '', room: '', rent: '', electricityUsage: 0 })

  useEffect(() => {
    if (type === 'editTenant' && tenant) setForm({ name: tenant.name || '', email: tenant.email || '', room: tenant.room || '', rent: tenant.rent || '', electricityUsage: tenant.electricityUsage || 0 })
    else setForm({ name: '', email: '', room: '', rent: '', electricityUsage: 0 })
  }, [type, tenant])

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (type === 'addTenant') {
        await addDoc(collection(db, `artifacts/${appId}/public/data/tenants`), { ...form, payments: [], userId: '' })
      } else if (type === 'editTenant' && tenant) {
        const tenantRef = doc(db, `artifacts/${appId}/public/data/tenants`, tenant.id)
        await updateDoc(tenantRef, form)
      }
      onClose()
    } catch (e) { console.error(e) }
  }

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded shadow-lg p-6 z-10 w-full max-w-md">
        <h3 className="text-lg mb-4">{type === 'addTenant' ? 'Add Tenant' : 'Edit Tenant'}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border" />
          <input name="room" value={form.room} onChange={handleChange} placeholder="Room" className="w-full p-2 border" />
          <input name="rent" value={form.rent} onChange={handleChange} placeholder="Rent" type="number" className="w-full p-2 border" />
          <input name="electricityUsage" value={form.electricityUsage} onChange={handleChange} placeholder="Electricity Usage" type="number" className="w-full p-2 border" />
          <div className="flex gap-2 mt-3">
            <button className="flex-1 bg-indigo-600 text-white p-2 rounded">{type === 'addTenant' ? 'Add' : 'Save'}</button>
            <button type="button" onClick={onClose} className="flex-1 border p-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TenantModal
