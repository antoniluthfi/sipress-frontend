"use client";

import StudentForm from "@/components/student-page/student-form";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const AddNewStudentPage = () => {
  const router = useRouter();

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/student")}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-3xl text-[#253763] font-semibold">
          Tambah Mahasiswa
        </h3>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col p-5 gap-5">
          <StudentForm
            mode="new"
            defaultValues={{
              name: "",
              email: "",
              gender: "",
              nim: "",
              address: "",
              phoneNumber: "",
              profileUrl: "",
              status: "",
            }}
            onSubmit={(data) => console.log(data)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewStudentPage;
