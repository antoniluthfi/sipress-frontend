"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { useRouter } from "next/navigation";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { PATH_NAME } from "@/lib/utils";
import useDebounce from "@/lib/hooks/useDebounce";
import { useCourseList } from "@/lib/api/useCourseList";
import LoadingSpinner from "@/components/loading-spinner";
import CustomPagination from "@/components/custom-pagination";
import useAuthStore from "@/store/useAuthStore";

const AttendancePage = () => {
  useAuthenticateUser({ authenticatedRedirectRoute: PATH_NAME.ATTENDANCE });
  const router = useRouter();
  const { user } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  const debounceSearch = useDebounce(searchKeyword, 500);
  const courses = useCourseList({
    page: currentPage,
    search: debounceSearch,
    lecturer_id: user?.role === "lecturer" ? user?.id : "",
  });

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <h3 className="text-3xl text-[#253763] font-semibold">Presensi</h3>

      <div className="flex items-start justify-between gap-10">
        <div className="w-[60%] h-full overflow-hidden">
          <div className="h-[700px] overflow-auto flex flex-col gap-5 mb-5">
            {courses?.data?.length > 0 ? (
              courses?.data?.map((course, i) => (
                <Card className="w-full" key={`course_${i}`}>
                  <CardContent className="flex gap-5 px-5 py-5">
                    <div className="relative w-[400px] h-[200px] rounded-md overflow-hidden">
                      <Image
                        src="https://dummyimage.com/400x200/8c8c8c/000000"
                        alt="course"
                        className="object-cover"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                    </div>

                    <div className="w-full h-full flex flex-col gap-3">
                      <h2 className="text-xl text-[#253763] font-bold cursor-pointer">
                        S1 Teknik Informatika
                      </h2>
                      <h3 className="text-lg text-[#253763]">
                        {course?.name || "-"}
                      </h3>

                      <div className="flex items-center gap-2">
                        <MapPin />
                        <p className="text-base text-[#253763]">
                          {course?.location_name}
                        </p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Button
                          onClick={() =>
                            router.push(`/attendance/do/${course?.id}`)
                          }
                        >
                          Mulai Presensi
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            router.push(`/attendance/recap/${course?.id}`)
                          }
                        >
                          Rekap Presensi
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <LoadingSpinner isLoading={courses?.isLoading} />
            )}
          </div>

          <CustomPagination
            show={courses?.data?.length > 0}
            onPageChange={(val) => setCurrentPage(val)}
            currentPage={currentPage}
            totalPages={courses?.pagination?.totalPages || 1}
          />
        </div>

        <Card className="w-[40%]">
          <CardContent className="flex flex-col p-5 gap-5">
            <CardTitle className="text-xl border-b-[1px] border-[#253763]">
              Cari Mata Kuliah
            </CardTitle>
            <Search
              placeholder="Cari data"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendancePage;
