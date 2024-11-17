"use client";

import LocationForm from "@/components/location-page/location-form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { PATH_NAME } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const AddNewLocationPage = () => {
  useAuthenticateUser({ authenticatedRedirectRoute: PATH_NAME.LOCATION_NEW });
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/location`, {
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
        <button onClick={() => router.push("/location")}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-3xl text-[#253763] font-semibold">
          Tambah Ruangan
        </h3>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col p-5 gap-5">
          <LocationForm
            mode="new"
            defaultValues={{
              name: "",
              longitude: "",
              latitude: "",
              radius: "",
            }}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewLocationPage;
