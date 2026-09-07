"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  GithubLogoIcon,
  XLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import {
  PRODUCT_LINKS,
  RESOURCE_LINKS,
  COMPANY_LINKS,
  LEGAL_LINKS,
} from "./data";
import { NewsletterCard } from "./newsletter-card";

export const Footer = () => {
  return (
    <footer className="w-full py-16">
      {/* Top Grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Brand & Vision Column (4 cols) */}
        <div className="flex flex-col justify-between lg:col-span-4">
          <div className="space-y-4">
            {/* Logo Row */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo/scrunity_svg.svg"
                alt="Scrunity Logo"
                width={113}
                height={188}
                className="h-auto w-3.5"
              />
              <span className="text-xl font-semibold tracking-tight text-neutral-900">
                Scrunity
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-neutral-500 text-pretty">
              The client collaboration and revenue protection workspace for
              modern agencies and freelancers. Contracts, deliverables, and
              milestone payouts without scope creep.
            </p>
          </div>

          {/* System Status Pill (Concentric border radius: 16px outer, 4px pad, 12px inner) */}
          <div className="mt-8 flex items-center">
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100/70 p-0.5 shadow-xs select-none">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-neutral-700">
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Navigation (5 cols) */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          {/* Product */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-neutral-900 uppercase">
              Product
            </p>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-neutral-500 transition-colors duration-150 hover:text-neutral-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-neutral-900 uppercase">
              Resources
            </p>
            <ul className="space-y-2.5">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-neutral-500 transition-colors duration-150 hover:text-neutral-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-neutral-900 uppercase">
              Company
            </p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-neutral-500 transition-colors duration-150 hover:text-neutral-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stay Informed Newsletter Card (3 cols) */}
        <div className="lg:col-span-3">
          <NewsletterCard />
        </div>
      </div>

      {/* Bottom Legal & Social Strip */}
      <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-200/80 pt-8 sm:flex-row">
        {/* Copyright */}
        <p className="text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} Scrunity Inc. All rights reserved.
        </p>

        {/* Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-neutral-500 transition-colors duration-150 hover:text-neutral-800"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Icons with Tactile Feedback (0.96 scale on tap) */}
        <div className="flex items-center gap-2">
          <Link
            href="https://x.com/scrunity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scrunity on X (formerly Twitter)"
          >
            <motion.div
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="flex size-8 items-center justify-center rounded-full border border-gray-200 bg-white text-neutral-600 shadow-xs transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-neutral-900"
            >
              <XLogoIcon weight="bold" className="size-3.5" />
            </motion.div>
          </Link>

          <Link
            href="https://github.com/scrunity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scrunity on GitHub"
          >
            <motion.div
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="flex size-8 items-center justify-center rounded-full border border-gray-200 bg-white text-neutral-600 shadow-xs transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-neutral-900"
            >
              <GithubLogoIcon weight="bold" className="size-3.5" />
            </motion.div>
          </Link>

          <Link
            href="https://linkedin.com/company/scrunity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scrunity on LinkedIn"
          >
            <motion.div
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="flex size-8 items-center justify-center rounded-full border border-gray-200 bg-white text-neutral-600 shadow-xs transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-neutral-900"
            >
              <LinkedinLogoIcon weight="bold" className="size-3.5" />
            </motion.div>
          </Link>
        </div>
      </div>
    </footer>
  );
};
