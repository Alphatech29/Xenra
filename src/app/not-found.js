"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-6">
      <div className="max-w-md text-center">
        <p className="text-sm uppercase tracking-widest text-gray-400">
          Error 404
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Page not found
        </h1>

        <p className="mt-4 text-gray-400">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200 transition"
          >
            Go to homepage
          </Link>

          <Link
            href="/auth/login"
            className="rounded-md border border-gray-700 px-6 py-3 text-sm font-semibold hover:bg-gray-800 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
