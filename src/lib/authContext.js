"use client";

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export function AuthProvider({ children }) {
  const isLoggingOut = useRef(false);

  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (!API_URL) {
      setError("Backend API URL not configured");
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/v1/users/user`, {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const result = await res.json();
      setUser(result.data);
    } catch (err) {
      setUser(null);
      setError("Failed to load user");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    if (isLoggingOut.current) return;
    isLoggingOut.current = true;

    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      window.location.replace("/auth/login");
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      logout,
      refetchUser: fetchUser, // 👈 VERY IMPORTANT
    }),
    [user, loading, error, logout, fetchUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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
