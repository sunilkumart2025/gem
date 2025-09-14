
// File: src/App.jsx
import React, { useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithCustomToken, signInAnonymously } from 'firebase/auth'
import { collection, onSnapshot, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { auth, db, getPublicCollectionPath } from './firebase'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AdminDashboard from './components/AdminDashboard'
import TenantDashboard from './components/TenantDashboard'
import TenantModal from './components/TenantModal'

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null

const App = () => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('tenant')
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [tenants, setTenants] = useState([])
  const [userId, setUserId] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('addTenant')
  const [currentTenant, setCurrentTenant] = useState(null)
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setUserId(currentUser.uid)
        try {
          const usersCollectionRef = collection(db, getPublicCollectionPath(appId, 'users'))
          const q = query(usersCollectionRef, where('email', '==', currentUser.email))
          const querySnapshot = await getDocs(q)
          if (!querySnapshot.empty) {
            setRole(querySnapshot.docs[0].data().role || 'tenant')
          } else {
            setRole('tenant')
          }
        } catch (e) {
          console.error('Error fetching role', e)
          setRole('tenant')
        }
      } else {
        setUser(null)
        setUserId(null)
      }
      setAuthReady(true)
    })

    const initAuth = async () => {
      if (initialAuthToken) {
        try { await signInWithCustomToken(auth, initialAuthToken) } catch (e) { await signInAnonymously(auth) }
      } else {
        await signInAnonymously(auth)
      }
    }
    initAuth()

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!authReady || !user) return
    const tenantsCollectionRef = collection(db, getPublicCollectionPath(appId, 'tenants'))
    const announcementsCollectionRef = collection(db, getPublicCollectionPath(appId, 'announcements'))

    const unsubscribeTenants = onSnapshot(tenantsCollectionRef, (snapshot) => {
      setTenants(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    const unsubscribeAnnouncements = onSnapshot(announcementsCollectionRef, (snapshot) => {
      setAnnouncements(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    })

    return () => {
      unsubscribeTenants(); unsubscribeAnnouncements();
    }
  }, [authReady, user])

  // modal helpers used by child components
  const openModal = (type, tenant = null) => {
    setModalType(type)
    setCurrentTenant(tenant)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentTenant(null)
  }

  const handleLogout = async () => {
    await signOut(auth)
    setActiveMenu('dashboard')
  }

  if (!authReady) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  if (!user || (user.isAnonymous && user.providerData.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const email = e.target.email.value; const password = e.target.password.value;
            try { await signInWithEmailAndPassword(auth, email, password) } catch (err) { alert('Invalid credentials') }
          }}>
            <input name="email" type="email" placeholder="email" className="w-full p-2 border mb-2" />
            <input name="password" type="password" placeholder="password" className="w-full p-2 border mb-4" />
            <button className="w-full bg-indigo-600 text-white p-2 rounded">Sign In</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header role={role} user={user} onLogout={handleLogout} userId={userId} />
      <div className="flex flex-1">
        <Sidebar role={role} activeMenu={activeMenu} setActiveMenu={setActiveMenu} roleToggle={() => setRole(role === 'admin' ? 'tenant' : 'admin')} />
        <main className="flex-1 p-6 overflow-y-auto">
          {role === 'admin' ? (
            <AdminDashboard tenants={tenants} announcements={announcements} openModal={openModal} appId={appId} />
          ) : (
            <TenantDashboard tenants={tenants} openModal={openModal} />
          )}
        </main>
      </div>

      <TenantModal isOpen={isModalOpen} type={modalType} tenant={currentTenant} onClose={closeModal} appId={appId} />
    </div>
  )
}

export default App
