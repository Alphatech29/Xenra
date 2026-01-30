import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

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

export default function ViewsLayout({ children }) {
  return (
      <main className={`${inter.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </main>
  );
}
