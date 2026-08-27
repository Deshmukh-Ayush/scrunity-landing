"use client";

import React from "react";
import {
  AppWindowIcon,
  CreditCardIcon,
  ScrollIcon,
  CheckCircleIcon,
  FilesIcon,
  NotebookIcon,
  ChatCircleTextIcon,
  PulseIcon,
  GearSixIcon,
  CaretUpDownIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";
import Image from "next/image";

const MAIN_NAV = [
  { name: "Overview", icon: AppWindowIcon, isActive: true, badge: 0 },
  { name: "Payments", icon: CreditCardIcon, isActive: false, badge: 0 },
  { name: "Proposal", icon: ScrollIcon, isActive: false, badge: 0 },
  { name: "Deliverables", icon: CheckCircleIcon, isActive: false, badge: 3 },
  { name: "Files", icon: FilesIcon, isActive: false, badge: 0 },
  { name: "Contract", icon: NotebookIcon, isActive: false, badge: 0 },
];

const SECONDARY_NAV = [
  { name: "Discussions", icon: ChatCircleTextIcon, badge: 0 },
  { name: "Activity", icon: PulseIcon, badge: 1 },
  { name: "Settings", icon: GearSixIcon, badge: 0 },
];

export const HeroSidebar = () => {
  return (
    <aside
      aria-label="Project Sidebar"
      className="sticky top-0 z-10 hidden h-full w-63 shrink-0 flex-col overflow-hidden border-r border-neutral-200/70 bg-white py-2 select-none md:flex"
    >
      <div className="flex h-full w-full flex-col overflow-hidden">
        {/* Workspace Brand Header */}
        <div className="mx-1 my-1 flex h-14 shrink-0 items-center justify-between gap-2 rounded-md px-4 transition-colors hover:bg-neutral-100/60">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            {/* <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-900 text-xs font-bold text-white shadow-xs">
              S
            </div> */}
            <Image
              src="/logo/scrunity_logo_dark.png"
              alt="logo"
              height={100}
              width={100}
              className="h-9 w-9 rounded-md"
            />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-[13px] leading-tight font-semibold text-neutral-900">
                Scrunity AI
              </span>
              <span className="truncate text-[10px] leading-tight font-medium text-neutral-400">
                Workspace
              </span>
            </div>
          </div>
          <CaretUpDownIcon size={18} className="shrink-0 text-neutral-400" />
        </div>

        {/* Navigation Sections */}
        <nav className="[ScrollIconbar-width:none] flex flex-1 flex-col overflow-y-auto px-3 py-4 [-ms-overflow-style:none] [&::-webkit-ScrollIconbar]:hidden">
          {/* Main Workspace Group */}
          <div>
            <h3 className="mb-1.5 px-2.5 text-[10px] font-semibold tracking-tight text-neutral-400 uppercase">
              Workspace
            </h3>
            <ul className="space-y-0.5">
              {MAIN_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <div
                      className={`relative flex h-10 w-full items-center gap-2.5 rounded-md px-2.5 text-[14px] font-medium transition-colors ${
                        item.isActive
                          ? "bg-neutral-100/90 font-semibold text-neutral-900 shadow-xs"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0 text-neutral-500" />
                      <span className="truncate">{item.name}</span>
                      {item.badge > 0 && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-200 px-1.5 text-[10px] font-medium text-neutral-800 tabular-nums">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Secondary Group */}
          <div className="mt-6">
            <h3 className="mb-1.5 px-2.5 text-[10px] font-semibold tracking-tight text-neutral-400 uppercase">
              More
            </h3>
            <ul className="space-y-0.5">
              {SECONDARY_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <div className="flex h-10 w-full items-center gap-2.5 rounded-md px-2.5 text-[14px] font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900">
                      <Icon className="h-5 w-5 shrink-0 text-neutral-500" />
                      <span className="truncate">{item.name}</span>
                      {item.badge > 0 && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-200 px-1.5 text-[10px] font-medium text-neutral-800 tabular-nums">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Static Profile Card at Bottom */}
          <div className="mt-auto pt-4">
            <div className="flex w-full items-center gap-3 rounded-lg border border-neutral-200/60 bg-neutral-50/50 p-2 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-200 text-xs font-semibold text-neutral-700">
                AD
              </div>
              <div className="flex flex-1 flex-col truncate">
                <span className="truncate text-xs font-semibold text-neutral-900">
                  Ayush Deshmukh
                </span>
                <span className="truncate text-[10px] text-neutral-400">
                  ayush@cloff.studio
                </span>
              </div>
              <DotsThreeIcon
                size={20}
                weight="bold"
                className="shrink-0 text-neutral-400"
              />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};
