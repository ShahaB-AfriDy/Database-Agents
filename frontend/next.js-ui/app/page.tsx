"use client";

import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-4 py-24">
        <span className="bg-blue-900/30 text-blue-400 text-xs px-3 py-1 rounded-full mb-4">
          New in AI
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold max-w-3xl leading-tight">
          Unlock Conversations with <br /> YouTube Videos
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl text-base sm:text-lg">
          Paste a YouTube link, and start a conversation with our AI about the
          video’s content. It’s that simple.
        </p>
        <Link
          href="/login"
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
        >
          Go to Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-gray-500 text-xs mt-3">
          Please note: Only YouTube links are currently supported.
        </p>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-[#0B1220] text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
          Why You&apos;ll Love VideoChat AI
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          We&apos;ve built a powerful, yet simple tool to help you extract
          knowledge and insights from video content effortlessly.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-[#10172A] p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-2">Paste YouTube URLs</h3>
            <p className="text-gray-400 text-sm">
              Easily input YouTube video links to begin interacting with the AI.
              No downloads or extensions needed.
            </p>
          </div>

          <div className="bg-[#10172A] p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-2">Chat with an AI</h3>
            <p className="text-gray-400 text-sm">
              Engage in natural conversations about the video’s transcription.
              Ask questions, get summaries, and find key points.
            </p>
          </div>

          <div className="bg-[#10172A] p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-2">
              Multiple URLs per User
            </h3>
            <p className="text-gray-400 text-sm">
              Manage and switch between conversations for multiple videos, all
              under one account.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
