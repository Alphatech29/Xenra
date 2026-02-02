"use client";

import { Toaster } from "sonner";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
      />
    </>
  );
}
