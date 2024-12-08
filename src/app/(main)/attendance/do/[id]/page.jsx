"use client";

import DoAttendanceTable from "@/components/attendance-page/do-attendance-table";
import LoadingSpinner from "@/components/loading-spinner";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { useCourseDetails } from "@/lib/api/useCourseDetails";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const DoAttendancePage = () => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });

  const { data, isLoading } = useCourseDetails(params?.id);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/attendance")}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-3xl text-[#253763] font-semibold">
          Mulai Presensi
        </h3>
      </div>

      <Card className="w-full">
        <CardContent className="flex flex-col gap-2 px-5 py-10">
          <div>
            <h4 className="text-2xl text-[#253763] font-semibold">
              S1 Teknik Informatika
            </h4>
            <p className="text-lg text-[#253763]">
              <strong>Mata Kuliah:</strong> {data?.name || "-"}
            </p>
            <p className="text-lg text-[#253763]">
              <strong>Ruangan:</strong> {data?.location_name || "-"}
            </p>
          </div>

          <DoAttendanceTable data={data?.meetings} courseName={data?.name} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DoAttendancePage;
