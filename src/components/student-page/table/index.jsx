/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useMemo, useState } from "react";
import DataTable from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import DeleteStudentModal from "../delete-student-modal";
import useDebounce from "@/lib/hooks/useDebounce";
import { useUserList } from "@/lib/api/useUserList";
import CustomPagination from "@/components/custom-pagination";

const StudentTable = () => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState("");

  const debounceSearch = useDebounce(searchKeyword, 500);
  const students = useUserList({
    page: currentPage,
    search: debounceSearch,
    role: "student",
  });

  const columns = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase text-center">{row.getValue("id")}</div>
      ),
      alias: "ID",
    },
    {
      accessorKey: "identification_number",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              NIM
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase text-center">
          {row.getValue("identification_number")}
        </div>
      ),
      alias: "NIM",
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Nama
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
      alias: "Nama",
    },
    {
      accessorKey: "gender",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Jenis Kelamin
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const gender =
          row.getValue("gender") === "male" ? "Laki-laki" : "Perempuan";

        return <div className="uppercase text-center">{gender}</div>;
      },
      alias: "Jenis Kelamin",
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
      alias: "Email",
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase text-center">
          <Badge variant="success">Active</Badge>
        </div>
      ),
      alias: "Status",
    },
    {
      accessorKey: "functions",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Aksi
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="w-full flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/student/view/${row.getValue("id")}`)
                }
              >
                Lihat Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/student/edit/${row.getValue("id")}`)
                }
              >
                Ubah
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  setSelectedId(row.getValue("id"));
                  setOpenDeleteModal(true);
                }}
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      alias: "Aksi",
    },
  ];

  const columnFilter = useMemo(() => {
    if (columns.length) {
      return columns.reduce((acc, col) => {
        acc[col.accessorKey] = col.alias;
        return acc;
      }, {});
    }
  
    return {};
  }, [columns.length]);
  
  return (
    <>
      <DataTable
        columns={columns}
        columnFilter={columnFilter}
        data={students?.data || []}
        filterComponent={() => (
          <Input
            placeholder="Filter mahasiswa..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="max-w-sm"
          />
        )}
        paginationComponent={
          <CustomPagination
            show={students?.data?.length > 0}
            onPageChange={(val) => setCurrentPage(val)}
            currentPage={currentPage}
            totalPages={students?.pagination?.totalPages || 1}
          />
        }
      />

      <DeleteStudentModal
        selectedId={selectedId}
        isModalOpen={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        onSuccess={() => {
          students.refetch();
        }}
      />
    </>
  );
};

export default StudentTable;
