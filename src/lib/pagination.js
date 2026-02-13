"use client";

import { useMemo, useCallback } from "react";

export default function Pagination({
  currentPage,
  totalPages = 1,
  onPageChange,
}) {
  const FIXED_ITEMS = 10;

  if (totalPages <= 1) return null;

  const pages = useMemo(() => {
    const items = [];
    let id = 0;
    const add = (v) => items.push({ id: id++, value: v });

    // If total pages are 10 or less, show all
    if (totalPages <= FIXED_ITEMS) {
      for (let i = 1; i <= totalPages; i++) add(i);
      return items;
    }

    /**
     * Layout (always 10 items):
     * [1] […] [window pages] […] [last]
     *
     * Slots:
     * 1 (first)
     * 1 (left ellipsis)
     * 6 (window)
     * 1 (right ellipsis)
     * 1 (last)
     */

    const WINDOW_SIZE = 6;
    const HALF = Math.floor(WINDOW_SIZE / 2);

    let start = currentPage - HALF;
    let end = currentPage + HALF - 1;

    // Clamp window
    if (start < 2) {
      start = 2;
      end = start + WINDOW_SIZE - 1;
    }

    if (end > totalPages - 1) {
      end = totalPages - 1;
      start = end - WINDOW_SIZE + 1;
    }

    // First page
    add(1);

    // Left ellipsis
    if (start > 2) add("...");

    // Window pages
    for (let i = start; i <= end; i++) {
      add(i);
    }

    // Right ellipsis
    if (end < totalPages - 1) add("...");

    // Last page
    add(totalPages);

    return items;
  }, [currentPage, totalPages]);

  const changePage = useCallback(
    (page) => {
      if (
        typeof page !== "number" ||
        page < 1 ||
        page > totalPages ||
        page === currentPage
      )
        return;

      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentPage, totalPages, onPageChange]
  );

  return (
    <div className="flex justify-end mt-6">
      <nav
        className="flex items-center gap-2 bg-silver-100 px-3 py-2 rounded-md"
        aria-label="Pagination"
      >
        {/* Previous */}
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-secondary-900 text-sm rounded border border-secondary-600 text-secondary-300
                     disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Pages */}
        {pages.map(({ id, value }) =>
          value === "..." ? (
            <span key={id} className="px-2 text-secondary-400">
              …
            </span>
          ) : (
            <button
              key={id}
              onClick={() => changePage(value)}
              aria-current={value === currentPage ? "page" : undefined}
              className={`px-3 py-1 text-sm rounded border transition
                ${
                  value === currentPage
                    ? "bg-secondary-600 text-secondary-100 border-primary-300"
                    : "border-secondary-600 text-primary-950 hover:bg-primary-300"
                }`}
            >
              {value}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 bg-secondary-900 py-1 text-sm rounded border border-secondary-600 text-secondary-300
                     disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
