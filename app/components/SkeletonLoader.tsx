export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="relative w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonArticle() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
      <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}
