'use client';

import {
  DocumentTextIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import StatCard from './components/StatCard';
import Card from './components/Card';
import { mockDashboardStats, mockTopArticles } from './lib/mockData';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = mockDashboardStats;
  const topArticles = mockTopArticles;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening with your content.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Articles"
          value={stats.totalArticles}
          icon={<DocumentTextIcon className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Published"
          value={stats.publishedArticles}
          icon={<CheckCircleIcon className="w-6 h-6" />}
          color="green"
          trend={{ value: '+2 this week', isPositive: true }}
        />
        <StatCard
          title="Drafts"
          value={stats.draftArticles}
          icon={<DocumentDuplicateIcon className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          icon={<EyeIcon className="w-6 h-6" />}
          color="purple"
          trend={{ value: '+12% this month', isPositive: true }}
        />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Articles */}
        <Card
          title="Top 5 Articles"
          action={
            <Link
              href="/admin/articles"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all
            </Link>
          }
        >
          <div className="space-y-4">
            {topArticles.map((article, index) => (
              <div
                key={article.id}
                className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {article.views.toLocaleString()} views
                    </p>
                  </div>
                </div>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    article.status === 'published'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}
                >
                  {article.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/admin/articles/new"
              className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Create New Article
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Start writing a new post
                </p>
              </div>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>

            <Link
              href="/admin/seo"
              className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors group"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  SEO Settings
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Optimize site metadata
                </p>
              </div>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <Link
              href="/admin/stats"
              className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-colors group"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                  View Analytics
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Check performance metrics
                </p>
              </div>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </Link>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">The Most Expensive Things Ever Sold</span> was published
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">How the Internet Works</span> was saved as draft
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-purple-500"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                SEO settings updated
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
