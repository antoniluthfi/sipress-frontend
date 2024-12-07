"use client";

import ProtectedPage from "@/components/protected-page";
import StudentForm from "@/components/student-page/student-form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { PATH_NAME } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const AddNewStudentComponent = () => {
  useAuthenticateUser({ authenticatedRedirectRoute: PATH_NAME.STUDENT_NEW });
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("identification_number", data.identification_number);
    formData.append("address", data.address);
    formData.append("phone_number", data.phone_number);
    formData.append("status", data.status);
    formData.append("role", "student");

    if (data.profile_url) {
      formData.append("profile_url", data.profile_url);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        const response = await res.json();
        toast({
          title: "Success",
          description: response?.message || "User created successfully",
          variant: "success",
        });
        router.back();
      } else {
        const errorData = await res.json();
        toast({
          title: "Failed",
          description:
            errorData?.error ||
            errorData?.errors?.[0]?.msg ||
            "Something went wrong",
          variant: "danger",
        });
      }
    } catch (err) {
      console.error("An error occurred:", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "danger",
      });
    }
  };

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
              identification_number: "",
              address: "",
              phone_number: "",
              profile_url: "",
              status: "",
            }}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const AddNewStudentPage = () => {
  return (
    <ProtectedPage>
      <AddNewStudentComponent />
    </ProtectedPage>
  );
};

export default AddNewStudentPage;
