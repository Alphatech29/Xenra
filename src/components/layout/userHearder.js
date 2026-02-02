"use client";

import Image from "next/image";
import { FaBell, FaSearch } from "react-icons/fa";


export default function Header() {
  return (
    <header className="w-full h-16 bg-secondary-100 border-b border-gray-200 px-6 flex items-center justify-between ">

      {/* Left: Logo & Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-gray-900">
          Dashboard
        </h1>
      </div>



      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-6">

        {/* Notification Icon */}
        <button className="relative text-gray-600 hover:text-gray-900 transition">
          <FaBell className="text-lg" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center cursor-pointer">

          <Image
            src="/avatar.jpg"
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>

      </div>
    </header>
  );
}
