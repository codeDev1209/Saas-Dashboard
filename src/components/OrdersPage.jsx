import { useState } from 'react'
import { 
  Download, Plus, ShoppingBag, CheckCircle, Clock, XCircle,
  X, ShoppingCart
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useData } from '../context/DataContext'

export function OrdersPage({ darkMode }) {
  const { addToast } = useApp()
  const { orders, addOrder, updateOrder, deleteOrder } = useData()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    customer: '', email: '', product: '', amount: '', status: 'Pending', payment: 'Pending'
  })

  const handleOpenModal = () => {
    setFormData({ customer: '', email: '', product: '', amount: '', status: 'Pending', payment: 'Pending' })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({ customer: '', email: '', product: '', amount: '', status: 'Pending', payment: 'Pending' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addOrder({ ...formData, amount: parseFloat(formData.amount) })
    addToast('Order created successfully!', 'success')
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id)
      addToast('Order deleted', 'error')
    }
  }

  const orderStats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'blue' },
    { label: 'Completed', value: orders.filter(o => o.status === 'Completed').length, icon: CheckCircle, color: 'emerald' },
    { label: 'Processing', value: orders.filter(o => o.status === 'Processing').length, icon: Clock, color: 'amber' },
    { label: 'Cancelled', value: orders.filter(o => o.status === 'Cancelled').length, icon: XCircle, color: 'rose' },
  ]

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    rose: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">All Orders</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track and manage customer orders</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Download size={18} />
            Export
          </button>
          <button onClick={handleOpenModal} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all">
            <Plus size={18} />
            New Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-dark rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Order ID</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Product</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Payment</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.payment === 'Paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      order.payment === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
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
                <ShoppingCart className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Order</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enter order details</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer Name</label>
                <input type="text" required value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product</label>
                <input type="text" required value={formData.product} onChange={(e) => setFormData({...formData, product: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="Product name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <input type="number" step="0.01" required value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="0.00" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white">
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment</label>
                  <select value={formData.payment} onChange={(e) => setFormData({...formData, payment: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white">
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={handleCloseModal} className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">Create Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
