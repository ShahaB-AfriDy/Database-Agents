"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  // Dummy login state (you can replace this later with real auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="flex h-14 sm:h-16 items-center justify-between border-b border-slate-800 px-4 sm:px-6 bg-[#0f0f0f]">
      {/* Left Section — Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M16.5 5.5V1H7.5V5.5H2V12.5H7.5V18.5H16.5V12.5H22V5.5H16.5ZM9.5 3H14.5V5.5H9.5V3ZM14.5 16.5H9.5V12.5H14.5V16.5ZM20 10.5H16.5V7.5H20V10.5Z"></path>
        </svg>
        <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          VideoChat AI
        </h1>
      </div>

      {/* nav section */}
      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <Link href="/chat" className="hover:text-white">
          Chat
        </Link>
        <Link href="/history" className="hover:text-white">
          History
        </Link>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {isLoggedIn ? (
          <>
            {/* Notification Button */}
            <button
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Notifications"
            >
              <svg
                fill="none"
                height="20"
                width="20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </button>

            {/* Profile Image */}
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-blue-500 transition-all cursor-pointer">
              <Image
                src="https://i.pravatar.cc/100?img=5"
                alt="User avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-300 text-sm hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2 rounded-md transition-colors duration-200"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
