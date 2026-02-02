"use client";

import { createContext, useContext, useCallback, useMemo } from "react";

const AuthContext = createContext(null);
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export function AuthProvider({ children }) {
  const logout = useCallback(async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // Hard navigation ensures middleware runs
      window.location.href = "/auth/login";
    }
  }, []);

  const value = useMemo(
    () => ({
      logout,
    }),
    [logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
