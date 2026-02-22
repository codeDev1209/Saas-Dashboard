import { useState } from 'react'
import { Search, Plus, MoreVertical, X, User } from 'lucide-react'
import { useData } from '../context/DataContext'

export function UsersPage({ darkMode, searchQuery, onSearchChange }) {
  const { users, addUser, updateUser, deleteUser } = useData()
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Viewer', status: 'Active' })

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({ ...user })
    } else {
      setEditingUser(null)
      setFormData({ name: '', email: '', role: 'Viewer', status: 'Active' })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingUser(null)
    setFormData({ name: '', email: '', role: 'Viewer', status: 'Active' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingUser) {
      updateUser(editingUser.id, formData)
    } else {
      addUser(formData)
    }
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">All Users</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your team members and permissions</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-xl">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent border-none outline-none text-sm dark:text-white w-40"
            />
          </div>
          <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all">
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">User</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Role</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Orders</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Total Spent</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Last Active</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: user.avatar }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      user.role === 'Admin' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                      user.role === 'Editor' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      user.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        user.status === 'Active' ? 'bg-emerald-500' : user.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{user.spent}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.lastActive}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenModal(user)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark rounded-2xl w-full max-w-md p-6 relative animate-[fadeIn_0.2s_ease]">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X size={20} className="text-gray-500" />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {editingUser ? 'Update user details' : 'Add a new team member'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="john@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white">
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={handleCloseModal} className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
                  {editingUser ? 'Update' : 'Add'} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
