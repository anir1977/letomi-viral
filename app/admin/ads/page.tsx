'use client';

import { useState } from 'react';
import {
  RectangleGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Card from '../components/Card';

interface AdSlot {
  id: string;
  name: string;
  code: string;
  enabled: boolean;
  position: 'header' | 'article-top' | 'article-middle' | 'article-bottom' | 'sidebar' | 'footer';
}

export default function AdsManagementPage() {
  // Mock data - TODO: Replace with Supabase
  const [adSlots, setAdSlots] = useState<AdSlot[]>([
    {
      id: '1',
      name: 'Header Banner (728x90)',
      code: '',
      enabled: false,
      position: 'header',
    },
    {
      id: '2',
      name: 'In-Article Top (Responsive)',
      code: '',
      enabled: false,
      position: 'article-top',
    },
    {
      id: '3',
      name: 'In-Article Middle (Responsive)',
      code: '',
      enabled: false,
      position: 'article-middle',
    },
    {
      id: '4',
      name: 'In-Article Bottom (Responsive)',
      code: '',
      enabled: false,
      position: 'article-bottom',
    },
    {
      id: '5',
      name: 'Sidebar (300x600)',
      code: '',
      enabled: false,
      position: 'sidebar',
    },
    {
      id: '6',
      name: 'Footer Banner (728x90)',
      code: '',
      enabled: false,
      position: 'footer',
    },
  ]);

  const [globalAdSettings, setGlobalAdSettings] = useState({
    adsensePublisherId: '',
    autoAdsEnabled: false,
    showAdsToLoggedInUsers: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const updateAdSlot = (id: string, field: keyof AdSlot, value: any) => {
    setAdSlots(adSlots.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    
    // TODO: Save to Supabase
    console.log('Saving ad settings:', { adSlots, globalAdSettings });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <RectangleGroupIcon className="w-8 h-8 mr-3 text-green-600" />
            AdSense Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage Google AdSense ads for your website
          </p>
        </div>
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center"
        >
          {isSaving ? (
            'Saving...'
          ) : saveSuccess ? (
            <>
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              Saved!
            </>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>

      {/* AdSense Guidelines Alert */}
      <Card>
        <div className="flex items-start space-x-3">
          <InformationCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              AdSense Policy Guidelines
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li>Maximum 3 ads per page for optimal user experience</li>
              <li>Ads must be clearly distinguishable from content</li>
              <li>Do not place ads near similar-looking content</li>
              <li>Do not encourage clicks on ads ("Click here", etc.)</li>
              <li>Ads must not be placed in pop-ups or pop-unders</li>
              <li>Ensure ads are visible and not hidden</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Global AdSense Settings */}
      <Card title="Global AdSense Settings">
        <div className="space-y-6">
          {/* Publisher ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              AdSense Publisher ID
              <span className="text-gray-500 ml-2 text-xs">(ca-pub-XXXXXXXXXXXXXXXX)</span>
            </label>
            <input
              type="text"
              value={globalAdSettings.adsensePublisherId}
              onChange={(e) => setGlobalAdSettings({ ...globalAdSettings, adsensePublisherId: e.target.value })}
              placeholder="ca-pub-1234567890123456"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500">
              Find this in your AdSense account under Account → Account information
            </p>
          </div>

          {/* Auto Ads */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Enable Auto Ads
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Let Google automatically place ads on your site
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={globalAdSettings.autoAdsEnabled}
                onChange={(e) => setGlobalAdSettings({ ...globalAdSettings, autoAdsEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>

          {/* Show Ads to Logged In Users */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Show Ads to Logged-In Users
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Display ads even when users are logged in
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={globalAdSettings.showAdsToLoggedInUsers}
                onChange={(e) => setGlobalAdSettings({ ...globalAdSettings, showAdsToLoggedInUsers: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Ad Slots */}
      <Card title="Ad Placement Slots">
        <div className="space-y-6">
          {adSlots.map((slot) => (
            <div
              key={slot.id}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4"
            >
              {/* Slot Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <RectangleGroupIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {slot.name}
                    </h3>
                    <p className="text-xs text-gray-500 capitalize">
                      Position: {slot.position.replace('-', ' ')}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={slot.enabled}
                    onChange={(e) => updateAdSlot(slot.id, 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {slot.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </label>
              </div>

              {/* Ad Code Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AdSense Code
                </label>
                <div className="relative">
                  <textarea
                    value={slot.code}
                    onChange={(e) => updateAdSlot(slot.id, 'code', e.target.value)}
                    placeholder={`<!-- Paste your AdSense code here -->\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>\n<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-xxxxx"\n     data-ad-slot="xxxxx"></ins>\n<script>\n     (adsbygoogle = window.adsbygoogle || []).push({});\n</script>`}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-xs"
                  />
                  {slot.code && (
                    <button
                      onClick={() => copyToClipboard(slot.code)}
                      className="absolute top-2 right-2 p-2 bg-gray-100 dark:bg-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                      title="Copy code"
                    >
                      <DocumentDuplicateIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Copy the ad code from your AdSense account and paste it here
                </p>
              </div>

              {/* Preview Info */}
              {slot.enabled && slot.code && (
                <div className="flex items-start space-x-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-800 dark:text-green-300">
                    <strong>Active:</strong> This ad will appear in the {slot.position.replace('-', ' ')} position
                  </div>
                </div>
              )}

              {slot.enabled && !slot.code && (
                <div className="flex items-start space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Warning:</strong> Ad is enabled but no code is provided
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Implementation Guide */}
      <Card title="Implementation Guide">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            How to Add AdSense Ads
          </h3>
          <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>
              <strong>Get your AdSense Publisher ID:</strong> Log in to your AdSense account and find your publisher ID (starts with "ca-pub-")
            </li>
            <li>
              <strong>Create ad units:</strong> In AdSense, create ad units for each position you want to use
            </li>
            <li>
              <strong>Copy ad codes:</strong> Copy the HTML code for each ad unit
            </li>
            <li>
              <strong>Paste codes above:</strong> Paste each code into the corresponding slot above
            </li>
            <li>
              <strong>Enable ads:</strong> Toggle the switch to enable each ad position
            </li>
            <li>
              <strong>Save settings:</strong> Click "Save Settings" to apply changes
            </li>
          </ol>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> After saving, the ads will automatically appear on your website. 
              It may take a few minutes for Google to start serving ads.
            </p>
          </div>

          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <p className="text-sm text-orange-800 dark:text-orange-300">
              <strong>Important:</strong> Make sure your site complies with AdSense policies. 
              Violations can result in account suspension.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
