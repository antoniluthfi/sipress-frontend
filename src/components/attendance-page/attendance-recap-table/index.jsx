"use client";

import CustomPagination from "@/components/custom-pagination";
import LoadingSpinner from "@/components/loading-spinner";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserCoursesList } from "@/lib/api/useUserCoursesList";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const AttendanceRecapTable = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const userCourses = useUserCoursesList({
    page: currentPage,
    course_id: params?.id,
  });

  return (
    <div className="flex flex-col gap-5">
      <Input
        placeholder="Filter mahasiswa..."
        value=""
        onChange={(event) => {}}
        className="max-w-sm"
      />

      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead rowSpan={2} className="text-center">
                No.
              </TableHead>
              <TableHead rowSpan={2} className="text-center">
                Nama Lengkap
              </TableHead>
              <TableHead rowSpan={2} className="text-center">
                NIM
              </TableHead>
              <TableHead colSpan={16} className="text-center">
                Pertemuan
              </TableHead>
            </TableRow>
            <TableRow>
              {Array.from({ length: 16 }).map((_, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "text-center",
                    index % 2 === 0 ? "bg-slate-100" : ""
                  )}
                >
                  {index + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {userCourses?.data?.length > 0 ? (
              userCourses?.data?.map((data, dataIndex) => (
                <TableRow key={dataIndex}>
                  <TableCell className="text-center">{dataIndex + 1}</TableCell>
                  <TableCell>{data?.user_name}</TableCell>
                  <TableCell className="text-center">
                    {data?.identification_number}
                  </TableCell>
                  {Array.from({ length: 16 }).map((_, index) => (
                    <TableCell
                      key={index}
                      className={cn(
                        "text-center",
                        index % 2 === 0 ? "bg-slate-100" : ""
                      )}
                    >
                      H
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={19} className="py-10">
                  <LoadingSpinner isLoading={userCourses?.isLoading} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CustomPagination
        show={userCourses?.data?.length > 0}
        onPageChange={(val) => setCurrentPage(val)}
        currentPage={currentPage}
        totalPages={userCourses?.pagination?.totalPages || 1}
      />
    </div>
  );
};

export default AttendanceRecapTable;
