import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('/images/bg_work.png')] bg-cover">
      <div className="flex flex-col items-center justify-center gap-10 h-screen w-[40%] bg-[#1D3163] p-24">
        <Image src="/images/ic_logo.png" width={163} height={136} alt="logo" />

        <div>
          <h2 className="text-white text-4xl font-bold text-center">
            SELAMAT DATANG
          </h2>
          <p className="text-white text-3xl text-center">
            DI SISTEM PRESENSI UNIVERSITAS SILIWANGI
          </p>
        </div>

        <div className="flex flex-col gap-4 w-2/4">
          <p className="text-white text-2xl text-center">Login Sebagai</p>
          <div className="flex items-center justify-between w-full">
            <Button variant="outline" className="font-bold">
              DOSEN
            </Button>
            <Button variant="outline" className="font-bold">
              ADMIN
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
