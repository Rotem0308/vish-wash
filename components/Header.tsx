"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BUSINESS_NAME, PHONE_NUMBER } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
    </svg>
  );
}

const navLinks = [
  { label: "שירותים", href: "#services" },
  { label: "למה אנחנו?", href: "#why-us" },
  { label: "צרו קשר", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [barOpen, setBarOpen] = useState(true);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Mobile-only: close menu first, then scroll after the 300ms transition */
  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (!target) return;
      const header = document.querySelector<HTMLElement>("[data-header]");
      const offset = (header?.offsetHeight ?? 64) + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }, 320); // wait for menu close animation (300ms + buffer)
  };

  return (
    <div className="sticky top-0 z-50" data-header>
      {/* Announcement bar */}
      {barOpen && (
        <div className="relative bg-gradient-to-l from-blue-700 via-blue-600 to-indigo-700 text-white text-xs sm:text-sm font-medium py-2.5 px-10 text-center animate-slide-down">
          🎉&nbsp; מבצע מוגבל –{" "}
          <strong>20% הנחה</strong> לעסקים חדשים שנרשמים השבוע.&nbsp;
          <a href="#contact" className="underline underline-offset-2 font-bold hover:no-underline">
            להרשמה »
          </a>
          <button
            onClick={() => setBarOpen(false)}
            aria-label="סגור הודעה"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white text-base leading-none"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main nav */}
      <header
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-white/97 backdrop-blur-md border-b border-gray-100 shadow-lg shadow-black/[0.07]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-violet-700 tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-md"
          >
            {logoError ? (
              <>
              <span className="text-2xl">🧹</span>
              <span>{BUSINESS_NAME}</span>
              </>
            ) : (
              
              <Image
                src="/icons/vish-wash.png"
                alt={BUSINESS_NAME}
                width={120}
                height={120}
                className="h-20 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-gray-700 hover:text-violet-700 transition-colors duration-200 group py-1"
              >
                {link.label}
                <span className="absolute -bottom-0.5 right-0 w-0 group-hover:w-full h-0.5 bg-violet-600 transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Phone pill */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="group flex items-center gap-2 bg-green-50 hover:bg-green-500 border border-green-200 hover:border-green-500 text-green-700 hover:text-white font-bold px-4 py-2 rounded-full text-sm transition-all duration-250 shadow-sm hover:shadow-md hover:shadow-green-200/60 hover:-translate-y-0.5"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <PhoneIcon />
              <span>{PHONE_NUMBER}</span>
            </a>
            {/* Quote CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300/60 hover:-translate-y-0.5 transition-all duration-200"
            >
              הצעת מחיר חינם ✨
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile: phone icon + hamburger */}
          <div className="md:hidden flex items-center gap-1.5">
            <a
              href={`tel:${PHONE_NUMBER}`}
              aria-label={`התקשרו: ${PHONE_NUMBER}`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 hover:bg-green-100 text-green-600 transition-colors duration-200"
            >
              <PhoneIcon className="w-5 h-5" />
            </a>
          <button
            aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 my-1 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-white/97 backdrop-blur-sm border-t border-violet-100`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleMobileNavClick(e, link.href)}
              className="block py-3 px-3 text-base font-medium text-gray-700 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleMobileNavClick(e, "#contact")}
              className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-4 py-3 rounded-xl transition-colors duration-200 text-sm"
            >
              הצעת מחיר חינם ✨
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
      </header>
    </div>
  );
}
