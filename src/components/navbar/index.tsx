"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Separator } from "../ui/separator";
import { Blob } from "./blob";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Product", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="relative z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/new-logo/scrunity-icon.svg"
            alt="Scrunity Logo"
            width={38}
            height={38}
            className="h-auto w-9.5"
          />
          <span className="text-[19px] font-bold tracking-tight text-neutral-900">
            Scrunity AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item, index) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center justify-center rounded-full px-3.5 py-1.5 text-[13px] font-medium text-neutral-500 transition-colors duration-150 hover:bg-gray-100 hover:text-neutral-900"
              >
                {item.label}
              </Link>
              {index === 1 && navHoverContainer()}
            </div>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/join"
            className="hidden items-center justify-center rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-neutral-800 shadow-xs transition-colors duration-150 hover:bg-gray-50 md:flex"
          >
            Book a demo
          </Link>
          <Link
            href="/join"
            className="flex items-center justify-center rounded-lg bg-neutral-900 px-3.5 py-1.5 text-[13px] font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-neutral-800"
          >
            Get Started
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="flex items-center justify-center p-1 text-neutral-700 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-gray-100 hover:text-neutral-900"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-gray-100 pt-2">
              <Link
                href="/join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const navHoverContainer = () => {
  const Items = [
    { label: "About", para: "Meet the founder", href: "/about" },
    { label: "Security", para: "Safe, Secure, Private", href: "/security" },
    { label: "Careers", para: "Currently not hiring", href: "/careers" },
  ];

  return (
    <motion.div className="pointer-events-none invisible absolute top-full left-1/2 z-10 mt-2 w-[260px] -translate-x-1/2 rounded-[18px] border border-gray-200 bg-white p-1.5 opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
      <div className="flex items-center gap-2">
        {/* Mini blob */}
        <div className="flex h-full w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2">
          <div className="h-14 w-14 rotate-45 opacity-60">
            <Blob />
          </div>
        </div>

        <div className="flex flex-col gap-0.5 py-1">
          {Items.map(({ label, para, href }) => (
            <Link
              key={href}
              href={href}
              className="group/item flex flex-col rounded-lg px-2.5 py-1.5 transition-colors hover:bg-gray-50"
            >
              <span className="text-[13px] font-semibold text-neutral-800">
                {label}
              </span>
              <span className="text-[11px] text-neutral-400">{para}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
