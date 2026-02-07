'use client';

import { useState } from 'react';
import { Twitter, Facebook, Link2, Check } from 'lucide-react';

interface StickyShareButtonsProps {
  title: string;
  slug: string;
  basePath?: string;
}

export default function StickyShareButtons({ title, slug, basePath = "/post" }: StickyShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const normalizedBasePath = basePath.startsWith("/") ? basePath : `/${basePath}`;
  const url = `https://curiospark.com${normalizedBasePath}/${slug}`;
  const text = `Check out: ${title}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  };

  return (
    <>
      {/* Mobile Inline Buttons */}
      <div className="md:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
            aria-label="Share on X"
          >
            <Twitter className="w-4 h-4 text-sky-500" />
            X
          </a>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-4 h-4 text-blue-600" />
            Facebook
          </a>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
            aria-label="Copy link"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Copied
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4 text-gray-600" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden md:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 space-y-3 border border-gray-200 dark:border-gray-700">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Share on X"
          >
            <Twitter className="w-5 h-5 text-sky-500" />
          </a>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-5 h-5 text-blue-600" />
          </a>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Copy link"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Link2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
