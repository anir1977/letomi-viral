'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { categories } from "@/lib/posts";
import SearchBar from "./SearchBar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/latest", label: "Latest" },
  { href: "/trending", label: "Editor's Picks" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => href === "/" ? pathname === "/" : pathname?.startsWith(href);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      data-site-header
      className={`sticky top-0 z-40 border-b border-slate-200/80 bg-[#f7f5ef]/92 backdrop-blur-xl transition-shadow ${
        isScrolled ? "shadow-[0_12px_32px_rgba(15,23,42,0.08)]" : "shadow-none"
      }`}
    >
      <nav className="section-wrap">
        <div className="flex min-h-[68px] items-center justify-between gap-4">
          <Link href="/" className="flex flex-shrink-0 items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
              CS
            </span>
            <div>
              <div className="text-base font-black tracking-tight text-slate-950">CurioSpark</div>
              <div className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block">
                Curiosity journal
              </div>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center px-4 md:flex">
            <div className="w-full max-w-md">
              <SearchBar />
            </div>
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  isActiveLink(link.href)
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-950"
                }`}
                aria-current={isActiveLink(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative group">
              <button
                type="button"
                className="rounded-md px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-white/70 hover:text-slate-950"
                aria-haspopup="true"
              >
                Categories
              </button>
              <div className="absolute right-0 top-full mt-3 w-72 rounded-lg border border-slate-200 bg-white p-2 opacity-0 shadow-xl pointer-events-none translate-y-2 transition duration-200 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  >
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.imageAlt || category.name}
                        width={28}
                        height={28}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-700">
                        {category.name.slice(0, 1)}
                      </span>
                    )}
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setMobileSearchOpen((value) => !value)}
              className="rounded-md p-2 text-slate-700 hover:bg-white"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="rounded-md p-2 text-slate-700 hover:bg-white"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="pb-4 md:hidden">
            <SearchBar />
          </div>
        )}
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="section-wrap py-4">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-bold ${
                    isActiveLink(link.href) ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
                  >
                    {category.name}
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
