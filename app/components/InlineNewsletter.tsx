'use client';

import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function InlineNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, integrate with your email service
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="my-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Mail className="w-8 h-8" />
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          🎯 Want More Mind-Blowing Facts?
        </h3>
        <p className="text-lg mb-4 opacity-90">
          Join 50,000+ curious minds getting weekly discoveries in their inbox
        </p>
        
        {/* Social Proof */}
        <div className="flex items-center justify-center gap-6 mb-6 text-sm opacity-90">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span>4.9/5 rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <span>Fact-checked</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔒</span>
            <span>No spam</span>
          </div>
        </div>
        
        {subscribed ? (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-xl font-semibold">
              ✅ Thank you! Check your inbox to confirm.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition whitespace-nowrap"
            >
              Get Facts 🚀
            </button>
          </form>
        )}
        
        <p className="text-sm mt-4 opacity-75">
          No spam. Unsubscribe anytime. 100% free.
        </p>
      </div>
    </div>
  );
}
