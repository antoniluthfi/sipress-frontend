"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import CourseForm from "@/components/course-page/course-form";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCourseDetails } from "@/lib/api/useCourseDetails";
import LoadingSpinner from "@/components/loading-spinner";
import { format } from "date-fns";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";

const EditCoursePage = () => {
  const pathname = usePathname();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { data, isLoading } = useCourseDetails(params?.courseId);

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/course/${params?.courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (res.ok) {
        const response = await res.json();
        toast({
          title: "Success",
          description: response?.message,
          variant: "success",
        });
        router.back();
      } else {
        const errorData = await res.json();
        toast({
          title: "Failed",
          description: errorData?.error || errorData?.errors?.[0]?.msg,
          variant: "danger",
        });
      }
    } catch (err) {
      console.log("An error occurred");
    }
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
          Ubah Mata Kuliah
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

                const formattedDate = format(
                  date.toLocaleDateString(),
                  "yyyy-MM-dd"
                );
                const formattedStartTime = meeting.start_time.substring(0, 5); // Mengambil HH:mm
                const formattedEndTime = meeting.end_time.substring(0, 5); // Mengambil HH:mm

                return {
                  ...meeting,
                  date: formattedDate,
                  start_time: formattedStartTime,
                  end_time: formattedEndTime,
                };
              }),
            }}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCoursePage;
