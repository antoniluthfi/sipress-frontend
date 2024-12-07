"use client";

import { Home, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#253763]">
      <div className="text-center">
        <div className="animate-bounce mb-8">
          <AlertCircle className="mx-auto h-16 w-16 text-yellow-400" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-gray-300 mb-8">
          Oops! Halaman tidak ditemukan
        </p>
        <Button
          onClick={() => router.back()}
          className="bg-yellow-400 text-[#253763] px-6 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 hover:bg-yellow-300 transition duration-300 max-w-xs mx-auto"
        >
          <Home className="h-5 w-5" />
          <span>Kembali ke halaman sebelumnya</span>
        </Button>
      </div>
    </div>
  );
}
