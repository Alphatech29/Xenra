"use client";

import { useState } from "react";

const menuItems = [
  "Electricity Bill",
  "Cable TV",
  "Fund Betting Account",
];

export default function UtilityPage() {
  const [activeMenu, setActiveMenu] = useState("Buy and Sell Airtime");
  const [action, setAction] = useState(null);

  return (
    <div className="min-h-screen ">
      {/* Top Header */}
      <header className="bg-secondary-100 border-b border-primary-400">
        <div className="px-4 py-4">
          <nav className="flex gap-4">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveMenu(item);
                  setAction(null);
                }}
                className={`pb-2 text-sm font-medium transition
                  ${
                    activeMenu === item
                      ? "text-primary-50 border-b-2 border-silver-50 bg-secondary-500 p-2 rounded-md"
                      : "text-secondary-500 border-b-2 border-silver-50 p-2 rounded-md hover:bg-primary-200"
                  }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-12">
        <h1 className="text-lg font-semibold text-slate-800 mb-1">
          {activeMenu}
        </h1>

        {activeMenu === "Electricity Bill" && (
          <>
            <p className="text-slate-500 mb-8">I want to?</p>

            <div className="flex gap-8">
              {/* Electricity Bill */}
              <div
                onClick={() => setAction("buy")}
                className={`w-[380px] cursor-pointer rounded-2xl bg-white p-8 border shadow-sm transition
                  ${
                    action === "buy"
                      ? "border-blue-600"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
                    📱
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-center mb-2">
                  Buy Airtime
                </h3>

                <p className="text-sm text-slate-500 text-center leading-relaxed">
                  Never run out of airtime and data. Buy all networks with ease
                  on prestmit.
                </p>
              </div>


            </div>
          </>
        )}

        {/* Other Menu Pages */}
        {activeMenu !== "Buy and Sell Airtime" && (
          <div className="mt-16 text-slate-400 text-sm">
            {activeMenu} feature UI goes here.
          </div>
        )}
      </main>
    </div>
  );
}
