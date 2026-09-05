"use client";

import React, { useEffect, Suspense } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";

// Free tier safeguard note:
// PostHog free tier provides 1,000,000 events/month. Early-stage traffic will stay
// well within this limit, but revisit autocapture scope if event volume grows significantly.

function PostHogClientInit() {
  useEffect(() => {
    const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (!projectToken) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[PostHog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is not configured. Telemetry skipped.");
      }
      return;
    }

    if (!posthog.__loaded) {
      posthog.init(projectToken, {
        api_host: host,
        // Autocapture landing page CTA button clicks, pricing views, and nav interactions
        autocapture: true,
        // Manual capture for Next.js App Router client navigation
        capture_pageview: false,
        capture_pageleave: true,
        // Shared cookie domain across .scrunity.com (www.scrunity.com & app.scrunity.com)
        cross_subdomain_cookie: true,
        // Ensure shared root cookie takes precedence over stale subdomain localStorage
        __preview_cookie_wins_on_conflict: true,
        // Do NOT enable session recording / replay (separate free tier meter)
        disable_session_recording: true,
        defaults: "2026-01-30",
        debug: process.env.NODE_ENV === "development",
      });
    }
  }, []);

  return null;
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && typeof window !== "undefined") {
      let url = window.origin + pathname;
      const search = searchParams?.toString();
      if (search) {
        url += `?${search}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <PostHogClientInit />
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
