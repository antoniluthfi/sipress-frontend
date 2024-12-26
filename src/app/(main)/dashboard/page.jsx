"use client";

import React from "react";
import Carousel from "@/components/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircleIcon } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { useLatestAnnouncementList } from "@/lib/api/useLatestAnnouncementList";
import LoadingSpinner from "@/components/loading-spinner";
import Image from "next/image";

const DashboardPage = () => {
  useAuthenticateUser();
  const { user } = useAuthStore();

  const { data, isLoading } = useLatestAnnouncementList({ page: 1 });

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <h3 className="text-3xl text-[#253763] font-semibold">Dashboard</h3>

      <Card className="flex w-full h-[250px] p-8">
        <Carousel data={data} />
      </Card>

      <div className="flex items-start justify-between gap-10">
        <Card className="w-[30%]">
          <CardContent className="flex flex-col gap-5 items-center px-5 py-10">
            <UserCircleIcon className="w-[165px] h-[165px]" />
            <div className="flex flex-col gap-2 items-center">
              <h4 className="text-2xl text-[#253763] text-center font-bold">
                Halo {user?.name || "-"}
              </h4>
              <p className="text-2xl text-[#253763] text-center">
                Selamat Datang di Aplikasi Presensi Universitas Siliwangi
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-[70%]">
          <CardContent className="flex flex-col gap-5 px-5 py-10">
            <h4 className="text-3xl text-[#253763] font-semibold">
              Pengumuman Terbaru
            </h4>

            {data?.map((announcement, i) => (
              <div
                key={`announcement_${i}`}
                className="border-[1px] border-gray-400 rounded-lg p-2 flex items-center gap-3 cursor-pointer"
                onClick={() => window.open(announcement?.href, '_blank')}
              >
                <div className="relative w-[200px] h-[100px] rounded-md overflow-hidden">
                  <Image
                    src={announcement?.img}
                    alt="course"
                    className="object-cover"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  />
                </div>

                <h3 className="text-black font-bold text-lg">{announcement?.title}</h3>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
