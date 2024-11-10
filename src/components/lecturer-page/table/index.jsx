"use client";

import React, { useState } from "react";
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
import { useUserList } from "@/lib/api/useUserList";
import useDebounce from "@/lib/hooks/useDebounce";
import CustomPagination from "@/components/custom-pagination";
import DeleteLecturerModal from "../delete-lecturer-modal";

const LecturerTable = () => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState("");

  const debounceSearch = useDebounce(searchKeyword, 500);
  const lecturers = useUserList({
    page: currentPage,
    search: debounceSearch,
    role: "lecturer",
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
              NIDN
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
              Gender
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase text-center">{row.getValue("gender")}</div>
      ),
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
              Functions
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
                  router.push(`/lecturer/view/${row.getValue("id")}`)
                }
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/lecturer/edit/${row.getValue("id")}`)
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  setSelectedId(row.getValue("id"));
                  setOpenDeleteModal(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={lecturers?.data || []}
        filterComponent={() => (
          <Input
            placeholder="Filter dosen..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="max-w-sm"
          />
        )}
        paginationComponent={
          <CustomPagination
            show={lecturers?.data?.length > 0}
            onPageChange={(val) => setCurrentPage(val)}
            currentPage={currentPage}
            totalPages={lecturers?.pagination?.totalPages || 1}
          />
        }
      />

      <DeleteLecturerModal
        selectedId={selectedId}
        isModalOpen={openDeleteModal}
        open={true}
        closeModal={() => setOpenDeleteModal(false)}
        onSuccess={() => {
          lecturers.refetch();
        }}
      />
    </>
  );
};

export default LecturerTable;
