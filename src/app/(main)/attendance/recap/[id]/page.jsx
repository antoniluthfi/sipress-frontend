"use client";

import AttendanceRecapTable from "@/components/attendance-page/attendance-recap-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AttendanceRecapPage = () => {
  return (
    <div className="w-full flex flex-1 flex-col gap-10 overflow-hidden">
      <h3 className="text-3xl text-[#253763] font-semibold">Rekap Presensi</h3>

      <Card className="h-3/4 w-full overflow-hidden">
        <CardContent className="flex flex-col gap-5 px-5 py-10">
          <Button className="w-1/5" onClick={() => router.push("/student/new")}>
            Export PDF
          </Button>

          <AttendanceRecapTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceRecapPage;
