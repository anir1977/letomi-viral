'use client';

import { useState } from 'react';

interface SharePromptProps {
  question?: string;
  title: string;
  slug: string;
  basePath?: string;
}

export default function SharePrompt({ 
  question = "Did this surprise you? Share with someone who needs to know this!",
  title,
  slug,
  basePath = "/post"
}: SharePromptProps) {
  const [copied, setCopied] = useState(false);
  const normalizedBasePath = basePath.startsWith("/") ? basePath : `/${basePath}`;
  const url = typeof window !== 'undefined' ? `${window.location.origin}${normalizedBasePath}/${slug}` : '';
  
  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    );
  };
  
  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    );
  };
  
  const handleWhatsAppShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      '_blank'
    );
  };
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <div className="my-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-6 text-center">
      <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {question}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button 
          onClick={handleFacebookShare}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Share on Facebook"
        >
          <span>📘</span>
          Share on Facebook
        </button>
        <button 
          onClick={handleTwitterShare}
          className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-sky-300"
          aria-label="Share on Twitter"
        >
          <span>🐦</span>
          Tweet This
        </button>
        <button 
          onClick={handleWhatsAppShare}
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-green-300"
          aria-label="Share on WhatsApp"
        >
          <span>💬</span>
          Share on WhatsApp
        </button>
        <button 
          onClick={handleCopyLink}
          className={`${copied ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-700'} text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-gray-300`}
          aria-label="Copy link"
        >
          <span>{copied ? '✅' : '🔗'}</span>
          {copied ? 'Link Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
