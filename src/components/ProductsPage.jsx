import { useState } from 'react'
import { 
  Filter, Download, Plus, ChevronLeft, ChevronRight,
  Eye, Edit, Trash2, X, Package
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useData } from '../context/DataContext'

export function ProductsPage({ darkMode }) {
  const { addToast } = useApp()
  const { products, addProduct, updateProduct, deleteProduct } = useData()
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '', sku: '', category: '', price: '', stock: '', status: 'Active'
  })
  const itemsPerPage = 5
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const categories = ['Electronics', 'Food & Beverage', 'Furniture', 'Sports', 'Kitchen', 'Clothing', 'Home & Garden']

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({ ...product, price: product.price.toString(), stock: product.stock.toString() })
    } else {
      setEditingProduct(null)
      setFormData({ name: '', sku: '', category: '', price: '', stock: '', status: 'Active' })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setFormData({ name: '', sku: '', category: '', price: '', stock: '', status: 'Active' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
      addToast('Product updated successfully!', 'success')
    } else {
      addProduct(productData)
      addToast('Product added successfully!', 'success')
    }
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
      addToast('Product deleted', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">All Products</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your product inventory</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Download size={18} />
            Export
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Product</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">SKU</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Category</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Price</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Stock</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Sales</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: product.image }}>
                        {product.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      product.status === 'Low Stock' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.sales.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenModal(product)} className="p-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg text-gray-400 hover:text-indigo-600 transition-colors"><Eye size={16} /></button>
                      <button onClick={() => handleOpenModal(product)} className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg text-gray-400 hover:text-amber-600 transition-colors"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, products.length)} of {products.length} products</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === i + 1 ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <ChevronRight size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
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
                <Package className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {editingProduct ? 'Update product details' : 'Fill in product information'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="Enter product name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                  <input type="text" required value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="SKU-001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white">
                    <option value="">Select category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                  <input type="number" step="0.01" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                  <input type="number" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white">
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={handleCloseModal} className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
                  {editingProduct ? 'Update' : 'Add'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
