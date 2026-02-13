import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Smart Bookmark App
        </h1>
        <p className="mb-6 text-gray-600">
          Save and manage your bookmarks privately.
        </p>

        <Link
          href="/login"
          className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}