"use client";

import { useAuth } from "../../lib/authContext";
import Sidebar from "../../components/layout/userSidebar";
import Header from "../../components/layout/userHearder";
import UserPreloader from "../../components/ui/userPreloader";

export default function PrivateLayout({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Sidebar (Fixed) */}
      <aside className="fixed top-0 left-0 h-screen w-64">
        <Sidebar />
      </aside>

      {/* Header (Fixed) */}
      <header className="fixed top-0 left-64 right-0 ">
        <Header />
      </header>
      {/* Main Content Area (Scrollable) */}
      <div className="md:ml-64 min-h-screen overflow-y-auto bg-secondary-50 mt-16">
        <UserPreloader />
        {children}
      </div>
    </main>
  );
}
