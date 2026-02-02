"use client";

import { useState } from "react";
import { FaWallet, FaArrowUp, FaArrowDown, FaPlus } from "react-icons/fa";

export default function WalletPage() {
  const [balance] = useState(12500.75);

  const transactions = [
    { id: 1, type: "credit", title: "Payment Received", amount: 2500, date: "Feb 1, 2026" },
    { id: 2, type: "debit", title: "Online Purchase", amount: 1200, date: "Jan 30, 2026" },
    { id: 3, type: "debit", title: "Transfer", amount: 800, date: "Jan 28, 2026" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 to-slate-900 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600/20">
              <FaWallet className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Wallet</h1>
              <p className="text-sm text-slate-400">Digital wallet overview</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition">
            <FaPlus className="w-4 h-4" /> Fund Wallet
          </button>
        </div>

        {/* Balance */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm text-slate-400">Available Balance</p>
            <h2 className="text-4xl font-bold">₦{balance.toLocaleString()}</h2>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
              <FaArrowUp className="w-4 h-4" /> Send
            </button>
            <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
              <FaArrowDown className="w-4 h-4" /> Receive
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      tx.type === "credit"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {tx.type === "credit" ? (
                      <FaArrowDown className="w-4 h-4" />
                    ) : (
                      <FaArrowUp className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.title}</p>
                    <p className="text-xs text-slate-400">{tx.date}</p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    tx.type === "credit" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
