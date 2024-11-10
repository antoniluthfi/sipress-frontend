"use client";

import { Button } from "@/components/ui/button";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { PATH_NAME } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useAuthenticateUser({ redirectRoute: PATH_NAME.LANDING_PAGE });

  return (
    <main className="min-h-screen bg-[url('/images/bg_work.png')] bg-cover">
      <div className="flex flex-col items-center justify-center gap-10 h-screen w-[40%] bg-[#1D3163] p-24">
        <Image src="/images/ic_logo.png" width={163} height={136} alt="logo" priority />

        <div>
          <h2 className="text-white text-4xl font-bold text-center">
            SELAMAT DATANG
          </h2>
          <p className="text-white text-3xl text-center">
            DI SISTEM PRESENSI UNIVERSITAS SILIWANGI
          </p>
        </div>

        <Button
          variant="outline"
          className="font-bold w-full"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </main>
  );
}
