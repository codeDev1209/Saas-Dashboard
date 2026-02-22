import { useState, useEffect } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import '../utils/chartSetup'
import {
  DollarSign, ShoppingCart, Users, Target, TrendingUp, TrendingDown, Zap
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const recentTransactions = [
  { id: 1, type: 'income', description: 'Product Sales', amount: 1250.00, date: '2 min ago', icon: DollarSign, color: 'green' },
  { id: 2, type: 'expense', description: 'Server Maintenance', amount: -250.00, date: '1 hour ago', icon: TrendingUp, color: 'red' },
  { id: 3, type: 'income', description: 'Subscription', amount: 99.00, date: '3 hours ago', icon: DollarSign, color: 'green' },
  { id: 4, type: 'expense', description: 'Marketing Ads', amount: -500.00, date: '5 hours ago', icon: TrendingUp, color: 'red' },
  { id: 5, type: 'income', description: 'Product Sales', amount: 890.00, date: '1 day ago', icon: DollarSign, color: 'green' },
]

export function OverviewPage({ darkMode }) {
  const { addToast } = useApp()
  const [animated, setAnimated] = useState(false)
  const [chartLoaded, setChartLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true)
      setChartLoaded(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { label: 'Total Revenue', value: '$284,520', trend: '+12.5%', up: true, icon: DollarSign, color: 'indigo', subtext: 'vs last month' },
    { label: 'Total Orders', value: '12,847', trend: '+8.2%', up: true, icon: ShoppingCart, color: 'emerald', subtext: 'vs last month' },
    { label: 'Active Users', value: '45,892', trend: '+5.7%', up: true, icon: Users, color: 'amber', subtext: 'vs last month' },
    { label: 'Conversion Rate', value: '3.24%', trend: '-2.4%', up: false, icon: Target, color: 'rose', subtext: 'vs last month' },
  ]

  const colorClasses = {
    indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400' },
    rose: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-600 dark:text-rose-400' },
  }

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Revenue',
      data: [45000, 52000, 48000, 61000, 55000, 67000, 72000, 78000, 85000, 92000, 88000, 96000],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }]
  }

  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Sports'],
    datasets: [{
      data: [35, 25, 20, 12, 8],
      backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
      borderWidth: 0,
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#1e293b' : '#fff',
        titleColor: darkMode ? '#fff' : '#1e293b',
        bodyColor: darkMode ? '#cbd5e1' : '#64748b',
        borderColor: darkMode ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      }
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: { color: darkMode ? '#94a3b8' : '#94a3b8' }
      },
      y: { 
        grid: { borderDash: [5, 5], color: darkMode ? '#334155' : '#e2e8f0' },
        ticks: { 
          color: darkMode ? '#94a3b8' : '#94a3b8',
          callback: value => '$' + (value / 1000) + 'k'
        }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: darkMode ? '#cbd5e1' : '#64748b',
          padding: 16,
        }
      }
    },
    cutout: '70%',
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group transform transition-all duration-500 ${
              animated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
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
            <p className="text-xs text-gray-400 mt-2">{stat.subtext}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly revenue performance</p>
            </div>
            <div className="flex gap-2">
              {['Week', 'Month', 'Year'].map((period, i) => (
                <button 
                  key={period}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    i === 1 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            {chartLoaded && <Line data={revenueData} options={chartOptions} />}
          </div>
        </div>

        <div className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales by Category</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Product category distribution</p>
          </div>
          <div className="h-56">
            {chartLoaded && <Doughnut data={categoryData} options={doughnutOptions} />}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Latest financial activities</p>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentTransactions.map((tx, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.type === 'income' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
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
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-indigo-200 text-sm">Current Plan</p>
                <h3 className="text-2xl font-bold mt-1">Pro Analytics</h3>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap size={24} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-indigo-200 text-xs">Team Members</p>
                <p className="text-2xl font-bold mt-1">8/10</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-indigo-200 text-xs">API Calls</p>
                <p className="text-2xl font-bold mt-1">78%</p>
              </div>
            </div>

            <button className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-lg transition-all" onClick={() => addToast('Upgraded to Pro Plan!', 'success')}>
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
