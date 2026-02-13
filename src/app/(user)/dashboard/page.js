"use client";

import Link from "next/link";
import { FiDownload, FiSend } from "react-icons/fi";
import { TfiExchangeVertical } from "react-icons/tfi";
import { RiBtcFill, RiSimCardFill } from "react-icons/ri";
import { HiMiniShoppingBag } from "react-icons/hi2";
import TransactionHistory from "../../../components/ui/transactionHistory";
import useUserWallet from "../../../hooks/userWalletHooks";
import { useAuth } from "../../../lib/authContext";
import { formatNaira } from "../../../lib/formatNaira";

export default function DashboardPage() {
  const { wallet } = useUserWallet();
  const { user } = useAuth();

  // Safely extract balance
  const balance = wallet?.available_balance ?? 0;

  return (
    <main className="flex min-h-screen">
      {/* Main Area */}
      <div className="flex-1 flex flex-col p-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-secondary-900">
            Welcome back,
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {user?.username}! Here's your wallet overview.
          </p>
        </div>
        <div className="flex justify-center items-center space-x-5">
          <div className="bg-silver-50 h-52 w-full rounded-xl p-6 shadow-sm flex flex-col justify-between">
            {/* Content */}
            <div className="flex flex-col items-start justify-center flex-1 text-secondary-900">
              <p className="text-xs font-semibold tracking-wide text-secondary-900 mb-2">
                Available Balance
              </p>

              <div className="flex text-right items-baseline gap-1">
                <span className="text-lg font-semibold">₦</span>
                <span className="text-3xl font-bold">
                  {formatNaira(balance)}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              {/* Deposit */}
              <Link
                href="/dashboard/wallet"
                className="flex items-center justify-between gap-3 rounded-lg border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-secondary-900 transition hover:bg-primary-200 hover:text-primary-950"
              >
                Deposit Funds
                <FiDownload className="text-base" />
              </Link>

              {/* Send */}
              <Link
                href="/dashboard/wallet"
                className="flex items-center justify-between gap-3 rounded-lg border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-secondary-900 transition hover:bg-primary-200 hover:text-primary-950"
              >
                Send Funds
                <FiSend className="text-base" />
              </Link>
              <Link
                href="/dashboard/convert"
                className="flex items-center justify-between gap-3 rounded-lg border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-secondary-900 transition hover:bg-primary-200 hover:text-primary-950"
              >
                Convert
                <TfiExchangeVertical className="text-base" />
              </Link>
            </div>
          </div>

          <div className=" h-52 w-full space-y-3.5">
            <div className="flex items-center bg-secondary-500/30 justify-start gap-3 rounded-lg border border-primary-200  px-4 py-3 text-sm font-medium text-secondary-900 transition ">
              <RiBtcFill className="text-[35px] text-secondary-100 bg-secondary-500 rounded-full p-2" />
              <Link href="/dashboard/cryprto">Trade Crypto Currency</Link>
            </div>
            <div className="flex items-center bg-primary-200/30 justify-start gap-3 rounded-lg border border-primary-200  px-4 py-3 text-sm font-medium text-secondary-900 transition ">
              <HiMiniShoppingBag className="text-[35px] text-secondary-100 bg-primary-900 rounded-full p-2" />
              <Link href="/dashboard/buy-gift-cards">Buy Gift Cards</Link>
            </div>
            <div className="flex items-center bg-green-200/30 justify-start gap-3 rounded-lg border border-primary-200  px-4 py-3 text-sm font-medium text-secondary-900 transition ">
              <HiMiniShoppingBag className="text-[35px] text-secondary-100 bg-green-600 rounded-full p-2" />
              <Link href="/dashboard/sell-gift-cards">Sell Gift Cards</Link>
            </div>
          </div>
        </div>
        <div>
          <div className="flex w-full justify-center items-center gap-3">
            <div className="flex w-full items-center bg-secondary-500/30 justify-start gap-3 rounded-lg border border-primary-200  px-4 py-3 text-sm font-medium text-secondary-900 transition ">
              <RiSimCardFill className="text-[35px] text-secondary-100 bg-secondary-500 rounded-full p-2" />
              <Link href="/dashboard/cryprto">e-SIM</Link>
            </div>
            <div className="flex w-full items-center bg-secondary-500/30 justify-start gap-3 rounded-lg border border-primary-200  px-4 py-3 text-sm font-medium text-secondary-900 transition ">
              <RiSimCardFill className="text-[35px] text-secondary-100 bg-secondary-500 rounded-full p-2" />
              <Link href="/dashboard/bills">Bills</Link>
            </div>
            <div className="flex w-full items-center bg-secondary-500/30 justify-start gap-3 rounded-lg border border-primary-200  px-4 py-3 text-sm font-medium text-secondary-900 transition ">
              <RiSimCardFill className="text-[35px] text-secondary-100 bg-secondary-500 rounded-full p-2" />
              <Link href="/dashboard/cryprto">e-SIM</Link>
            </div>
          </div>
        </div>
        <TransactionHistory />
      </div>
    </main>
  );
}
