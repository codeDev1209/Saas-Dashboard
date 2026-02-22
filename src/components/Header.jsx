import { useState, useRef, useEffect } from 'react'
import { 
  Menu, Search, Bell, Moon, Sun, ChevronDown, 
  User, Settings, HelpCircle, LogOut, ShoppingCart, CreditCard 
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export function Header({ 
  currentPage, onMenuToggle, onLogout, 
  searchQuery, onSearchChange 
}) {
  const { darkMode, toggleDarkMode } = useApp()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  const titles = {
    overview: 'Overview',
    analytics: 'Analytics',
    products: 'Products',
    orders: 'Orders',
    users: 'Users',
    settings: 'Settings',
  }

  const notifications = [
    { id: 1, title: 'New order received', desc: 'Order #ORD-001 has been placed', time: '2 min ago', icon: ShoppingCart, color: 'green' },
    { id: 2, title: 'User registered', desc: 'Sarah Johnson joined as a new member', time: '15 min ago', icon: User, color: 'blue' },
    { id: 3, title: 'Payment failed', desc: 'Payment for order #ORD-005 failed', time: '1 hour ago', icon: CreditCard, color: 'red' },
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-16 bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
          <Menu size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{titles[currentPage]}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Welcome back, Bugbie!</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-40 dark:text-white"
          />
          <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 bg-white dark:bg-gray-700 rounded text-xs text-gray-500 dark:text-gray-400">⌘K</kbd>
        </div>

        <button onClick={toggleDarkMode} className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
          {darkMode ? <Sun size={20} className="text-gray-600 dark:text-gray-300" /> : <Moon size={20} className="text-gray-600" />}
        </button>
        
        <div className="relative" ref={notifRef}>
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors relative">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-dark rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-[fadeIn_0.2s_ease]">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                <button className="text-xs text-indigo-600 hover:text-indigo-700">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notif.color === 'green' ? 'bg-green-100 text-green-600' :
                        notif.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        <notif.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{notif.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{notif.desc}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              BU
            </div>
            <ChevronDown size={16} className="text-gray-400 hidden lg:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-dark rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-[fadeIn_0.2s_ease]">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white">Bugbie</p>
                <p className="text-sm text-gray-500">bugbie@demo.com</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <User size={18} />
                  <span className="text-sm">Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Settings size={18} />
                  <span className="text-sm">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <HelpCircle size={18} />
                  <span className="text-sm">Help Center</span>
                </button>
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
