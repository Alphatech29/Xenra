"use client";

import { useState } from "react";
import useUserWallet from "../../../../hooks/userWalletHooks";
import { formatNaira } from "../../../../lib/formatNaira";

/* -------------------------------------------------------------------------- */
/*                         Demo Crypto Wallet Data                             */
/* -------------------------------------------------------------------------- */

const DEMO_CRYPTO_WALLETS = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    minDeposit: "0.0001 BTC",
    warning:
      "Send only BTC to this address. Sending other assets may result in permanent loss.",
  },
  {
    name: "USDT",
    symbol: "USDT",
    network: "TRC20",
    address: "TQ7Zc4X7b7A3R4xK9j9H6R5nQ3wJdE5mYF",
    minDeposit: "10 USDT",
    warning:
      "Only send USDT via TRC20 network. Sending via another network may cause loss.",
  },
];

/* -------------------------------------------------------------------------- */
/*                               Page                                         */
/* -------------------------------------------------------------------------- */

export default function WalletPage() {
  const [copied, setCopied] = useState("");
  const { wallet } = useUserWallet();

  const balance = wallet?.available_balance ?? 0;

  const cryptoWallets =
    wallet?.cryptoWallets && wallet.cryptoWallets.length > 0
      ? wallet.cryptoWallets
      : DEMO_CRYPTO_WALLETS;

  const copy = async (value, key) => {
    if (!value || typeof window === "undefined") return;

    await navigator.clipboard.writeText(value);
    setCopied(key);

    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <header className="mb-3">
        <h1 className="text-2xl font-bold text-secondary-900">
          Wallet Overview
        </h1>
      </header>

      {/* Balance & Bank */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Balance */}
        <div className="rounded-2xl bg-linear-to-br from-secondary-700 to-primary-900 p-6 text-silver-50 shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-80">Available Balance</p>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-100">
              {wallet?.status ?? "Active"}
            </span>
          </div>

          <h2 className="mt-2 text-3xl font-bold">
           <span className="text-lg font-semibold">₦</span>{formatNaira(balance)}
          </h2>

          <p className="mt-1 text-xs opacity-70">
            Updated {wallet?.lastUpdated ?? "—"}
          </p>

          <div className="mt-6 flex gap-4">
            <button className="rounded-lg bg-white px-4 py-1.5 font-medium text-primary-700 hover:bg-secondary-100">
              Fund Wallet
            </button>
            <button className="rounded-lg border border-white px-4 py-1.5 font-medium text-white transition hover:bg-primary-300">
              Withdraw
            </button>
          </div>
        </div>

        {/* Bank Transfer */}
        <div className="rounded-2xl bg-silver-50 p-4 text-secondary-900 shadow">
          <div className="flex items-center justify-between">
            <h3 className="mb-4 text-lg font-semibold">
              Bank Transfer Deposit
            </h3>
            <button
              onClick={() =>
                copy(wallet?.bank?.accountNumber, "bank")
              }
              className="rounded-md bg-primary-900 px-3 py-1.5 text-xs font-medium text-secondary-100"
            >
              {copied === "bank" ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 text-sm">
            <InfoRow label="Bank" value={wallet?.bank?.name} />
            <InfoRow
              label="Account Name"
              value={wallet?.bank?.accountName}
            />

            <div className="mt-2 flex items-center justify-between">
              <span className="text-secondary-500">
                Account Number
              </span>
              <span className="font-mono text-sm font-semibold">
                {wallet?.bank?.accountNumber ?? "—"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Wallets */}
      <section className="mt-5">
        <h2 className="mb-4 text-xl font-semibold text-secondary-900">
          Crypto Deposit Wallets
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {cryptoWallets.map((crypto) => (
            <div
              key={crypto.symbol}
              className="rounded-2xl bg-silver-50 p-4 shadow"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-secondary-600">
                  {crypto.name}
                </h3>
                <span className="rounded bg-secondary-600 px-2 py-1 text-xs text-white">
                  {crypto.symbol}
                </span>
              </div>

              <p className="mb-2 text-xs text-secondary-900">
                Network: {crypto.network}
              </p>

              <div className="break-all rounded bg-secondary-100 p-3 font-mono text-xs text-primary-950">
                {crypto.address}
              </div>

              <div className="mt-2 rounded-lg bg-red-50 p-2 text-xs text-red-600">
                ⚠️ {crypto.warning}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-secondary-900">
                  Min deposit: {crypto.minDeposit}
                </p>
                <button
                  onClick={() =>
                    copy(crypto.address, crypto.symbol)
                  }
                  className="rounded-md bg-primary-900 px-3 py-1.5 text-sm font-medium text-secondary-100"
                >
                  {copied === crypto.symbol
                    ? "Copied"
                    : "Copy Address"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Components                                   */
/* -------------------------------------------------------------------------- */

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-secondary-500">{label}</span>
      <span className="font-medium">{value ?? "—"}</span>
    </div>
  );
}
