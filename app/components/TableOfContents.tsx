'use client';

import { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));
    
    const tocItems: TOCItem[] = matches.map((match) => {
      const level = match[1].length; // ## = 2, ### = 3
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      return { id, text, level };
    });

    setHeadings(tocItems);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 my-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left mb-4 md:cursor-default"
        aria-expanded={isOpen}
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <List className="w-6 h-6 text-purple-600" />
          Table of Contents
        </h2>
        <span className="md:hidden text-purple-600">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      {isOpen && (
        <nav aria-label="Table of contents">
          <ul className="space-y-2">
            {headings.map((heading, index) => (
              <li
                key={index}
                className={`${
                  heading.level === 3 ? 'ml-4' : ''
                }`}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors block py-1"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(heading.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      // Update URL without triggering navigation
                      window.history.pushState(null, '', `#${heading.id}`);
                    }
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
