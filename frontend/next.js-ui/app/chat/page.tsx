"use client";
import Header from "@/components/Header";
import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videos, setVideos] = useState([
    { id: 1, title: "Learn React Basics" },
    { id: 2, title: "Advanced Tailwind CSS Tips" },
    { id: 3, title: "Next.js 14 Tutorial" },
    { id: 4, title: "YouTube API Integration Guide" },
  ]);
  const [activeVideo, setActiveVideo] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: "" });

  const handleAddVideo = () => {
    if (!newVideo.title.trim()) return;
    const id = Date.now();
    setVideos([...videos, { id, title: newVideo.title }]);
    setActiveVideo(id);
    setShowModal(false);
    setNewVideo({ title: "" });
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f0f0f] text-white">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 h-full w-72 bg-[#121212] border-r border-slate-800 p-4 flex flex-col transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!sidebarOpen}
        >
          {/* TOP: Toggle + Title + Add button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Book / window icon that also toggles sidebar */}

              <h2 className="text-lg font-semibold">My Videos</h2>

              <button
                onClick={() => setShowModal(true)}
                className="flex h-10 w-10 items-center justify-center rounded-md text-gray-300 hover:bg-gray-800"
                title="Add video"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
            >
              {/* Book icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h10M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Video list */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => {
                  setActiveVideo(video.id);
                  // keep sidebar open on selection (optional)
                }}
                className={`w-full text-left rounded-md px-3 py-2 text-sm font-medium transition ${
                  activeVideo === video.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {video.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Overlay (when sidebar open) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Floating open button (when sidebar closed) */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed left-4 top-4 z-40 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-md p-2 shadow"
            aria-label="Open sidebar"
            title="Open sidebar"
          >
            {/* Book icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h10M4 18h16"
              />
            </svg>
          </button>
        )}

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* Chat messages */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-[#0f0f0f]">
            <div className="flex items-start gap-3">
              <div
                className="h-10 w-10 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: "url(https://i.pravatar.cc/100?img=5)",
                }}
              />
              <div className="bg-gray-800 p-3 rounded-lg max-w-lg">
                <p className="text-sm font-medium text-blue-400">
                  VideoChat Bot
                </p>
                <p className="text-gray-300">
                  Hi! Ask me anything about this video.
                </p>
              </div>
            </div>
          </div>

          {/* Chat input */}
          <div className="border-t border-slate-800 p-4 bg-[#0b0b0b]">
            <div className="relative max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Ask a question..."
                className="w-full rounded-lg bg-[#121212] text-white border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12 p-3"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal — Add Video */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-[#1a1a1a] p-6 rounded-xl w-full max-w-md border border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Add Video Title
            </h3>

            <input
              type="text"
              placeholder="Enter video title"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ title: e.target.value })}
              className="w-full mb-4 p-2 rounded-lg bg-[#111] border border-slate-700 text-white"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVideo}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
