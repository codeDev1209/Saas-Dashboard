import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function ToastContainer() {
  const { toasts } = useApp()

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {toasts.map(toast => {
        const Icon = icons[toast.type]
        return (
          <div 
            key={toast.id} 
            className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-dark rounded-lg shadow-lg animate-[slideIn_0.3s_ease]"
          >
            <Icon size={20} style={{ color: colors[toast.type] }} />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{toast.message}</p>
          </div>
        )
      })}
    </div>
  )
}
