"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { BlogItem } from "@/utils/mdx";

const CATEGORIES = [
  "All",
  "Community",
  "News",
  "Craft",
  "Engineering",
  "Press",
];

const FALLBACK_IMAGES = [
  "/images/blog-grad-1.png",
  "/images/blog-grad-2.png",
  "/images/blog-grad-3.png",
];

export function BlogList({ posts }: { posts: BlogItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    for (const post of posts) {
      counts[post.category] = (counts[post.category] ?? 0) + 1;
    }
    return counts;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" ||
        post.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        search.trim() === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, search]);

  return (
    <div className="w-full">
      {/* Desktop Filter Sidebar - Pulled out and placed beside the container */}
      <aside className="pointer-events-none absolute right-full top-0 bottom-0 hidden w-48 mr-6 2xl:mr-10 2xl:w-52 xl:block">
        <div className="pointer-events-auto sticky top-28 pt-40 flex flex-col gap-6">
          <div className="relative">
            <MagnifyingGlassIcon
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pr-3 pl-9 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-gray-300 focus:ring-0 focus:outline-none shadow-2xs"
            />
          </div>

          <nav className="flex flex-col gap-1">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count = categoryCounts[category] ?? 0;
              const isDisabled = category !== "All" && count === 0;

              return (
                <button
                  key={category}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => !isDisabled && setActiveCategory(category)}
                  className={[
                    "rounded-lg px-3 py-1.5 text-left text-sm transition-colors duration-150",
                    isActive
                      ? "bg-gray-100 font-medium text-neutral-900"
                      : isDisabled
                        ? "cursor-not-allowed text-neutral-300"
                        : "text-neutral-500 hover:text-neutral-900",
                  ].join(" ")}
                >
                  {category}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile/Tablet Filter Bar (< xl) */}
      <div className="flex flex-col gap-3 pb-8 xl:hidden">
        <div className="relative">
          <MagnifyingGlassIcon
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pr-3 pl-9 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-gray-300 focus:ring-0 focus:outline-none"
          />
        </div>

        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count = categoryCounts[category] ?? 0;
            const isDisabled = category !== "All" && count === 0;

            return (
              <button
                key={category}
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && setActiveCategory(category)}
                className={[
                  "shrink-0 rounded-lg px-3 py-1.5 text-left text-sm transition-colors duration-150",
                  isActive
                    ? "bg-gray-100 font-medium text-neutral-900"
                    : isDisabled
                      ? "cursor-not-allowed text-neutral-300"
                      : "text-neutral-500 hover:text-neutral-900",
                ].join(" ")}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-14">
        {filteredPosts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-950">
              <Image
                src={post.image ?? FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(min-width: 768px) 60vw, 100vw"
                priority={i === 0}
              />
            </div>

            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 tabular-nums">
                <span>{post.date}</span>
                <span>·</span>
                <span className="text-neutral-500">{post.category}</span>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 transition-colors duration-150 group-hover:text-blue-600">
                {post.title}
              </h3>

              <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
                {post.description}
              </p>
            </div>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <p className="text-sm font-medium text-neutral-600">
              No articles found.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearch("");
              }}
              className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
            >
              View all articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
