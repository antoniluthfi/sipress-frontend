"use client";

import LoadingSpinner from "@/components/loading-spinner";
import LocationForm from "@/components/location-page/location-form";
import ProtectedPage from "@/components/protected-page";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { useLocationDetails } from "@/lib/api/useLocationDetails";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const EditLocationComponent = () => {
  const pathname = usePathname();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { data, isLoading } = useLocationDetails(params?.locationId);

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/location/${params?.locationId}`,
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
        <button onClick={() => router.push("/location")}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-3xl text-[#253763] font-semibold">
          Ubah Ruangan
        </h3>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col p-5 gap-5">
          <LocationForm
            mode="update"
            defaultValues={{
              ...data,
              radius: data?.radius?.toString() || "",
            }}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const EditLocationPage = () => {
  return (
    <ProtectedPage>
      <EditLocationComponent />
    </ProtectedPage>
  )
}

export default EditLocationPage;
