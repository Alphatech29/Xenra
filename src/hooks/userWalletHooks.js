"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const useUserWallet = () => {
  const [wallet, setWallet] = useState(null);
  const isRefreshing = useRef(false);

  const fetchWallet = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/users/wallet`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      // ✅ Success
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) return;

        const result = await res.json();
        setWallet(result.data ?? null);
        return;
      }

      // 🔁 Access token expired → refresh once
      if (res.status === 401 && !isRefreshing.current) {
        isRefreshing.current = true;

        const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        isRefreshing.current = false;

        if (refreshRes.ok) {
          // 🔁 retry wallet after refresh
          return fetchWallet();
        }

        // ❌ refresh failed → user session dead
        setWallet(null);
        console.error("Session expired. Please log in again.");
        return;
      }

      // ❌ Other errors
      console.error("Wallet request failed:", res.status);
    } catch (err) {
      console.error("Wallet fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  return {
    wallet,
    refetchWallet: fetchWallet,
  };
};

export default useUserWallet;
