'use client';

import Link from "next/link";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const categories = [
  { name: "Psychology", slug: "psychology", icon: "🧠" },
  { name: "Science", slug: "science", icon: "🔬" },
  { name: "Human Body", slug: "human-body", icon: "💪" },
  { name: "Nature", slug: "nature", icon: "🌿" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trending", label: "Trending", icon: "🔥" },
  { href: "/latest", label: "Latest" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
            <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-200">⚡</span>
            <h1 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">CurioSpark</h1>
          </Link>
          
          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <SearchBar />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-yellow-300 transition-colors duration-200 font-medium text-sm whitespace-nowrap"
              >
                {link.icon && <span className="mr-1">{link.icon}</span>}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 text-white hover:text-yellow-300 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-yellow-300 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="mt-3 md:hidden">
            <SearchBar />
          </div>
        )}
      </nav>

      {/* Categories Bar - Desktop */}
      <div className="hidden md:block border-t border-white/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="flex items-center gap-2 text-white/80 hover:text-yellow-300 transition-colors duration-200 whitespace-nowrap text-sm"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/20 bg-gradient-to-b from-purple-700 to-indigo-700">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-3 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-white/90 hover:text-yellow-300 transition-colors duration-200 py-2 text-base font-medium"
                >
                  {link.icon && <span>{link.icon}</span>}
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile Categories */}
            <div className="border-t border-white/20 pt-4">
              <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3 font-semibold">Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-white/80 hover:text-yellow-300 transition-colors duration-200 text-sm py-2"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
