'use client';

import { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react';

interface StickyShareButtonsProps {
  title: string;
  slug: string;
}

export default function StickyShareButtons({ title, slug }: StickyShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const url = `https://curiospark.com/post/${slug}`;
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
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  return (
    <>
      {/* Mobile Floating Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Share"
        >
          <Share2 className="w-6 h-6" />
        </button>
        
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 space-y-2 min-w-[160px]">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <Twitter className="w-5 h-5 text-sky-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Twitter</span>
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Facebook</span>
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <Linkedin className="w-5 h-5 text-blue-700" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">LinkedIn</span>
            </a>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition w-full"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Copy Link</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden md:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 space-y-3 border border-gray-200 dark:border-gray-700">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Share on Twitter"
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
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-blue-700" />
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
