"use client";
import { useEffect, useState } from "react";

const transactionsData = [
  {
    id: "1",
    type: "Credit",
    description: "Wallet Funding",
    amount: 25000,
    status: "success",
    date: "2026-02-02",
  },
  {
    id: "2",
    type: "Debit",
    description: "Crypto Purchase",
    amount: 12000,
    status: "pending",
    date: "2026-02-01",
  },
  {
    id: "3",
    type: "Debit",
    description: "Gift Card Purchase",
    amount: 5000,
    status: "failed",
    date: "2026-01-30",
  },
];

const statusStyles = {
  success: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-rose-100 text-rose-700",
};

function DirectionIcon({ type }) {
  const isCredit = type === "Credit";

  return (
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-full ${
        isCredit
          ? "bg-emerald-100 text-emerald-600"
          : "bg-zinc-200 text-zinc-700"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${isCredit ? "rotate-180" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 5v14m0 0l6-6m-6 6l-6-6"
        />
      </svg>
    </span>
  );
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-5 animate-pulse border-b border-zinc-100">
      <div className="col-span-6 flex gap-4">
        <div className="h-10 w-10 rounded-full bg-zinc-200" />
        <div>
          <div className="h-4 w-40 bg-zinc-200 rounded mb-2" />
          <div className="h-3 w-24 bg-zinc-200 rounded" />
        </div>
      </div>

      <div className="col-span-2 h-4 bg-zinc-200 rounded self-center" />
      <div className="col-span-2 h-4 bg-zinc-200 rounded self-center ml-auto" />
      <div className="col-span-2 h-6 bg-zinc-200 rounded-full self-center" />
    </div>
  );
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactions(transactionsData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full rounded-2xl border border-secondary-200 bg-silver-50 shadow-sm text-secondary-900">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 ">
        <div>
          <h2 className="text-lg font-semibold">
            Transactions
          </h2>
          <p className="text-sm text-secondary-400">
            Your recent financial activities
          </p>
        </div>

        <button className="text-sm font-medium text-primary hover:opacity-80">
          View all
        </button>
      </div>

      {/* Column labels */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 text-xs font-medium  border-b border-secondary-200">
        <div className="col-span-6">Transaction</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2 text-right">Amount</div>
        <div className="col-span-2">Status</div>
      </div>

      {/* Rows */}
      <div>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))
          : transactions.map((txn) => (
              <div
                key={txn.id}
                className="grid grid-cols-12 gap-4 px-6 py-2.5 border-b border-secondary-100 hover:bg-secondary-50 transition"
              >
                {/* Transaction */}
                <div className="col-span-6 flex items-center gap-4">
                  <DirectionIcon type={txn.type} />
                  <div>
                    <p className="font-medium">
                      {txn.description}
                    </p>
                    <p className="text-xs text-secondary-400 mt-1">
                      {new Date(txn.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Type */}
                <div
                  className={`col-span-2 font-medium ${
                    txn.type === "Credit"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {txn.type}
                </div>

                {/* Amount */}
                <div
                  className={`col-span-2 text-right font-semibold ${
                    txn.type === "Credit"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {txn.type === "Credit" ? "+" : "-"}₦
                  {txn.amount.toLocaleString()}
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[txn.status]}`}
                  >
                    {txn.status}
                  </span>
                </div>
              </div>
            ))}
      </div>

      {!loading && transactions.length === 0 && (
        <div className="py-16 text-center text-secondary-300">
          No transactions available
        </div>
      )}
    </section>
  );
}
