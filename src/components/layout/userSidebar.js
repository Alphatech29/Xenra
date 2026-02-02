"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuLayoutDashboard,
  LuChartBar,
  LuUsers,
  LuCreditCard,
  LuSettings,
  LuWallet,
} from "react-icons/lu";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LuLayoutDashboard },
    { label: "Wallet", href: "/dashboard/wallet", icon: LuWallet },
    { label: "Analytics", href: "/dashboard/analytics", icon: LuChartBar },
    { label: "Users", href: "/dashboard/users", icon: LuUsers },
    { label: "Transactions", href: "/dashboard/transactions", icon: LuCreditCard },
    { label: "Settings", href: "/dashboard/settings", icon: LuSettings },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-primary-950 border-r flex-col min-h-screen">
      {/* Logo */}
      <div className="px-6 py-4 text-xl font-bold tracking-wide text-secondary-100 border-b border-secondary-800">
        XENRA
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-1 text-sm py-5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(item.href + "/");

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-[16px] font-medium transition
                ${
                  isActive
                    ? "bg-secondary-400 text-silver-100"
                    : "text-silver-300 hover:bg-silver-200 hover:text-silver-900"
                }`}
            >
              <Icon size={18} className="text-silver-300" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
