"use client";

import LoadingSpinner from "@/components/loading-spinner";
import LocationForm from "@/components/location-page/location-form";
import ProtectedPage from "@/components/protected-page";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { useLocationDetails } from "@/lib/api/useLocationDetails";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const LocationDetailComponent = () => {
  const pathname = usePathname();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });
  
  const router = useRouter();
  const params = useParams();
  const { data, isLoading } = useLocationDetails(params?.locationId);

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
          Detail Ruangan
        </h3>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col p-5 gap-5">
          <LocationForm
            mode="view"
            defaultValues={data}
            onSubmit={(data) => console.log(data)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const LocationDetailPage = () => {
  return (
    <ProtectedPage>
      <LocationDetailComponent />
    </ProtectedPage>
  )
}

export default LocationDetailPage;
