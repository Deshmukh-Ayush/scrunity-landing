"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Separator } from "../ui/separator";

export const Navbar = () => {
  const navItems = [
    { label: "Product", href: "/product" },
    { label: "Resources", href: "/resources" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="shadow-border h-16 w-full bg-gray-100 px-8">
      <div className="h-full w-full px-18">
        <div className="flex h-full w-full items-center justify-between">
          {/* logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo/scrunity_svg.svg"
              alt="Scrunity Logo"
              width={100}
              height={100}
              className="h-auto w-3"
            />
            <span className="text-xl font-semibold">Scrunity</span>
          </div>

          {/* navigations */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {navItems.map((item, index) => (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-medium text-neutral-700 transition-colors duration-200 ease-in-out hover:bg-gray-200"
                  >
                    {item.label}
                  </Link>
                  {index == 1 && navHoverContainer()}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <Separator orientation="vertical" />
              <Link
                href="/login"
                className="flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-medium text-neutral-700 transition-colors duration-200 ease-in-out hover:bg-neutral-200"
              >
                Log in
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center rounded-full bg-neutral-800 px-3 py-1 text-[13px] font-medium text-neutral-100"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const navHoverContainer = () => {
  const Items = [
    {
      label: "About",
      para: "Meet the founder",
      href: "/about",
    },
    {
      label: "Security",
      para: "Safe, Secure, Private",
      href: "/security",
    },
    {
      label: "Careers",
      para: "I'm hiring",
      href: "/careers",
    },
  ];
  return (
    <div className="shadow-border pointer-events-none invisible absolute top-full left-1/2 z-10 mt-1 h-50 w-110 -translate-x-1/2 rounded-2xl bg-gray-100 p-2 opacity-0 transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
      <div className="shadow-border flex h-full w-full items-center justify-center rounded-lg bg-white">
        <div className="h-full w-full"></div>
        <div className="flex h-full w-full flex-col items-start justify-between px-3 py-3">
          {Items.map(({ label, para, href }) => (
            <Link key={href} href={href} className="text-sm text-neutral-400">
              <span>{label}</span>
              <p className="text-neutral-700">{para}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
