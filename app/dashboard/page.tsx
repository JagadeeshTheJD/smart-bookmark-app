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
  const [submitting, setSubmitting] = useState(false);

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
    let channel: any;

    const init = async () => {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
        router.push("/login");
        return;
        }

        setUser(data.user);
        await fetchBookmarks();
        setLoading(false);

        // Realtime subscription
        channel = supabase
        .channel("bookmarks-realtime")
        .on(
            "postgres_changes",
            {
            event: "*",
            schema: "public",
            table: "bookmarks",
            },
            () => {
            fetchBookmarks();
            }
        )
        .subscribe();
    };

    init();

    return () => {
        if (channel) {
        supabase.removeChannel(channel);
        }
    };
    }, [router]);


  const handleAddBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    setSubmitting(true);

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
    }

    setSubmitting(false);
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
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">

        <div className="flex justify-between items-center mb-8">
            <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
                Welcome back, {user.user_metadata?.full_name || user.email}
            </p>
            </div>

            <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300 transition"
            >
            Logout
            </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-lg font-medium mb-4">Add Bookmark</h2>

            <form onSubmit={handleAddBookmark} className="space-y-4">
            <input
                type="text"
                placeholder="Bookmark Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <input
                type="text"
                placeholder="Bookmark URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />

            <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-5 py-2 rounded-lg font-medium transition"
            >
            {submitting ? "Adding..." : "Add Bookmark"}
            </button>
            </form>
        </div>

        <div className="space-y-4">
            {bookmarks.length === 0 && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center">
                    <p className="text-slate-400">
                    You haven’t added any bookmarks yet.
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                    Add your first one above to get started.
                    </p>
                </div>
            )}

            {bookmarks.map((bookmark) => (
            <div
                key={bookmark.id}
                className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center hover:border-slate-700 transition-all duration-200"
            >
                <div>
                <p className="font-medium">{bookmark.title}</p>
                <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 text-sm hover:underline"
                >
                    {bookmark.url}
                </a>
                </div>

                <button
                onClick={() => handleDelete(bookmark.id)}
                className="text-red-400 text-sm hover:text-red-300 transition"
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