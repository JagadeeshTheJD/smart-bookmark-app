import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Smart Bookmark
        </h1>

        <p className="text-slate-400 mb-8">
          A private, real-time bookmark manager built with Next.js and Supabase.
        </p>

        <Link
          href="/login"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}