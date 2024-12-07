"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "@/components/ui/search";
import { useRouter } from "next/navigation";
import DeleteCourseModal from "@/components/course-page/delete-course-modal";
import { useCourseList } from "@/lib/api/useCourseList";
import useDebounce from "@/lib/hooks/useDebounce";
import LoadingSpinner from "@/components/loading-spinner";
import CustomPagination from "@/components/custom-pagination";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { PATH_NAME } from "@/lib/utils";
import useAuthStore from "@/store/useAuthStore";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const CoursePage = () => {
  useAuthenticateUser({ authenticatedRedirectRoute: PATH_NAME.COURSE });
  const router = useRouter();
  const { user } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const debounceSearch = useDebounce(searchKeyword, 500);
  const courses = useCourseList({
    page: currentPage,
    search: debounceSearch,
    lecturer_id: user?.role === "lecturer" ? user?.id : "",
    include_upcoming_schedule: 1,
  });

  const renderUpcomingSchedule = (course) => {
    if (!!course?.upcoming_schedule) {
      const date = new Date(course?.upcoming_schedule?.date);
      const formattedDate = format(date, "eeee, dd MMMM yyyy", { locale: id });

      return (
        <>
          <div className="flex items-center justify-between px-2 py-1 bg-[#253763] gap-3 rounded-md w-fit">
            <p className="text-sm lg:text-base text-white">
              {formattedDate}{" "}
              {course?.upcoming_schedule?.start_time?.substring(0, 5)} WIB
            </p>
            <Clock className="text-white" />
          </div>

          <div className="flex items-center justify-between px-2 py-1 bg-red-500 gap-3 rounded-md w-fit">
            <p className="text-sm lg:text-base text-white">
              {formattedDate}{" "}
              {course?.upcoming_schedule?.end_time?.substring(0, 5)} WIB
            </p>
            <Clock className="text-white" />
          </div>
        </>
      );
    }

    return (
      <div className="flex items-center justify-between px-2 py-1 bg-[#253763] rounded-md w-fit">
        <p className="text-sm lg:text-base text-white">
          Tidak ada jadwal yang akan datang
        </p>
      </div>
    );
  };

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-5 lg:gap-10">
      <h3 className="text-xl lg:text-3xl text-[#253763] font-semibold">
        Mata Kuliah
      </h3>

      <div className="flex flex-col-reverse lg:flex-row items-start justify-between gap-3 lg:gap-10">
        <div className="w-full lg:w-[60%] h-full overflow-hidden">
          <div className="h-[700px] overflow-auto flex flex-col gap-5 mb-5">
            {courses?.data?.length > 0 ? (
              courses?.data?.map((course, i) => (
                <Card className="w-full" key={`course_${i}`}>
                  <CardContent className="flex flex-col lg:flex-row gap-3 lg:gap-5 p-2 lg:p-5">
                    <div className="relative w-full lg:w-[50%] h-[200px] rounded-md overflow-hidden">
                      <Image
                        src="https://dummyimage.com/400x200/8c8c8c/000000"
                        alt="course"
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        priority={true}
                      />
                    </div>

                    <div className="w-full h-full flex flex-col gap-2 lg:gap-3">
                      <div className="flex items-center justify-between">
                        <h2 className="text-base lg:text-xl text-[#253763] font-bold cursor-pointer">
                          S1 Teknik Informatika
                        </h2>

                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreHorizontal />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/course/view/${course?.id}`)
                              }
                            >
                              Lihat Detail
                            </DropdownMenuItem>
                            {user?.role === "admin" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(`/course/edit/${course?.id}`)
                                  }
                                >
                                  Ubah
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(
                                      `/course/manage-students/${course?.id}`
                                    )
                                  }
                                >
                                  Atur Mahasiswa
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    setSelectedId(course?.id);
                                    setOpenDeleteModal(true);
                                  }}
                                >
                                  Hapus
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="text-sm lg:text-lg text-[#253763]">
                        {course?.name || "-"}
                      </h3>

                      <div className="flex items-center gap-1 lg:gap-2">
                        <MapPin />
                        <p className="text-sm lg:text-base text-[#253763]">
                          {course?.location_name || "-"}
                        </p>
                      </div>

                      {renderUpcomingSchedule(course)}
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

        <Card className="w-full lg:w-[40%]">
          <CardContent className="flex flex-col p-2 lg:p-5 gap-2 lg:gap-5">
            <CardTitle className="text-sm lg:text-xl border-b-[1px] border-[#253763]">
              Cari Mata Kuliah
            </CardTitle>
            <Search
              placeholder="Cari data"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            <Button
              className="bg-[#253763]"
              onClick={() => router.push("/course/new")}
            >
              <p className="text-sm lg:text-base">Tambah Mata Kuliah</p>
            </Button>
          </CardContent>
        </Card>

        <DeleteCourseModal
          selectedId={selectedId}
          isModalOpen={openDeleteModal}
          closeModal={() => {
            setOpenDeleteModal(false);
          }}
          onSuccess={() => {
            courses.refetch();
          }}
        />
      </div>
    </div>
  );
};

export default CoursePage;
