'use client';

import { useState } from 'react';
import {
  ArrowTrendingUpIcon,
  UsersIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import StatCard from '../components/StatCard';

type TimeRange = '7d' | '30d' | '90d' | '1y';

// Mock analytics data
const mockAnalytics = {
  overview: {
    pageViews: 125430,
    uniqueVisitors: 45678,
    avgTimeOnSite: '3:42',
    bounceRate: '42.5%',
  },
  topPages: [
    { path: '/post/10-surprising-facts-about-space', views: 15678, uniqueVisitors: 8934 },
    { path: '/post/most-expensive-things-ever-sold', views: 12543, uniqueVisitors: 7621 },
    { path: '/post/history-of-pizza', views: 9821, uniqueVisitors: 5432 },
    { path: '/categories/science', views: 7654, uniqueVisitors: 4321 },
    { path: '/latest', views: 6543, uniqueVisitors: 3987 },
  ],
  traffic: [
    { date: '2026-01-14', views: 4532, visitors: 2341 },
    { date: '2026-01-15', views: 5123, visitors: 2789 },
    { date: '2026-01-16', views: 4876, visitors: 2654 },
    { date: '2026-01-17', views: 5432, visitors: 2987 },
    { date: '2026-01-18', views: 6234, visitors: 3421 },
    { date: '2026-01-19', views: 5987, visitors: 3234 },
    { date: '2026-01-20', views: 6543, visitors: 3567 },
  ],
  sources: [
    { name: 'Google Search', visits: 45234, percentage: 48.2 },
    { name: 'Direct', visits: 28765, percentage: 30.6 },
    { name: 'Social Media', visits: 12543, percentage: 13.4 },
    { name: 'Referral', visits: 5432, percentage: 5.8 },
    { name: 'Other', visits: 1876, percentage: 2.0 },
  ],
  devices: [
    { type: 'Mobile', percentage: 62.4, visits: 58567 },
    { type: 'Desktop', percentage: 32.1, visits: 30145 },
    { type: 'Tablet', percentage: 5.5, visits: 5163 },
  ],
};

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const analytics = mockAnalytics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics & Stats
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track your site's performance and traffic
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex space-x-2">
          {(['7d', '30d', '90d', '1y'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {range === '7d' && 'Last 7 Days'}
              {range === '30d' && 'Last 30 Days'}
              {range === '90d' && 'Last 90 Days'}
              {range === '1y' && 'Last Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Page Views"
          value={analytics.overview.pageViews.toLocaleString()}
          icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
          color="blue"
          trend={{ value: '+18.2% vs last period', isPositive: true }}
        />
        <StatCard
          title="Unique Visitors"
          value={analytics.overview.uniqueVisitors.toLocaleString()}
          icon={<UsersIcon className="w-6 h-6" />}
          color="green"
          trend={{ value: '+12.5% vs last period', isPositive: true }}
        />
        <StatCard
          title="Avg. Time on Site"
          value={analytics.overview.avgTimeOnSite}
          icon={<ClockIcon className="w-6 h-6" />}
          color="purple"
          trend={{ value: '-5.2% vs last period', isPositive: false }}
        />
        <StatCard
          title="Bounce Rate"
          value={analytics.overview.bounceRate}
          icon={<DevicePhoneMobileIcon className="w-6 h-6" />}
          color="orange"
          trend={{ value: '-3.1% vs last period', isPositive: true }}
        />
      </div>

      {/* Traffic Chart */}
      <Card title="Traffic Overview">
        <div className="space-y-4">
          {/* Simple bar chart representation */}
          <div className="flex items-end justify-between h-64 space-x-2">
            {analytics.traffic.map((day, index) => {
              const maxViews = Math.max(...analytics.traffic.map(d => d.views));
              const height = (day.views / maxViews) * 100;
              
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center justify-end h-full">
                    <div
                      className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {day.views.toLocaleString()} views
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Page Views</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card title="Top Pages">
          <div className="space-y-4">
            {analytics.topPages.map((page, index) => (
              <div
                key={page.path}
                className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {page.path}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {page.uniqueVisitors.toLocaleString()} unique visitors
                    </p>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {page.views.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">views</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card title="Traffic Sources">
          <div className="space-y-4">
            {analytics.sources.map((source) => (
              <div key={source.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {source.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {source.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {source.visits.toLocaleString()} visits
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Devices */}
        <Card title="Devices">
          <div className="space-y-6">
            {analytics.devices.map((device) => (
              <div key={device.type} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {device.type}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {device.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      device.type === 'Mobile'
                        ? 'bg-green-500'
                        : device.type === 'Desktop'
                        ? 'bg-blue-500'
                        : 'bg-purple-500'
                    }`}
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {device.visits.toLocaleString()} visits
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Engagement Metrics */}
        <Card title="Engagement Metrics">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pages per Visit</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2</p>
              </div>
              <div className="text-green-600 dark:text-green-400 text-sm">
                ↑ +8.3%
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Return Visitors</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">34.5%</p>
              </div>
              <div className="text-green-600 dark:text-green-400 text-sm">
                ↑ +5.2%
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">New Visitors</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">65.5%</p>
              </div>
              <div className="text-red-600 dark:text-red-400 text-sm">
                ↓ -2.1%
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Note */}
      <Card>
        <div className="text-center py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            📊 Mock data for demonstration. Connect to Google Analytics or your analytics provider for real data.
          </p>
        </div>
      </Card>
    </div>
  );
}
