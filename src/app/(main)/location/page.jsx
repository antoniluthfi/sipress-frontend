"use client";

import LocationTable from "@/components/location-page/table";
import ProtectedPage from "@/components/protected-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { PATH_NAME } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const LocationComponent = () => {
  useAuthenticateUser({ authenticatedRedirectRoute: PATH_NAME.LOCATION });
  const router = useRouter();

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <h3 className="text-3xl text-[#253763] font-semibold">Ruangan</h3>

      <Card className="w-full">
        <CardContent className="flex flex-col gap-5 px-5 py-10">
          <Button className="w-1/5" onClick={() => router.push("/location/new")}>
            Tambah Ruangan
          </Button>

          <LocationTable />
        </CardContent>
      </Card>
    </div>
  );
};

const LocationPage = () => {
  return (
    <ProtectedPage>
      <LocationComponent />
    </ProtectedPage>
  )
}

export default LocationPage;
