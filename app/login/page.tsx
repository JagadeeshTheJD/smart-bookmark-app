"use client";

import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Sign in to Smart Bookmark
        </h1>

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg font-medium transition"
        >
          Continue with Google
        </button>

        <p className="text-slate-500 text-sm text-center mt-6">
          Secure authentication powered by Google OAuth.
        </p>
      </div>
    </div>
  );
}