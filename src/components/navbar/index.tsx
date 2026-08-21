"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Separator } from "../ui/separator";

export const Navbar = () => {
  const [activeHover, setActiveHover] = useState<
    "product" | "resources" | null
  >(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openHover = (type: "product" | "resources") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveHover(type);
  };

  const closeHover = () => {
    closeTimer.current = setTimeout(() => setActiveHover(null), 120);
  };

  const navItems = [
    { label: "Product", href: "/product" },
    { label: "Resources", href: "/resources" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <div className="h-16 w-full bg-gray-100 px-8">
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
                <div
                  key={item.href}
                  className="group relative"
                  onMouseEnter={() => {
                    if (index === 0) openHover("product");
                    if (index === 1) openHover("resources");
                  }}
                  onMouseLeave={index < 2 ? closeHover : undefined}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-center rounded-full px-3 py-1 text-[13px] font-medium text-neutral-700 transition-colors duration-200 ease-in-out hover:bg-neutral-200"
                  >
                    {item.label}
                  </Link>
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
            <NavHoverContainer
              type={activeHover}
              openHover={openHover}
              closeHover={closeHover}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const NavHoverContainer = ({
  type,
  openHover,
  closeHover,
}: {
  type: "product" | "resources" | null;
  openHover: (type: "product" | "resources") => void;
  closeHover: () => void;
}) => {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: type ? 1 : 0, y: type ? 0 : -8 }}
      className="pointer-events-none fixed top-14 left-1/2 z-10 h-42 w-160 -translate-x-1/2 overflow-hidden rounded-2xl bg-neutral-200 p-2"
      onMouseEnter={() => type && openHover(type)}
      onMouseLeave={closeHover}
      style={{ pointerEvents: type ? "auto" : "none" }}
    >
      {type && <HoverContent type={type} />}
    </motion.div>
  );
};

const HoverContent = ({ type }: { type: "product" | "resources" }) => {
  return (
    <motion.div
      key={type}
      initial={{ x: type === "product" ? "-100%" : "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`h-full w-full ${type === "product" ? "bg-blue-500" : "bg-red-500"}`}
    >
      shows when {type} is hovered
    </motion.div>
  );
};
