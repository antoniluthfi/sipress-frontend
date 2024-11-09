"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import CourseForm from "@/components/course-page/course-form";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCourseDetails } from "@/lib/api/useCourseDetails";
import LoadingSpinner from "@/components/loading-spinner";
import { format } from "date-fns";

const CourseDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { data, isLoading } = useCourseDetails(params?.courseId);

  const handleSubmit = (data) => {
    toast({
      title: "Data mata kuliah berhasil ditambahkan!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/course")}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-3xl text-[#253763] font-semibold">
          Detail Mata Kuliah
        </h3>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col p-5 gap-5">
          <CourseForm
            defaultValues={{
              ...data,
              meeting_total: (data?.meetings?.length || 1).toString(),
              meetings: (data?.meetings || []).map((meeting) => {
                const date = new Date(meeting.date);

                const formattedDate = format(date.toLocaleDateString(), 'yyyy-MM-dd');
                const formattedStartTime = meeting.start_time.substring(0, 5); // Mengambil HH:mm
                const formattedEndTime = meeting.end_time.substring(0, 5); // Mengambil HH:mm
    
                return {
                  ...meeting,
                  date: formattedDate,
                  start_time: formattedStartTime,
                  end_time: formattedEndTime,
                }
              })
            }}
            onSubmit={handleSubmit}
            mode="view"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetailPage;
