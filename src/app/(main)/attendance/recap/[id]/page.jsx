"use client";

import AttendanceRecapTable from "@/components/attendance-page/attendance-recap-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

const AttendanceRecapPage = () => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });

  return (
    <div className="w-full flex flex-1 flex-col gap-10 overflow-hidden">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/attendance")}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-3xl text-[#253763] font-semibold">
          Rekap Presensi
        </h3>
      </div>

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
