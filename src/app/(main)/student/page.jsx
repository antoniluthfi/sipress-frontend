"use client";

import ProtectedPage from "@/components/protected-page";
import StudentTable from "@/components/student-page/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { PATH_NAME } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const StudentComponent = () => {
  useAuthenticateUser({ authenticatedRedirectRoute: PATH_NAME.STUDENT });
  const router = useRouter();

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <h3 className="text-3xl text-[#253763] font-semibold">Mahasiswa</h3>

      <Card className="w-full">
        <CardContent className="flex flex-col gap-5 px-5 py-10">
          <Button className="w-1/5" onClick={() => router.push("/student/new")}>
            Tambah Mahasiswa
          </Button>

          <StudentTable />
        </CardContent>
      </Card>
    </div>
  );
};

const StudentPage = () => {
  return (
    <ProtectedPage>
      <StudentComponent />
    </ProtectedPage>
  );
};

export default StudentPage;
