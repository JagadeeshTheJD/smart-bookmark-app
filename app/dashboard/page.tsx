"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-md">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-black">Dashboard</h1>
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


        <div className="border-t pt-4">
          <p>Your bookmarks will appear here.</p>
        </div>
      </div>
    </div>
  );
}