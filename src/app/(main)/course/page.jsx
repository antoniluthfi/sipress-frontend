"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, MoreHorizontal } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

const CoursePage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const itemsPerPage = 5;
  const totalItems = 30;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    let paginationItems = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return Array.from({ length: totalItems }, (_, i) => i).slice(
      startIndex,
      endIndex
    );
  };

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-10">
      <h3 className="text-3xl text-[#253763] font-semibold">Mata Kuliah</h3>

      <div className="flex items-start justify-between gap-10">
        <div className="w-[60%] h-full overflow-hidden">
          <div className="h-[700px] overflow-auto flex flex-col gap-5 mb-5">
            {getCurrentPageData().map((item, i) => (
              <Card className="w-full" key={`course_${i}`}>
                <CardContent className="flex gap-5 px-5 py-5">
                  <div className="relative w-[400px] h-[200px] rounded-md overflow-hidden">
                    <Image
                      src="https://dummyimage.com/400x200/8c8c8c/000000"
                      alt="course"
                      className="object-cover"
                      fill
                    />
                  </div>

                  <div className="w-full h-full flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl text-[#253763] font-bold cursor-pointer">
                        S1 Teknik Informatika
                      </h2>

                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Functions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => router.push(`/course/view/${i + 1}`)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/course/edit/${i + 1}`)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              setOpenDeleteModal(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h3 className="text-lg text-[#253763]">
                      Introduction to Computer Science
                    </h3>

                    <div className="flex items-center gap-2">
                      <MapPin />
                      <p className="text-base text-[#253763]">LT1-2A</p>
                    </div>

                    <div className="flex items-center justify-between px-2 py-1 bg-[#253763] rounded-md w-[130px]">
                      <p className="text-base text-white">09:30 WIB</p>
                      <Clock className="text-white" />
                    </div>

                    <div className="flex items-center justify-between px-2 py-1 bg-red-500 rounded-md w-[130px]">
                      <p className="text-base text-white">09:30 WIB</p>
                      <Clock className="text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <Card className="w-[40%]">
          <CardContent className="flex flex-col p-5 gap-5">
            <CardTitle className="text-xl border-b-[1px] border-[#253763]">
              Cari Mata Kuliah
            </CardTitle>
            <Search placeholder="Search" />

            <Button
              className="bg-[#253763]"
              onClick={() => router.push("/course/new")}
            >
              <p>Tambah Mata Kuliah</p>
            </Button>
          </CardContent>
        </Card>

        <DeleteCourseModal
          isModalOpen={openDeleteModal}
          closeModal={() => {
            setOpenDeleteModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default CoursePage;
