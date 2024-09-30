import DoAttendanceTable from "@/components/attendance-page/do-attendance-table";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const DoAttendancePage = () => {
  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <h3 className="text-3xl text-[#253763] font-semibold">Mulai Presensi</h3>

      <Card className="w-full">
        <CardContent className="flex flex-col gap-2 px-5 py-10">
          <div>
            <h4 className="text-xl text-[#253763] font-semibold">
              S1 Teknik Informatika
            </h4>
            <p className="text-lg text-[#253763]">
              Introduction to Computer Science
            </p>
          </div>

          <DoAttendanceTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default DoAttendancePage;
