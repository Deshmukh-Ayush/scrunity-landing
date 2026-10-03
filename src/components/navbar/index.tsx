"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Separator } from "../ui/separator";
import { Blob } from "./blob";

const __TRANSITION_STYLES = `
  :root {
    --icon-swap-dur: 250ms;
    --icon-swap-blur: 2px;
    --icon-swap-start-scale: 0.25;
    --icon-swap-ease: ease-in-out;
  }
  .t-icon-swap {
    position: relative;
    display: inline-grid;
  }
  .t-icon-swap .t-icon {
    grid-area: 1 / 1;
    transition:
      opacity    var(--icon-swap-dur) var(--icon-swap-ease),
      filter     var(--icon-swap-dur) var(--icon-swap-ease),
      transform  var(--icon-swap-dur) var(--icon-swap-ease);
    will-change: opacity, filter, transform;
  }
  .t-icon-swap[data-state="a"] .t-icon[data-icon="a"],
  .t-icon-swap[data-state="b"] .t-icon[data-icon="b"] {
    opacity: 1;
    filter: blur(0);
    transform: scale(1);
  }
  .t-icon-swap[data-state="a"] .t-icon[data-icon="b"],
  .t-icon-swap[data-state="b"] .t-icon[data-icon="a"] {
    opacity: 0;
    filter: blur(var(--icon-swap-blur));
    transform: scale(var(--icon-swap-start-scale));
  }
  @media (prefers-reduced-motion: reduce) {
    .t-icon-swap .t-icon { transition: none !important; }
  }
`;

if (
  typeof document !== "undefined" &&
  !document.getElementById("transitions-p5")
) {
  const __style = document.createElement("style");
  __style.id = "transitions-p5";
  __style.textContent = __TRANSITION_STYLES;
  document.head.appendChild(__style);
}

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Product", href: "/product" },
    { label: "Resources", href: "/resources" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blogs", href: "/blog" },
    { label: "Contact", href: "/join" },
  ];

  return (
    <div className="shadow-border relative z-50 h-[72px] w-full bg-gray-100 px-4 md:px-8">
      <div className="h-full w-full md:px-20">
        <div className="flex h-full w-full items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/new-logo/scrunity-icon.svg"
              alt="Scrunity Logo"
              width={100}
              height={100}
              className="h-auto w-8"
            />
            <span className="text-xl font-semibold">Scrunity AI</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* big screens */}
            <div className="hidden items-center md:flex">
              {navItems.map((item, index) => (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center justify-center rounded-full px-4 py-1.5 text-[13px] font-medium text-neutral-700 transition-colors duration-200 ease-in-out hover:bg-gray-200"
                  >
                    {item.label}
                  </Link>
                  {index == 1 && navHoverContainer()}
                </div>
              ))}
            </div>

            {/* login signup */}
            <div className="flex items-center justify-center gap-2">
              <div className="hidden h-5 md:block">
                <Separator orientation="vertical" />
              </div>
              <Link
                href="/join"
                className="flex items-center justify-center rounded-full px-4 py-1.5 text-[13px] font-medium text-neutral-700 transition-colors duration-200 ease-in-out hover:bg-neutral-200"
              >
                Contact Sales
              </Link>
              <Link
                href="/join"
                className="flex items-center justify-center rounded-full bg-neutral-800 px-4 py-1.5 text-[13px] font-medium text-neutral-100"
              >
                Get Early Access
              </Link>
            </div>

            {/* hamburger menu */}
            <button
              type="button"
              className="flex items-center justify-center md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span
                className="t-icon-swap"
                data-state={isMobileMenuOpen ? "b" : "a"}
              >
                <span className="t-icon text-neutral-700" data-icon="a">
                  <svg
                    width="24"
                    height="24"
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
                </span>
                {/* Cross Icon */}
                <span className="t-icon text-neutral-700" data-icon="b">
                  <svg
                    width="24"
                    height="24"
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
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="shadow-border absolute top-full left-0 flex w-full flex-col bg-gray-100 px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full rounded-md px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-gray-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const navHoverContainer = () => {
  const Items = [
    { label: "About", para: "Meet the founder", href: "/about" },
    { label: "Security", para: "Safe, Secure, Private", href: "/security" },
    { label: "Careers", para: "Currently not hiring", href: "/careers" },
  ];

  return (
    <motion.div className="shadow-border pointer-events-none invisible absolute top-full left-1/2 z-10 mt-1 h-50 w-110 -translate-x-1/2 rounded-2xl bg-gray-100 p-2 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
      <div className="shadow-border flex h-full w-full items-center justify-center rounded-lg bg-white">
        <div className="flex h-full w-full items-center justify-center overflow-visible px-4">
          <div className="h-40 w-40 rotate-45">
            <Blob />
          </div>
        </div>

        <div className="flex h-full w-full flex-col items-start justify-between px-3 py-3">
          {Items.map(({ label, para, href }) => (
            <Link
              key={href}
              href={href}
              className="w-full p-1 text-sm text-neutral-400"
            >
              <span>{label}</span>
              <p className="text-neutral-700">{para}</p>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
