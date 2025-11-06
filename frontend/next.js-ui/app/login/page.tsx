"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can add actual login logic here (API call, validation, etc.)
    // For now, just redirect to the chat page
    router.push("/chat");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-100 p-4 font-display">
      <div className="w-full max-w-md bg-[#141e29] border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">
            Login to continue with YouTube-Rag-Bot
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300 block"
            >
              Email or Username
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full px-4 py-2.5 bg-[#1e2a36] border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <Link
                href="#"
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-[#1e2a36] border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 cursor-pointer transition "
          >
            Login
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#141e29] px-3 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-[#1e2a36] border border-gray-600 text-gray-200 font-medium py-2.5 px-4 rounded-lg hover:bg-[#24313f] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.676H24.252V28.7362H37.3213C36.7126 31.8623 35.0503 34.6183 32.5528 36.3537V42.235H40.2346C44.9211 37.7811 47.532 31.7402 47.532 24.5528Z"
                fill="#4285F4"
              />
              <path
                d="M24.252 48.0002C31.237 48.0002 37.0566 45.649 40.2346 42.2352L32.5528 36.3539C30.2001 37.9542 27.4267 38.9242 24.252 38.9242C18.4234 38.9242 13.4338 35.0343 11.6695 29.8322H3.79761V35.8016C6.98458 42.8252 14.939 48.0002 24.252 48.0002Z"
                fill="#34A853"
              />
              <path
                d="M11.6695 29.8322C11.129 28.293 10.8415 26.6616 10.8415 25.0002C10.8415 23.3387 11.129 21.7073 11.6606 20.1681V14.1987H3.79761C1.38628 18.9621 0 24.7073 0 30.1681C0 35.6288 1.38628 41.374 3.79761 46.1374L11.6695 40.1681C11.129 38.6288 10.8415 36.9974 10.8415 35.336C10.8415 33.6745 11.129 32.0431 11.6695 30.5038V29.8322Z"
                fill="#FBBC05"
              />
              <path
                d="M24.252 9.07613C27.8821 9.07613 31.4221 10.3661 34.0238 12.8315L40.4419 6.60833C37.0478 3.36449 31.237 0 24.252 0C14.939 0 6.98458 5.17498 3.79761 12.1985L11.6695 18.1679C13.4338 12.9658 18.4234 9.07613 24.252 9.07613Z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="#" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
