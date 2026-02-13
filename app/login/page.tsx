"use client";

import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="bg-white text-black p-8 rounded-lg shadow-md text-center w-80">
        <h1 className="text-2xl font-bold mb-6">
          Smart Bookmark App
        </h1>

        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-3 rounded-lg w-full hover:opacity-80 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}