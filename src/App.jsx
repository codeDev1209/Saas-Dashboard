import { useState, useEffect, createContext, useContext, useRef } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Line, Doughnut } from 'react-chartjs-2'
import './i18n'
import './utils/chartSetup'
import { useLocalStorage, useOnClickOutside, useWindowSize } from './hooks'
import { ErrorBoundary } from './components/ErrorBoundary'
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings, Zap, Award, LogOut,
  BarChart3, Menu, Search, Bell, Moon, Sun, ChevronDown, ChevronLeft, ChevronRight,
  Eye, Edit, Trash2, X, Plus, Filter, Download, MoreVertical, Mail, Lock, EyeOff,
  CheckCircle, AlertCircle, Info, XCircle, ShoppingBag, Clock, Activity, FileText,
  TrendingUp, TrendingDown, User, CreditCard, Globe, RefreshCw, DollarSign, Target
} from 'lucide-react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)
  const [toasts, setToasts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }

  const handleLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'bugbie@demo.com' && password === 'password') {
          setIsLoggedIn(true)
          addToast('Welcome back! You have logged in successfully.', 'success')
          resolve(true)
        } else {
          addToast('Invalid email or password', 'error')
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    addToast('You have been logged out.', 'info')
  }

  return (
    <AppContext.Provider value={{
      isLoggedIn, setIsLoggedIn, darkMode, setDarkMode, toasts, addToast,
      handleLogin, handleLogout, isLoading, language, setLanguage
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)

const DataContext = createContext()

export function DataProvider({ children }) {
  const [products, setProducts] = useLocalStorage('products', [
    { id: 1, name: 'Premium Wireless Headphones', sku: 'WH-001', category: 'Electronics', price: 299.99, stock: 145, status: 'Active', sales: 1234, image: '#4f46e5' },
    { id: 2, name: 'Smart Watch Pro', sku: 'SW-002', category: 'Electronics', price: 449.99, stock: 89, status: 'Active', sales: 987, image: '#10b981' },
    { id: 3, name: 'Organic Coffee Beans', sku: 'OC-003', category: 'Food & Beverage', price: 24.99, stock: 523, status: 'Active', sales: 2456, image: '#f59e0b' },
    { id: 4, name: 'Ergonomic Office Chair', sku: 'EC-004', category: 'Furniture', price: 399.99, stock: 34, status: 'Low Stock', sales: 456, image: '#ef4444' },
    { id: 5, name: 'Bluetooth Speaker', sku: 'BS-005', category: 'Electronics', price: 79.99, stock: 0, status: 'Out of Stock', sales: 789, image: '#8b5cf6' },
    { id: 6, name: 'Yoga Mat Premium', sku: 'YM-006', category: 'Sports', price: 49.99, stock: 267, status: 'Active', sales: 1567, image: '#06b6d4' },
    { id: 7, name: 'Stainless Steel Bottle', sku: 'SB-007', category: 'Kitchen', price: 29.99, stock: 412, status: 'Active', sales: 892, image: '#84cc16' },
    { id: 8, name: 'LED Desk Lamp', sku: 'DL-008', category: 'Electronics', price: 59.99, stock: 178, status: 'Active', sales: 634, image: '#f97316' },
  ])

  const [orders, setOrders] = useLocalStorage('orders', [
    { id: 'ORD-001', customer: 'John Smith', email: 'john@example.com', product: 'Premium Wireless Headphones', amount: 299.99, status: 'Completed', date: '2024-01-15', payment: 'Paid' },
    { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@example.com', product: 'Smart Watch Pro', amount: 449.99, status: 'Processing', date: '2024-01-15', payment: 'Paid' },
    { id: 'ORD-003', customer: 'Mike Williams', email: 'mike@example.com', product: 'Organic Coffee Beans', amount: 24.99, status: 'Pending', date: '2024-01-14', payment: 'Pending' },
    { id: 'ORD-004', customer: 'Emily Brown', email: 'emily@example.com', product: 'Ergonomic Office Chair', amount: 399.99, status: 'Completed', date: '2024-01-14', payment: 'Paid' },
    { id: 'ORD-005', customer: 'David Lee', email: 'david@example.com', product: 'Bluetooth Speaker', amount: 79.99, status: 'Cancelled', date: '2024-01-13', payment: 'Refunded' },
    { id: 'ORD-006', customer: 'Lisa Chen', email: 'lisa@example.com', product: 'Yoga Mat Premium', amount: 49.99, status: 'Completed', date: '2024-01-13', payment: 'Paid' },
  ])

  const [users, setUsers] = useLocalStorage('users', [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2 min ago', avatar: '#4f46e5', orders: 45, spent: '$2,340' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Editor', status: 'Active', lastActive: '15 min ago', avatar: '#10b981', orders: 32, spent: '$1,890' },
    { id: 3, name: 'Mike Williams', email: 'mike@example.com', role: 'Viewer', status: 'Inactive', lastActive: '2 days ago', avatar: '#f59e0b', orders: 12, spent: '$456' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Editor', status: 'Active', lastActive: '1 hour ago', avatar: '#ef4444', orders: 67, spent: '$3,120' },
    { id: 5, name: 'David Lee', email: 'david@example.com', role: 'Viewer', status: 'Pending', lastActive: '3 days ago', avatar: '#8b5cf6', orders: 8, spent: '$234' },
    { id: 6, name: 'Lisa Chen', email: 'lisa@example.com', role: 'Admin', status: 'Active', lastActive: '5 min ago', avatar: '#06b6d4', orders: 89, spent: '$4,560' },
  ])

  const addProduct = (product) => setProducts(prev => [...prev, { ...product, id: Date.now(), sales: 0 }])
  const updateProduct = (id, updates) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id))
  const addOrder = (order) => setOrders(prev => [{ ...order, id: `ORD-${String(prev.length + 1).padStart(3, '0')}`, date: new Date().toISOString().split('T')[0] }, ...prev])
  const updateOrder = (id, updates) => setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o))
  const deleteOrder = (id) => setOrders(prev => prev.filter(o => o.id !== id))
  const addUser = (user) => setUsers(prev => [...prev, { ...user, id: Date.now(), orders: 0, spent: '$0', lastActive: 'Just now' }])
  const updateUser = (id, updates) => setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u))
  const deleteUser = (id) => setUsers(prev => prev.filter(u => u.id !== id))

  return (
    <DataContext.Provider value={{ products, orders, users, addProduct, updateProduct, deleteProduct, addOrder, updateOrder, deleteOrder, addUser, updateUser, deleteUser }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)

function ToastContainer() {
  const { toasts } = useApp()

  if (toasts.length === 0) return null

  const getIcon = (type) => {
    switch(type) {
      case 'success': return CheckCircle
      case 'error': return XCircle
      case 'warning': return AlertCircle
      default: return Info
    }
  }

  const getColor = (type) => {
    switch(type) {
      case 'success': return '#10b981'
      case 'error': return '#ef4444'
      case 'warning': return '#f59e0b'
      default: return '#3b82f6'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-dark rounded-lg shadow-lg"
          >
            {toast.type && (() => { const Icon = getIcon(toast.type); return <Icon size={20} style={{ color: getColor(toast.type) }} /> })()}
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function LoginPage() {
  const { handleLogin, darkMode } = useApp()
  const [email, setEmail] = useState('bugbie@demo.com')
  const [password, setPassword] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email'
    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try { await handleLogin(email, password) }
    finally { setIsSubmitting(false) }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-dark-darker dark:via-dark dark:to-gray-900 p-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-white/10 dark:bg-dark/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 sm:p-12 border border-white/20"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-t-3xl"></div>
        
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/30"
          >
            <Zap className="text-white" size={32} />
          </motion.div>
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="text-gray-300 mt-2">Enter your credentials to access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 bg-white/10 dark:bg-dark/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white ${errors.email ? 'border-red-500' : 'border-white/20'}`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-12 py-3.5 bg-white/10 dark:bg-dark/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white ${errors.password ? 'border-red-500' : 'border-white/20'}`}
                placeholder="Enter your password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? <RefreshCw className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 p-3 bg-white/5 rounded-lg">
          <p className="text-xs text-gray-400 text-center">Demo: bugbie@demo.com / password</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Sidebar({ isOpen, onToggle }) {
  const { handleLogout, darkMode, setLanguage, language } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { id: '/', label: 'nav.overview', icon: LayoutDashboard },
    { id: '/analytics', label: 'nav.analytics', icon: BarChart3 },
    { id: '/products', label: 'nav.products', icon: Package },
    { id: '/orders', label: 'nav.orders', icon: ShoppingCart },
    { id: '/users', label: 'nav.users', icon: Users },
    { id: '/settings', label: 'nav.settings', icon: Settings },
  ]

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -256 }}
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-dark border-r border-gray-200 dark:border-gray-700 flex flex-col z-50 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'} lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="text-white" size={22} />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dashboard</span>
              <p className="text-xs text-gray-500">v2.0</p>
            </div>
          </div>
          <button onClick={onToggle} className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.id}
              to={item.id}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 font-medium ${
                isActive ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} className="text-gray-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm text-gray-600 dark:text-gray-400 border-none outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-purple-600" size={18} />
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Pro Plan</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Your team has 5 days left in trial</p>
            <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold rounded-lg">Upgrade Now</button>
          </div>
          
          <div className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">BU</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Bugbie</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-gray-400 hover:text-red-500">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

function Header({ onMenuToggle }) {
  const { darkMode, setDarkMode, toasts } = useApp()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const notifRef = useRef(null)
  const profileRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const titles = {
    '/': 'nav.overview',
    '/analytics': 'nav.analytics',
    '/products': 'nav.products',
    '/orders': 'nav.orders',
    '/users': 'nav.users',
    '/settings': 'nav.settings',
  }

  const notifications = [
    { id: 1, title: 'New order received', desc: 'Order #ORD-001 has been placed', time: '2 min ago', icon: ShoppingCart, color: 'green' },
    { id: 2, title: 'User registered', desc: 'Sarah Johnson joined as a new member', time: '15 min ago', icon: User, color: 'blue' },
    { id: 3, title: 'Payment failed', desc: 'Payment for order #ORD-005 failed', time: '1 hour ago', icon: CreditCard, color: 'red' },
  ]

  useOnClickOutside(notifRef, () => setShowNotifications(false))
  useOnClickOutside(profileRef, () => setShowProfileMenu(false))

  return (
    <header className="h-16 bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
          <Menu size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">{titles[location.pathname]}</h2>
          <p className="text-xs text-gray-500 hidden sm:block">header.welcome</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="common.search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-sm w-40 dark:text-white" />
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
          {darkMode ? <Sun size={20} className="text-gray-600" /> : <Moon size={20} className="text-gray-600" />}
        </button>
        
        <div className="relative" ref={notifRef}>
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl relative">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {showNotifications && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-dark rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-700">
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notif.color === 'green' ? 'bg-green-100 text-green-600' : notif.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                      }`}>
                        <notif.icon size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{notif.title}</p>
                        <p className="text-xs text-gray-500">{notif.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">BU</div>
            <ChevronDown size={16} className="text-gray-400 hidden lg:block" />
          </button>

          {showProfileMenu && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-dark rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white">Bugbie</p>
                <p className="text-sm text-gray-500">bugbie@demo.com</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <User size={18} /><span className="text-sm">Profile</span>
                </button>
                <button onClick={() => navigate('/settings')} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <Settings size={18} /><span className="text-sm">Settings</span>
                </button>
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                  <LogOut size={18} /><span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}

function OverviewPage() {
  const { darkMode, addToast } = useApp()
  const [animated, setAnimated] = useState(false)

  useEffect(() => { setTimeout(() => setAnimated(true), 300) }, [])

  const stats = [
    { label: 'stats.totalRevenue', value: '$284,520', trend: '+12.5%', up: true, icon: DollarSign, color: 'indigo' },
    { label: 'stats.totalOrders', value: '12,847', trend: '+8.2%', up: true, icon: ShoppingCart, color: 'emerald' },
    { label: 'stats.activeUsers', value: '45,892', trend: '+5.7%', up: true, icon: Users, color: 'amber' },
    { label: 'stats.conversionRate', value: '3.24%', trend: '-2.4%', up: false, icon: Target, color: 'rose' },
  ]

  const colorClasses = {
    indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400' },
    rose: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-600 dark:text-rose-400' },
  }

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{ label: 'Revenue', data: [45000, 52000, 48000, 61000, 55000, 67000, 72000, 78000, 85000, 92000, 88000, 96000], borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.1)', fill: true, tension: 0.4 }]
  }

  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Sports'],
    datasets: [{ data: [35, 25, 20, 12, 8], backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'], borderWidth: 0 }]
  }

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' },
    plugins: { legend: { display: false }, tooltip: { backgroundColor: darkMode ? '#1e293b' : '#fff', titleColor: darkMode ? '#fff' : '#1e293b', bodyColor: darkMode ? '#cbd5e1' : '#64748b', borderColor: darkMode ? '#334155' : '#e2e8f0', borderWidth: 1, padding: 12 } },
    scales: { x: { grid: { display: false }, ticks: { color: darkMode ? '#94a3b8' : '#94a3b8' } }, y: { grid: { borderDash: [5, 5], color: darkMode ? '#334155' : '#e2e8f0' }, ticks: { color: darkMode ? '#94a3b8' : '#94a3b8', callback: v => '$' + (v / 1000) + 'k' } } }
  }

  const doughnutOptions = {
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' },
    plugins: { legend: { position: 'right', labels: { usePointStyle: true, pointStyle: 'circle', color: darkMode ? '#cbd5e1' : '#64748b', padding: 16 } } }, cutout: '70%',
  }

  const recentTransactions = [
    { id: 1, type: 'income', description: 'Product Sales', amount: 1250.00, date: '2 min ago', icon: DollarSign },
    { id: 2, type: 'expense', description: 'Server Maintenance', amount: -250.00, date: '1 hour ago', icon: Activity },
    { id: 3, type: 'income', description: 'Subscription', amount: 99.00, date: '3 hours ago', icon: DollarSign },
    { id: 4, type: 'expense', description: 'Marketing Ads', amount: -500.00, date: '5 hours ago', icon: TrendingUp },
    { id: 5, type: 'income', description: 'Product Sales', amount: 890.00, date: '1 day ago', icon: DollarSign },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[stat.color].bg}`}>
                <stat.icon size={24} className={colorClasses[stat.color].text} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${stat.up ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                {stat.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="lg:col-span-2 bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">dashboard.revenueOverview</h3>
          <div className="h-72"><Line data={revenueData} options={chartOptions} /></div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">dashboard.salesByCategory</h3>
          <div className="h-56"><Doughnut data={categoryData} options={doughnutOptions} /></div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">dashboard.recentTransactions</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentTransactions.map((tx, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                      <tx.icon size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{tx.description}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {tx.type === 'income' ? '+' : ''}{tx.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative">
            <div className="flex justify-between items-start mb-8">
              <div><p className="text-indigo-200 text-sm">dashboard.currentPlan</p><h3 className="text-2xl font-bold mt-1">dashboard.proAnalytics</h3></div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Zap size={24} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4"><p className="text-indigo-200 text-xs">dashboard.teamMembers</p><p className="text-2xl font-bold mt-1">8/10</p></div>
              <div className="bg-white/10 rounded-xl p-4"><p className="text-indigo-200 text-xs">dashboard.apiCalls</p><p className="text-2xl font-bold mt-1">78%</p></div>
            </div>
            <button className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg" onClick={() => addToast('Upgraded to Pro Plan!', 'success')}>
              dashboard.upgradePlan
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function ProductsPage() {
  const { addToast } = useApp()
  const { products, addProduct, updateProduct, deleteProduct } = useData()
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({ name: '', sku: '', category: '', price: '', stock: '', status: 'Active' })
  const itemsPerPage = 5
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleOpenModal = (product = null) => {
    if (product) { setEditingProduct(product); setFormData({ ...product, price: product.price.toString(), stock: product.stock.toString() }) }
    else { setEditingProduct(null); setFormData({ name: '', sku: '', category: '', price: '', stock: '', status: 'Active' }) }
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
    editingProduct ? (updateProduct(editingProduct.id, data), addToast('Product updated!', 'success')) : (addProduct(data), addToast('Product added!', 'success'))
    setShowModal(false)
  }

  const handleDelete = (id) => { if (confirm('Are you sure?')) { deleteProduct(id); addToast('Product deleted', 'error') } }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h3 className="text-xl font-semibold text-gray-900 dark:text-white">products.allProducts</h3><p className="text-sm text-gray-500">products.manageInventory</p></div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl"><Filter size={18} />common.filter</button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl"><Download size={18} />common.export</button>
          <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl"><Plus size={18} />products.addProduct</button>
        </div>
      </div>

      <div className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">products.productName</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">products.sku</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">products.category</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">products.price</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">products.stock</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">products.status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">products.sales</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">products.actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: product.image }}>{product.name.split(' ').slice(0, 2).map(w => w[0]).join('')}</div><span className="font-medium text-gray-900 dark:text-white">{product.name}</span></div></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${product.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : product.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>{product.status}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.sales.toLocaleString()}</td>
                  <td className="px-6 py-4"><div className="flex items-center gap-2"><button onClick={() => handleOpenModal(product)} className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg text-gray-400 hover:text-amber-600"><Eye size={16} /></button><button onClick={() => handleOpenModal(product)} className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg text-gray-400 hover:text-amber-600"><Edit size={16} /></button><button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-gray-400 hover:text-red-600"><Trash2 size={16} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing {Math.min((currentPage - 1) * itemsPerPage + 1, products.length)} to {Math.min(currentPage * itemsPerPage, products.length)} of {products.length}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"><ChevronLeft size={18} /></button>
            {[...Array(totalPages)].map((_, i) => (<button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-lg ${currentPage === i + 1 ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{i + 1}</button>))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white dark:bg-dark rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4"><X size={20} className="text-gray-500" /></button>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">products.productName</label><input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">products.sku</label><input type="text" required value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" /></div>
                <div><label className="block text-sm font-medium mb-1">products.category</label><input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">products.price</label><input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" /></div>
                <div><label className="block text-sm font-medium mb-1">products.stock</label><input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" /></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">common.cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl">common.save</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

function OrdersPage() {
  const { addToast } = useApp()
  const { orders, addOrder, deleteOrder } = useData()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ customer: '', email: '', product: '', amount: '', status: 'Pending', payment: 'Pending' })

  const handleSubmit = (e) => {
    e.preventDefault()
    addOrder({ ...formData, amount: parseFloat(formData.amount) })
    addToast('Order created!', 'success')
    setShowModal(false)
  }

  const orderStats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'blue' },
    { label: 'Completed', value: orders.filter(o => o.status === 'Completed').length, icon: CheckCircle, color: 'emerald' },
    { label: 'Processing', value: orders.filter(o => o.status === 'Processing').length, icon: Clock, color: 'amber' },
    { label: 'Cancelled', value: orders.filter(o => o.status === 'Cancelled').length, icon: XCircle, color: 'rose' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h3 className="text-xl font-semibold text-gray-900 dark:text-white">orders.allOrders</h3><p className="text-sm text-gray-500">orders.trackOrders</p></div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl"><Plus size={18} />orders.newOrder</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-dark rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' : stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : stat.color === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}><stat.icon size={24} /></div>
            <div><p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p><p className="text-sm text-gray-500">{stat.label}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">orders.orderId</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">orders.customer</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">orders.product</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">orders.amount</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">orders.status</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">orders.payment</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">orders.date</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-indigo-600">{order.id}</td>
                  <td className="px-6 py-4"><p className="font-medium text-gray-900 dark:text-white">{order.customer}</p><p className="text-sm text-gray-500">{order.email}</p></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.product}</td>
                  <td className="px-6 py-4 font-medium">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>{order.status}</span></td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${order.payment === 'Paid' ? 'bg-emerald-100 text-emerald-700' : order.payment === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>{order.payment}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white dark:bg-dark rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-4">Create New Order</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required placeholder="Customer Name" value={formData.customer} onChange={e => setFormData({...formData, customer: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" />
              <input type="email" required placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" />
              <input type="text" required placeholder="Product" value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" />
              <input type="number" step="0.01" required placeholder="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl">Create</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

function UsersPage() {
  const { users, addUser, deleteUser } = useData()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Viewer', status: 'Active' })

  const handleSubmit = (e) => {
    e.preventDefault()
    addUser(formData)
    setShowModal(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h3 className="text-xl font-semibold text-gray-900 dark:text-white">users.allUsers</h3><p className="text-sm text-gray-500">users.teamMembers</p></div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl"><Plus size={18} />users.addUser</button>
      </div>

      <div className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">User</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">users.role</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Orders</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">users.totalSpent</th><th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">users.lastActive</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: user.avatar }}>{user.name.split(' ').map(n => n[0]).join('')}</div><div><p className="font-medium text-gray-900 dark:text-white">{user.name}</p><p className="text-sm text-gray-500">{user.email}</p></div></div></td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-lg text-xs font-medium ${user.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' : user.role === 'Editor' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>{user.role}</span></td>
                  <td className="px-6 py-4"><span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : user.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}><span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : user.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'}`}></span>{user.status}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.orders}</td>
                  <td className="px-6 py-4 font-medium">{user.spent}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white dark:bg-dark rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-4">Add New User</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" />
              <input type="email" required placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" />
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800">
                <option value="Admin">Admin</option><option value="Editor">Editor</option><option value="Viewer">Viewer</option>
              </select>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl">Add</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

function SettingsPage() {
  const { addToast } = useApp()
  const [activeSection, setActiveSection] = useState('general')
  const [toggles, setToggles] = useState({ twoFactor: true, loginNotifications: true, sessionTimeout: false, emailNotifications: true, pushNotifications: true, weeklyReports: false })

  const sections = [
    { id: 'general', label: 'settings.general', icon: Settings },
    { id: 'security', label: 'settings.security', icon: Lock },
    { id: 'notifications', label: 'settings.notifications', icon: Bell },
    { id: 'billing', label: 'settings.billing', icon: CreditCard },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 p-4 h-fit">
        {sections.map(section => (
          <div key={section.id} onClick={() => setActiveSection(section.id)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer font-medium ${activeSection === section.id ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <section.icon size={18} />{section.label}
          </div>
        ))}
      </div>

      <div className="lg:col-span-3 bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700">
        {activeSection === 'general' && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">settings.general</h3>
            <p className="text-sm text-gray-500 mb-6">settings.manageAccount</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-2">settings.fullName</label><input type="text" defaultValue="Bugbie" className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" /></div>
              <div><label className="block text-sm font-medium mb-2">settings.email</label><input type="email" defaultValue="bugbie@demo.com" className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800" /></div>
            </div>
            <button onClick={() => addToast('Settings saved!', 'success')} className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl mt-6">settings.saveChanges</button>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">settings.security</h3>
            <p className="text-sm text-gray-500 mb-6">settings.securityPrefs</p>
            <div className="space-y-4">
              {[{ key: 'twoFactor', label: 'settings.twoFactor', desc: 'settings.twoFactorDesc' }, { key: 'loginNotifications', label: 'settings.loginNotif', desc: 'settings.loginNotifDesc' }, { key: 'sessionTimeout', label: 'settings.sessionTimeout', desc: 'settings.sessionTimeoutDesc' }].map(item => (
                <div key={item.key} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <div><p className="font-medium text-gray-900 dark:text-white">{item.label}</p><p className="text-sm text-gray-500">{item.desc}</p></div>
                  <button onClick={() => setToggles({ ...toggles, [item.key]: !toggles[item.key] })} className={`w-12 h-6.5 rounded-full relative transition-all ${toggles[item.key] ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}><div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${toggles[item.key] ? 'left-6' : 'left-0.5'}`}></div></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">settings.notifications</h3>
            <p className="text-sm text-gray-500 mb-6">settings.notifPrefs</p>
            <div className="space-y-4">
              {[{ key: 'emailNotifications', label: 'settings.emailNotif', desc: 'settings.emailNotifDesc' }, { key: 'pushNotifications', label: 'settings.pushNotif', desc: 'settings.pushNotifDesc' }, { key: 'weeklyReports', label: 'settings.weeklyReports', desc: 'settings.weeklyReportsDesc' }].map(item => (
                <div key={item.key} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <div><p className="font-medium text-gray-900 dark:text-white">{item.label}</p><p className="text-sm text-gray-500">{item.desc}</p></div>
                  <button onClick={() => setToggles({ ...toggles, [item.key]: !toggles[item.key] })} className={`w-12 h-6.5 rounded-full relative transition-all ${toggles[item.key] ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}><div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${toggles[item.key] ? 'left-6' : 'left-0.5'}`}></div></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'billing' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">settings.billing</h3>
            <p className="text-sm text-gray-500 mb-6">settings.billingInfo</p>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div><p className="text-sm text-indigo-600">settings.currentPlan</p><h4 className="text-2xl font-bold mt-1">settings.proPlan</h4></div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">Active</span>
              </div>
              <p className="text-gray-600 mb-4">$49/month</p>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg">settings.upgradePlan</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function AnalyticsPage() {
  const { darkMode } = useApp()
  const [animated, setAnimated] = useState(false)
  useEffect(() => { setTimeout(() => setAnimated(true), 300) }, [])

  const stats = [
    { label: 'Page Views', value: '284,520', trend: '+12.5%', up: true, icon: Eye, color: 'indigo' },
    { label: 'Bounce Rate', value: '42.3%', trend: '-2.1%', up: false, icon: Activity, color: 'rose' },
    { label: 'Avg. Session', value: '4m 32s', trend: '+8.2%', up: true, icon: Clock, color: 'amber' },
    { label: 'Pages/Session', value: '3.8', trend: '+5.7%', up: true, icon: FileText, color: 'emerald' },
  ]

  const topSources = [
    { name: 'Organic Search', visitors: '24,589', percentage: 42, color: '#6366f1' },
    { name: 'Direct', visitors: '18,234', percentage: 31, color: '#8b5cf6' },
    { name: 'Social Media', visitors: '10,456', percentage: 18, color: '#ec4899' },
    { name: 'Referral', visitors: '5,123', percentage: 9, color: '#f59e0b' },
  ]

  const browserData = { labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'], datasets: [{ data: [58, 24, 10, 5, 3], backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'], borderWidth: 0 }] }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div key={index} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4"><span className="text-sm text-gray-500">{stat.label}</span><stat.icon className={stat.color === 'indigo' ? 'text-indigo-600' : stat.color === 'rose' ? 'text-rose-600' : stat.color === 'amber' ? 'text-amber-600' : 'text-emerald-600'} size={20} /></div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className={`text-sm mt-2 flex items-center gap-1 ${stat.up ? 'text-emerald-600' : 'text-rose-600'}`}>{stat.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {stat.trend}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {topSources.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2"><span className="text-sm font-medium text-gray-700 dark:text-gray-300">{source.name}</span><span className="text-sm text-gray-500">{source.visitors}</span></div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full"><div className="h-full rounded-full transition-all duration-1000" style={{ width: animated ? `${source.percentage}%` : '0%', backgroundColor: source.color }}></div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Browser Distribution</h3>
          <div className="h-56"><Doughnut data={browserData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { usePointStyle: true, pointStyle: 'circle', color: darkMode ? '#cbd5e1' : '#64748b' } } }, cutout: '65%' }} /></div>
        </div>
      </div>
    </motion.div>
  )
}

function Dashboard() {
  const { isLoggedIn, isLoading, handleLogout, darkMode } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const { width } = useWindowSize()

  useEffect(() => {
    if (width < 1024) setSidebarOpen(false)
  }, [width])

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-darker">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  )

  if (!isLoggedIn) return <LoginPage />

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-dark-darker' : 'bg-gray-50'}`}>
      <ToastContainer />
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <motion.main initial={false} animate={{ marginLeft: sidebarOpen ? 256 : 0 }} className="transition-all duration-300">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<OverviewPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <DataProvider>
            <Dashboard />
          </DataProvider>
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
