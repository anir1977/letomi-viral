'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    try {
      const posts = getAllPosts();
      const searchQuery = query.toLowerCase();
      
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery) ||
        post.excerpt.toLowerCase().includes(searchQuery) ||
        post.content.toLowerCase().includes(searchQuery)
      ).slice(0, 5);

      setResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
  }, [query]);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search facts, topics, or keywords"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2.5 pl-10 pr-10 text-sm text-white placeholder-white/60 shadow-sm transition focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <svg className="h-4 w-4 text-white/60 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full max-h-96 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
          {results.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="block border-b border-slate-100 p-4 transition hover:bg-slate-50 last:border-b-0"
            >
              <h4 className="mb-1 font-semibold text-slate-900">
                {post.title}
              </h4>
              <p className="line-clamp-2 text-sm text-slate-600">
                {post.excerpt}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <span>{post.readingTime}</span>
                <span>•</span>
                <span>{post.views} views</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <p className="text-center text-slate-600">
            No results found for "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
