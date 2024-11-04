"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import CourseForm from "@/components/course-page/course-form";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

const AddNewCoursePage = () => {
  const router = useRouter();

  const handleSubmit = (data) => {
    console.log(data);
    toast({
      title: "Data mata kuliah berhasil ditambahkan!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      action: (
        <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
      ),
    });
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
              lecturer_id: "",
              room: "",
              meeting_total: 1,
              meetings: [{ meeting_number: 1, date: "", start_time: "", end_time: "" }],
            }}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCoursePage;
