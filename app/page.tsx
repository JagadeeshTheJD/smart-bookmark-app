import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Smart Bookmark App
        </h1>
        <p className="mb-8 text-gray-400">
          Save and manage your bookmarks privately.
        </p>

        <Link
          href="/login"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}