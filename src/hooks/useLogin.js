// hooks/useLogin.js
"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);

  const login = async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMessage(null);
    setData(null);

    try {
      const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      console.log("Login HTTP status:", res.status);

      // Protect against non-JSON responses
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid server response");
      }

      const result = await res.json();
      console.log("Login response body:", result);

      if (!res.ok || result.success !== true) {
        setError(result.error || "Login failed");
        return null;
      }

      setSuccess(true);
      setMessage(result.message);
      setData(result.user);

      return result;
    } catch (err) {
      console.error("Login request error:", err);
      setError("Network error. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    success,
    error,
    message,
    data,
  };
}
