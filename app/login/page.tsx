"use client";

import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">
          Smart Bookmark App
        </h1>

        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}