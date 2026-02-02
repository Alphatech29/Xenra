// hooks/useRegister.js
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);

  const register = async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMessage(null);
    setData(null);

    try {
      const res = await fetch(`${API_URL}/auth/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || result.success === false) {
        setError(result.error || "Registration failed");
        return null;
      }

      setSuccess(true);
      setMessage(result.message);
      setData(result.data);

      return result;
    } catch (err) {
      setError("Network error. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    success,
    error,
    message,
    data,
  };
}
