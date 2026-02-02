// hooks/useLogin.js
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
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      //  Log HTTP status
      console.log("Backend response status:", res.status);

      const result = await res.json();

      //  Log response body
      console.log("Backend response body:", result);

      if (!res.ok || result.success === false) {
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
