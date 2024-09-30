"use client";

import LecturerForm from "@/components/lecturer-page/lecturer-form";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const EditLecturerPage = () => {
  const router = useRouter();

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/lecturer")}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-3xl text-[#253763] font-semibold">
          Ubah Dosen
        </h3>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col p-5 gap-5">
          <LecturerForm
            mode="update"
            defaultValues={{
              name: "test",
              email: "test@gmail.com",
              gender: "Laki-laki",
              nim: "186327163",
              address: "jl. test 1",
              phoneNumber: "09982867862",
              profileUrl: "",
              status: "Aktif",
            }}
            onSubmit={(data) => console.log(data)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditLecturerPage;
