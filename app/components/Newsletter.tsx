/**
 * Newsletter Component - Viral Feature
 * Inline newsletter signup to build mailing list
 */

'use client';

import { useState } from 'react';

export default function InlineNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }

    setStatus('loading');

    try {
      // TODO: Integrate with your email service (Mailchimp, ConvertKit, etc.)
      // For now, just simulate
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 md:p-8 text-white shadow-lg my-8">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          📧 Never Miss a Story
        </h3>
        <p className="text-purple-100 mb-6">
          Get the latest fascinating facts delivered to your inbox every week
        </p>

        {status === 'success' ? (
          <div className="bg-white/20 backdrop-blur rounded-lg p-4">
            <p className="text-lg font-semibold">✅ Thanks for subscribing!</p>
            <p className="text-sm text-purple-100 mt-1">Check your email to confirm</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-200 text-sm mt-3">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="text-xs text-purple-200 mt-4">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
}
