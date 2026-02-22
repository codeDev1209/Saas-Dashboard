import { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import '../utils/chartSetup'
import { Eye, Activity, Clock, FileText, TrendingUp, TrendingDown } from 'lucide-react'

const topSources = [
  { name: 'Organic Search', visitors: '24,589', percentage: 42, color: '#6366f1' },
  { name: 'Direct', visitors: '18,234', percentage: 31, color: '#8b5cf6' },
  { name: 'Social Media', visitors: '10,456', percentage: 18, color: '#ec4899' },
  { name: 'Referral', visitors: '5,123', percentage: 9, color: '#f59e0b' },
]

const browserData = {
  labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'],
  datasets: [{
    data: [58, 24, 10, 5, 3],
    backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
    borderWidth: 0,
  }]
}

export function AnalyticsPage({ darkMode }) {
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
    { label: 'Page Views', value: '284,520', trend: '+12.5%', up: true, icon: Eye, color: 'indigo' },
    { label: 'Bounce Rate', value: '42.3%', trend: '-2.1%', up: false, icon: Activity, color: 'rose' },
    { label: 'Avg. Session', value: '4m 32s', trend: '+8.2%', up: true, icon: Clock, color: 'amber' },
    { label: 'Pages/Session', value: '3.8', trend: '+5.7%', up: true, icon: FileText, color: 'emerald' },
  ]

  const colorClasses = {
    indigo: 'text-indigo-600 dark:text-indigo-400',
    rose: 'text-rose-600 dark:text-rose-400',
    amber: 'text-amber-600 dark:text-amber-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' },
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
    cutout: '65%',
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all duration-500 ${
              animated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
              <stat.icon className={colorClasses[stat.color]} size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className={`text-sm mt-2 flex items-center gap-1 ${stat.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {stat.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {stat.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {topSources.map((source, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-500 ${
                  animated ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{source.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{source.visitors}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: animated ? `${source.percentage}%` : '0%',
                      backgroundColor: source.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Browser Distribution</h3>
          <div className="h-56">
            {chartLoaded && <Doughnut data={browserData} options={doughnutOptions} />}
          </div>
        </div>
      </div>
    </div>
  )
}
