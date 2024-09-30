"use client";

import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const AttendanceRecapTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
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
            {getCurrentPageData().map((_, dataIndex) => (
              <TableRow key={dataIndex}>
                <TableCell className="text-center">{dataIndex + 1}</TableCell>
                <TableCell>Lintang Luthfiantoni</TableCell>
                <TableCell className="text-center">8673826702</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="w-fit mx-0">
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
  );
};

export default AttendanceRecapTable;
