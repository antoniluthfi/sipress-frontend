"use client";

import LecturerForm from "@/components/lecturer-page/lecturer-form";
import LoadingSpinner from "@/components/loading-spinner";
import ProtectedPage from "@/components/protected-page";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { useUserDetails } from "@/lib/api/useUserDetails";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const EditLecturerComponent = () => {
  const pathname = usePathname();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { data, isLoading } = useUserDetails(params?.lecturerId);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("identification_number", data.identification_number);
    formData.append("address", data.address);
    formData.append("phone_number", data.phone_number);
    formData.append("status", data.status);
    formData.append("role", "lecturer");

    if (data.profile_url) {
      formData.append("profile_url", data.profile_url);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${params?.lecturerId}`, {
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

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

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
            defaultValues={data}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const EditLecturerPage = () => {
  return (
    <ProtectedPage>
      <EditLecturerComponent />
    </ProtectedPage>
  )
}

export default EditLecturerPage;
