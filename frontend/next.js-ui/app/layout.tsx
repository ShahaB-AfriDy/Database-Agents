import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "VideoChat AI",
  description: "Login to continue with VideoChat AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-[#0f0f0f] text-white flex flex-col min-h-screen`}
      >
        {/* ✅ Fixed Header */}
        <Header />

        {/* ✅ Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* ✅ Fixed Footer */}
        <Footer />
      </body>
    </html>
  );
}
