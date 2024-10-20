"use client";

import React from "react";
import Carousel from "@/components/carousel";
import TableCurrentLecturerSchedule from "@/components/table-current-lecturer-schedule";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircleIcon } from "lucide-react";
import { getUserLocalStorage } from "@/lib/utils";

const DashboardPage = () => {
  const user = getUserLocalStorage();
  console.log(user);

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <h3 className="text-3xl text-[#253763] font-semibold">Dashboard</h3>

      <Card className="flex w-full h-[250px] p-8">
        <Carousel />
      </Card>

      <div className="flex items-start justify-between gap-10">
        <Card className="w-[30%]">
          <CardContent className="flex flex-col gap-5 items-center px-5 py-10">
            <UserCircleIcon className="w-[165px] h-[165px]" />
            <div className="flex flex-col gap-2 items-center">
              <h4 className="text-2xl text-[#253763] text-center">
                Selamat Siang
              </h4>
              <p className="text-2xl text-[#253763] text-center font-bold">
                {user?.name || '-'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-[70%]">
          <CardContent className="flex flex-col gap-5 px-5 py-10">
            <h4 className="text-3xl text-[#253763] font-semibold">
              Jadwal Mengajar Hari Ini
            </h4>
            <TableCurrentLecturerSchedule />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
