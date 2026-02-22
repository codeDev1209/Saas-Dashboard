export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}></div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
      <Skeleton className="w-24 h-8 mb-2" />
      <Skeleton className="w-32 h-4" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Skeleton className="w-32 h-6 mb-2" />
          <Skeleton className="w-48 h-4" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-12 h-8 rounded-lg" />
          <Skeleton className="w-12 h-8 rounded-lg" />
          <Skeleton className="w-12 h-8 rounded-lg" />
        </div>
      </div>
      <Skeleton className="w-full h-72" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-white dark:bg-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              {[...Array(6)].map((_, i) => (
                <th key={i} className="text-left px-6 py-4">
                  <Skeleton className="w-20 h-4" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {[...Array(rows)].map((_, i) => (
              <tr key={i}>
                {[...Array(6)].map((_, j) => (
                  <td key={j} className="px-6 py-4">
                    <Skeleton className="w-full h-4" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {[...Array(4)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="space-y-6">
      <StatsSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartSkeleton />
        <div className="bg-white dark:bg-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <Skeleton className="w-32 h-6 mb-2" />
          <Skeleton className="w-48 h-4 mb-6" />
          <Skeleton className="w-full h-56" />
        </div>
      </div>
    </div>
  )
}
