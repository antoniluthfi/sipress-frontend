/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import ManualAttendanceTable from "@/components/attendance-page/manual-attendance-table";
import LoadingSpinner from "@/components/loading-spinner";
import { useUserCoursesList } from "@/lib/api/useUserCoursesList";
import { useCourseDetails } from "@/lib/api/useCourseDetails";
import { useAttendanceRecordList } from "@/lib/api/useAttendanceRecordList";

const ManualAttendance = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });

  const { data: courseData, isLoading: courseLoading } = useCourseDetails(
    params?.id
  );
  const { data: userCourseData, isLoading: userCourseLoading, refetch: refetchUserCourseList } =
    useUserCoursesList({
      limit: 10,
      course_id: params?.id,
    });

  const { data: attendanceRecordData, isLoading: attendanceRecordLoading, refetch: refetchAttendanceRecordList } =
    useAttendanceRecordList({
      limit: 10,
      course_id: params?.id,
      course_meeting_id: params?.courseMeetingId,
    });

  const refreshData = async () => {
    await refetchUserCourseList();
    await refetchAttendanceRecordList();
  }

  const finalUserCourseData = useMemo(() => {
    if (userCourseData?.length) {
      const res = userCourseData?.map((data) => {
        const selectedAttendanceRecord = attendanceRecordData?.find(
          (attendance) => attendance?.student?.name === data?.user_name
        );

        return {
          ...data,
          ...selectedAttendanceRecord,
        };
      });

      return res;
    }

    return [];
  }, [userCourseData?.length, attendanceRecordData?.length]);

  if (courseLoading || userCourseLoading || attendanceRecordLoading) {
    return <LoadingSpinner isLoading={courseLoading || userCourseLoading} />;
  }

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-5 lg:gap-10">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push(`/attendance/do/${params?.id}`)}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-xl lg:text-3xl text-[#253763] font-semibold">
          Absensi Manual
        </h3>
      </div>

      <Card className="w-full">
        <CardContent className="flex flex-col gap-2 px-5 py-10">
          <div>
            <h4 className="text-2xl text-[#253763] font-semibold">
              S1 Teknik Informatika
            </h4>
            <p className="text-lg text-[#253763]">
              <strong>Mata Kuliah:</strong> {courseData?.name || "-"}
            </p>
            <p className="text-lg text-[#253763]">
              <strong>Ruangan:</strong> {courseData?.location_name || "-"}
            </p>
            <p className="text-lg text-[#253763]">
              <strong>Pertemuan ke </strong> {courseData?.location_name || "-"}
            </p>
          </div>

          <ManualAttendanceTable
            data={finalUserCourseData}
            courseName={courseData?.name}
            refreshData={refreshData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualAttendance;
