"use client";

import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForbiddenLayout() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-bounce mb-8">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-6xl font-bold text-[#253763] mb-4">403</h1>
        <p className="text-2xl text-[#253763] mb-8">
          Oops! Anda tidak memiliki akses ke halaman ini
        </p>
      </div>
    </div>
  );
}
