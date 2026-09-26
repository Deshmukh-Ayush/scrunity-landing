import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { Callout } from "./callout";
import { Card1 } from "@/components/how-it-works/card-1";
import { Card2 } from "@/components/how-it-works/card-2";
import { Card3 } from "@/components/how-it-works/card-3";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export const mdxComponents = {
  h1: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === "string" ? children : "";
    const id = slugify(text);
    return (
      <h1
        id={id}
        className={cn(
          "mt-10 mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl",
          className,
        )}
        {...props}
      >
        {children}
      </h1>
    );
  },

  h2: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === "string" ? children : "";
    const id = slugify(text);
    return (
      <h2
        id={id}
        className={cn(
          "group mt-12 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2.5 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl",
          className,
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>
        {id && (
          <a
            href={`#${id}`}
            aria-label={`Link to ${text}`}
            className="text-neutral-300 opacity-0 transition-opacity hover:text-blue-600 group-hover:opacity-100"
          >
            #
          </a>
        )}
      </h2>
    );
  },

  h3: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === "string" ? children : "";
    const id = slugify(text);
    return (
      <h3
        id={id}
        className={cn(
          "mt-8 mb-3 text-xl font-semibold tracking-tight text-neutral-800 md:text-2xl",
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },

  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "mb-6 text-[16px] leading-[1.8] font-normal tracking-[-0.01em] text-neutral-600",
        className,
      )}
      {...props}
    />
  ),

  a: ({
    className,
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && (href.startsWith("/") || href.startsWith("#"));

    if (isInternal) {
      return (
        <Link
          href={href || "#"}
          className={cn(
            "font-medium text-blue-600 underline decoration-blue-300 underline-offset-4 transition-colors hover:text-blue-800 hover:decoration-blue-600",
            className,
          )}
          {...props}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "font-medium text-blue-600 underline decoration-blue-300 underline-offset-4 transition-colors hover:text-blue-800 hover:decoration-blue-600",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },

  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        "my-6 ml-6 list-disc space-y-2 leading-relaxed text-neutral-600 marker:text-neutral-400",
        className,
      )}
      {...props}
    />
  ),

  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "my-6 ml-6 list-decimal space-y-2 leading-relaxed text-neutral-600 marker:font-mono marker:text-xs marker:text-neutral-400",
        className,
      )}
      {...props}
    />
  ),

  li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li
      className={cn("pl-1 text-[16px] leading-relaxed text-neutral-600", className)}
      {...props}
    />
  ),

  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "my-6 rounded-r-lg border-l-2 border-neutral-900 bg-neutral-100/60 py-2.5 pr-4 pl-4 text-base italic leading-relaxed text-neutral-700 shadow-xs",
        className,
      )}
      {...props}
    />
  ),

  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn("my-10 border-t border-gray-200", className)} {...props} />
  ),

  table: ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-hidden overflow-x-auto rounded-[12px] border border-gray-200 shadow-xs">
      <table
        className={cn("w-full border-collapse text-left text-sm", className)}
        {...props}
      />
    </div>
  ),

  th: ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border-b border-gray-200 bg-gray-50/80 px-4 py-3 font-semibold text-neutral-900",
        className,
      )}
      {...props}
    />
  ),

  td: ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn("border-b border-gray-100 px-4 py-3 text-neutral-600", className)}
      {...props}
    />
  ),

  pre: CodeBlock,

  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "rounded-md border border-gray-200 bg-gray-100/80 px-1.5 py-0.5 font-mono text-[13px] font-medium text-neutral-800",
        className,
      )}
      {...props}
    />
  ),

  img: ({
    className,
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="my-8 block overflow-hidden rounded-2xl border border-gray-200 bg-neutral-950/5 shadow-xs">
      <img
        src={src}
        alt={alt || "Blog image"}
        className={cn("h-auto w-full object-cover", className)}
        loading="lazy"
        {...props}
      />
      {alt && (
        <span className="block border-t border-gray-100 bg-white/70 px-4 py-2 text-center text-xs text-neutral-500">
          {alt}
        </span>
      )}
    </span>
  ),

  // Custom MDX Components
  Callout,
  Card1,
  Card2,
  Card3,
};
