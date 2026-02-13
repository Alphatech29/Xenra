"use client";

import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {useAuth} from "../../lib/authContext";

function formatTitle(pathname) {
  if (!pathname) return "Dashboard";

  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  return lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Header({ title }) {
  const pathname = usePathname();
  const autoTitle = formatTitle(pathname);
   const { logout } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const handleLogout = () => {
    logout(); // async handled internally
  };

  return (
    <header className="w-full h-16 bg-secondary-50 border-b border-secondary-300 px-6 flex items-center justify-between">
      
      {/* Left: Title */}
      <h1 className="text-lg font-semibold text-gray-900">
        {title || autoTitle}
      </h1>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        
        {/* Notification */}
        <button className="relative text-gray-600 hover:text-gray-900 transition">
          <FaBell className="text-lg" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <button onClick={() => setOpen(!open)}>
          <Image
            src="/images/avatar.jpg"
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full cursor-pointer"
            priority
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-[-9] top-14 w-48 bg-silver-50 border border-secondary-100 rounded-md shadow-lg z-50">
            <ul className="py-2 text-sm text-primary-950">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li className="border-t my-1" />
              <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
