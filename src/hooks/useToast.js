"use client";

import { toast } from "sonner";
import { useCallback, useMemo } from "react";

export default function useToast() {
  const success = useCallback((message) => {
    toast.success(message);
  }, []);

  const error = useCallback((message) => {
    toast.error(message);
  }, []);

  const info = useCallback((message) => {
    toast(message);
  }, []);

  const warning = useCallback((message) => {
    toast.warning(message);
  }, []);

  const loading = useCallback((message) => {
    toast.loading(message);
  }, []);

  return useMemo(
    () => ({ success, error, info, warning, loading }),
    [success, error, info, warning, loading]
  );
}
