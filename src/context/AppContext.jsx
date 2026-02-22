import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })
  const [toasts, setToasts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn)
  }, [isLoggedIn])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }

  const handleLogin = (email, password) => {
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

  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      darkMode,
      toggleDarkMode,
      toasts,
      addToast,
      handleLogin,
      handleLogout,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
