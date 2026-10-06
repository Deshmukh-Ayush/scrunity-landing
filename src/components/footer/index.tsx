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
import { LEGAL_LINKS } from "./data";
import { NewsletterCard } from "./newsletter-card";

export const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-1">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col justify-between gap-8 md:max-w-sm">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-85"
            >
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

            <p className="max-w-sm text-sm leading-relaxed text-pretty text-neutral-500">
              The autonomous outbound sales engine. Domain research,
              verified decision-maker discovery, contextual cold outreach, and
              calendar meeting conversion.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-[11px] text-neutral-600">
                <span className="font-sans text-[10px] text-neutral-400 font-medium">Udyam Registration:</span>
                UDYAM-MP-10-0184513
              </span>
            </div>
          </div>

          <div className="flex items-center">
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

        <div className="w-full max-w-[320px] md:ml-auto">
          <NewsletterCard />
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-gray-200/80 pt-8 sm:flex-row sm:items-center">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} Scrunity AI Inc. All rights reserved.
          </p>
          <span className="hidden sm:inline text-neutral-300">·</span>
          <span className="font-mono text-[11px] text-neutral-500">
            Udyam: <span className="text-neutral-700 font-medium">UDYAM-MP-10-0184513</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
