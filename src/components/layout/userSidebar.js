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
  LuSmartphone,
} from "react-icons/lu";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LuLayoutDashboard },
    { label: "Wallet", href: "/dashboard/wallet", icon: LuWallet },
    { label: "Analytics", href: "/dashboard/analytics", icon: LuChartBar },
    { label: "Users", href: "/dashboard/users", icon: LuUsers },
    {
      label: "Telecom Recharge",
      href: "/dashboard/telecom",
      icon: LuSmartphone,
    },
    {
      label: "Transactions",
      href: "/dashboard/transactions",
      icon: LuCreditCard,
    },
    { label: "Settings", href: "/dashboard/settings", icon: LuSettings },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-primary-50 flex-col min-h-screen border-r border-secondary-300">
      {/* Logo */}
      <div className="px-6 py-4.25 text-xl font-bold tracking-wide text-secondary-500 border-b border-secondary-300">
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
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-[15px] font-medium transition
                ${
                  isActive
                    ? "bg-primary-200 text-primary-900"
                    : "text-secondary-500 hover:bg-secondary-200 hover:text-secondary-900"
                }`}
            >
              <Icon size={18} className="text-secondary-500" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
