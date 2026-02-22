import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

const initialProducts = [
  { id: 1, name: 'Premium Wireless Headphones', sku: 'WH-001', category: 'Electronics', price: 299.99, stock: 145, status: 'Active', sales: 1234, image: '#4f46e5' },
  { id: 2, name: 'Smart Watch Pro', sku: 'SW-002', category: 'Electronics', price: 449.99, stock: 89, status: 'Active', sales: 987, image: '#10b981' },
  { id: 3, name: 'Organic Coffee Beans', sku: 'OC-003', category: 'Food & Beverage', price: 24.99, stock: 523, status: 'Active', sales: 2456, image: '#f59e0b' },
  { id: 4, name: 'Ergonomic Office Chair', sku: 'EC-004', category: 'Furniture', price: 399.99, stock: 34, status: 'Low Stock', sales: 456, image: '#ef4444' },
  { id: 5, name: 'Bluetooth Speaker', sku: 'BS-005', category: 'Electronics', price: 79.99, stock: 0, status: 'Out of Stock', sales: 789, image: '#8b5cf6' },
  { id: 6, name: 'Yoga Mat Premium', sku: 'YM-006', category: 'Sports', price: 49.99, stock: 267, status: 'Active', sales: 1567, image: '#06b6d4' },
  { id: 7, name: 'Stainless Steel Bottle', sku: 'SB-007', category: 'Kitchen', price: 29.99, stock: 412, status: 'Active', sales: 892, image: '#84cc16' },
  { id: 8, name: 'LED Desk Lamp', sku: 'DL-008', category: 'Electronics', price: 59.99, stock: 178, status: 'Active', sales: 634, image: '#f97316' },
]

const initialOrders = [
  { id: 'ORD-001', customer: 'John Smith', email: 'john@example.com', product: 'Premium Wireless Headphones', amount: 299.99, status: 'Completed', date: '2024-01-15', payment: 'Paid' },
  { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@example.com', product: 'Smart Watch Pro', amount: 449.99, status: 'Processing', date: '2024-01-15', payment: 'Paid' },
  { id: 'ORD-003', customer: 'Mike Williams', email: 'mike@example.com', product: 'Organic Coffee Beans', amount: 24.99, status: 'Pending', date: '2024-01-14', payment: 'Pending' },
  { id: 'ORD-004', customer: 'Emily Brown', email: 'emily@example.com', product: 'Ergonomic Office Chair', amount: 399.99, status: 'Completed', date: '2024-01-14', payment: 'Paid' },
  { id: 'ORD-005', customer: 'David Lee', email: 'david@example.com', product: 'Bluetooth Speaker', amount: 79.99, status: 'Cancelled', date: '2024-01-13', payment: 'Refunded' },
  { id: 'ORD-006', customer: 'Lisa Chen', email: 'lisa@example.com', product: 'Yoga Mat Premium', amount: 49.99, status: 'Completed', date: '2024-01-13', payment: 'Paid' },
]

const initialUsers = [
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2 min ago', avatar: '#4f46e5', orders: 45, spent: '$2,340' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Editor', status: 'Active', lastActive: '15 min ago', avatar: '#10b981', orders: 32, spent: '$1,890' },
  { id: 3, name: 'Mike Williams', email: 'mike@example.com', role: 'Viewer', status: 'Inactive', lastActive: '2 days ago', avatar: '#f59e0b', orders: 12, spent: '$456' },
  { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Editor', status: 'Active', lastActive: '1 hour ago', avatar: '#ef4444', orders: 67, spent: '$3,120' },
  { id: 5, name: 'David Lee', email: 'david@example.com', role: 'Viewer', status: 'Pending', lastActive: '3 days ago', avatar: '#8b5cf6', orders: 8, spent: '$234' },
  { id: 6, name: 'Lisa Chen', email: 'lisa@example.com', role: 'Admin', status: 'Active', lastActive: '5 min ago', avatar: '#06b6d4', orders: 89, spent: '$4,560' },
]

export function DataProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products')
    return saved ? JSON.parse(saved) : initialProducts
  })
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders')
    return saved ? JSON.parse(saved) : initialOrders
  })
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users')
    return saved ? JSON.parse(saved) : initialUsers
  })

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now(), sales: 0 }
    setProducts(prev => [...prev, newProduct])
  }

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const addOrder = (order) => {
    const newOrder = { ...order, id: `ORD-${String(orders.length + 1).padStart(3, '0')}`, date: new Date().toISOString().split('T')[0] }
    setOrders(prev => [newOrder, ...prev])
  }

  const updateOrder = (id, updates) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o))
  }

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id))
  }

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now(), orders: 0, spent: '$0', lastActive: 'Just now' }
    setUsers(prev => [...prev, newUser])
  }

  const updateUser = (id, updates) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u))
  }

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  const resetData = () => {
    setProducts(initialProducts)
    setOrders(initialOrders)
    setUsers(initialUsers)
  }

  return (
    <DataContext.Provider value={{
      products,
      orders,
      users,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrder,
      deleteOrder,
      addUser,
      updateUser,
      deleteUser,
      resetData
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}
