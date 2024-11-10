"use client";

import LoadingSpinner from "@/components/loading-spinner";
import StudentForm from "@/components/student-page/student-form";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { useUserDetails } from "@/lib/api/useUserDetails";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const StudentDetailPage = () => {
  const pathname = usePathname();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });
  
  const router = useRouter();
  const params = useParams();
  const { data, isLoading } = useUserDetails(params?.studentId);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/student")}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-3xl text-[#253763] font-semibold">
          Detail Mahasiswa
        </h3>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col p-5 gap-5">
          <StudentForm
            mode="view"
            defaultValues={data}
            onSubmit={(data) => console.log(data)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDetailPage;
