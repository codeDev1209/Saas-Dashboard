import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Zap, 
  Award, 
  LogOut,
  BarChart3,
  X
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ currentPage, onPageChange, isOpen, onToggle, onLogout, darkMode }) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <aside className={`fixed left-0 top-0 h-screen bg-white dark:bg-dark border-r border-gray-200 dark:border-gray-700 flex flex-col z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      } ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
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
            <div 
              key={item.id}
              onClick={() => {
                onPageChange(item.id)
                if (window.innerWidth < 1024) onToggle()
              }}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 font-medium ${
                currentPage === item.id 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/25' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              {item.label}
              {item.id === 'overview' && <span className="ml-auto text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full">New</span>}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-purple-600" size={18} />
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Pro Plan</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Your team has 5 days left in trial</p>
            <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold rounded-lg hover:shadow-lg transition-all">Upgrade Now</button>
          </div>
          
          <div className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              BU
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Bugbie</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <button onClick={onLogout} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
