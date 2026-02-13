"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBookmarks(data);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        await fetchBookmarks();
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  const handleAddBookmark = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !url) return;

    const { error } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    if (!error) {
      setTitle("");
      setUrl("");
      fetchBookmarks();
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        <h2 className="text-lg mb-4">
          Welcome back,{" "}
          <span className="font-semibold">
            {user.user_metadata?.full_name || user.email}
          </span>
        </h2>

        {/* Add Bookmark Form */}
        <form onSubmit={handleAddBookmark} className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Bookmark Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Bookmark URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
          >
            Add Bookmark
          </button>
        </form>

        {/* Bookmarks List */}
        <div className="space-y-3">
          {bookmarks.length === 0 && (
            <p className="text-gray-500">No bookmarks yet.</p>
          )}

          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{bookmark.title}</p>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm"
                >
                  {bookmark.url}
                </a>
              </div>

              <button
                onClick={() => handleDelete(bookmark.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}