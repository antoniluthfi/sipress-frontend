"use client";

import LecturerForm from "@/components/lecturer-page/lecturer-form";
import LoadingSpinner from "@/components/loading-spinner";
import ProtectedPage from "@/components/protected-page";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { useUserDetails } from "@/lib/api/useUserDetails";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const LecturerDetailComponent = () => {
  const pathname = usePathname();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });
  const router = useRouter();
  const params = useParams();
  const { data, isLoading } = useUserDetails(params?.lecturerId);

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
          Detail Dosen
        </h3>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col p-5 gap-5">
          <LecturerForm
            mode="view"
            defaultValues={data}
            onSubmit={(data) => console.log(data)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

const LecturerDetailPage = () => {
  return (
    <ProtectedPage>
      <LecturerDetailComponent />
    </ProtectedPage>
  )
}

export default LecturerDetailPage;
