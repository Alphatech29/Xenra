import "../globals.css";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      {children}
    </main>
  );
}
