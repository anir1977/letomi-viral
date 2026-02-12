'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { categories } from "@/lib/posts";
import SearchBar from "./SearchBar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/latest", label: "Latest" },
  { href: "/trending", label: "Trending", icon: "🔥" },
  { href: "/about", label: "About" },
];

const homeLink = navLinks[0];
const restLinks = navLinks.slice(1);

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      data-site-header
      className={`sticky top-0 z-40 bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 backdrop-blur-sm border-b border-white/10 transition-all duration-300 ${
      isScrolled ? "shadow-lg shadow-purple-900/20" : "shadow-none"
    }`}
    >
      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-2.5 md:py-3 min-h-[56px]">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="relative">
              <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">⚡</span>
              <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-full"></div>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-wide drop-shadow-lg group-hover:text-yellow-200 transition-colors duration-300">
              CurioSpark
            </h1>
          </Link>
          
          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <SearchBar />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href={homeLink.href}
              className={`text-sm whitespace-nowrap font-semibold tracking-wide transition-colors duration-200 border-b-2 pb-1 ${
                isActiveLink(homeLink.href)
                  ? "text-white border-white/80"
                  : "text-white/85 border-transparent hover:text-white hover:border-white/60"
              }`}
              aria-current={isActiveLink(homeLink.href) ? "page" : undefined}
            >
              {homeLink.label}
            </Link>

            <div className="relative group">
              <button
                type="button"
                className="text-sm whitespace-nowrap font-semibold tracking-wide text-white/85 transition-colors duration-200 border-b-2 border-transparent pb-1 hover:text-white hover:border-white/60"
                aria-haspopup="true"
              >
                Categories
              </button>
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-white/15 bg-white/95 text-gray-900 shadow-xl opacity-0 pointer-events-none translate-y-2 transition duration-200 z-50 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0">
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-slate-100"
                    >
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.imageAlt || category.name}
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-gray-200 text-[10px] font-semibold text-gray-700 flex items-center justify-center">
                          {category.name.slice(0, 1)}
                        </span>
                      )}
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {restLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm whitespace-nowrap font-semibold tracking-wide transition-colors duration-200 border-b-2 pb-1 ${
                  isActiveLink(link.href)
                    ? "text-white border-white/80"
                    : "text-white/85 border-transparent hover:text-white hover:border-white/60"
                }`}
                aria-current={isActiveLink(link.href) ? "page" : undefined}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/20 bg-gradient-to-b from-purple-800 to-indigo-800">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-3 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 py-2 text-base font-semibold transition-colors duration-200 border-b border-transparent ${
                    isActiveLink(link.href)
                      ? "text-white border-white/60"
                      : "text-white/85 hover:text-white hover:border-white/40"
                  }`}
                  aria-current={isActiveLink(link.href) ? "page" : undefined}
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
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.imageAlt || category.name}
                        width={22}
                        height={22}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-white/20 text-[10px] font-semibold text-white flex items-center justify-center">
                        {category.name.slice(0, 1)}
                      </span>
                    )}
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
