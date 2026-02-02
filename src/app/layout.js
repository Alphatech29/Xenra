import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "../providers/toastProvider";
import { AuthProvider } from "../lib/authContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Xenra - Global Digital Financial Services",
  description:
    "Digital financial services platform providing secure solutions for global transactions, gift card trading, and cryptocurrency exchange.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
