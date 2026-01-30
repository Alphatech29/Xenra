"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      
      {/* LEFT — LOGIN FORM */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900">
            Xenra
          </h1>
        </div>

        <div className="max-w-md w-full">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Log In With Email
          </h2>
          <p className="text-gray-500 mb-8">
            Please enter your email and password to access your account.
          </p>

          {/* Email */}
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-gray-900 focus:bg-white outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-gray-900 focus:bg-white outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Forgot */}
          <div className="mb-6 text-right">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-black transition">
            Log In
          </button>

          {/* Signup */}
          <p className="mt-8 text-sm text-gray-600">
            Not yet a user?{" "}
            <Link href="/auth/register" className="font-medium text-gray-900 underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT — VISUAL */}
      <div className="hidden lg:flex items-center justify-center bg-[#dbe9ec] relative">
        <div className="absolute inset-10 rounded-3xl bg-[#dbe9ec]" />
        <div className="relative z-10">
          <img
            src="/mockups/fintech-phone.png"
            alt="Xenra App Preview"
            className="w-85 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
