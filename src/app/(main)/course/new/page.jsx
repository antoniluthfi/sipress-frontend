"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import CourseForm from "@/components/course-page/course-form";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const AddNewCoursePage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

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

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/course")}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-3xl text-[#253763] font-semibold">
          Tambah Mata Kuliah
        </h3>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col p-5 gap-5">
          <CourseForm
            defaultValues={{
              name: "",
              code: "",
              lecturer_id: "",
              room: "",
              meeting_total: '1',
              meetings: [
                { meeting_number: 1, date: "", start_time: "", end_time: "" },
              ],
            }}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCoursePage;
