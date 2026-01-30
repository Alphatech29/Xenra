"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavItem = ({ href, label }) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={`relative text-base font-semibold transition-colors ${
          isActive
            ? "text-blue-600"
            : "text-gray-700 hover:text-blue-600"
        }`}
      >
        {label}
        {isActive && (
          <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-600" />
        )}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-blue-600" />
            <span className="text-lg font-semibold text-gray-900">
              Xenra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.href} {...link} />
            ))}
          </nav>

          {/* Auth / CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="space-y-4 px-4 py-6">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.href} {...link} />
            ))}

            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-gray-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="block rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
