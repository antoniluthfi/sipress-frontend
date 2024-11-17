"use client";

import React, { useState } from "react";
import DataTable from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import useDebounce from "@/lib/hooks/useDebounce";
import CustomPagination from "@/components/custom-pagination";
import { useLocationList } from "@/lib/api/useLocationList";
import DeleteLocationModal from "../delete-location-modal";

const LocationTable = () => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState("");

  const debounceSearch = useDebounce(searchKeyword, 500);
  const locations = useLocationList({
    page: currentPage,
    search: debounceSearch,
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
      accessorKey: "latitude",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Latitude
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase text-center">{row.getValue("latitude")}</div>
      ),
    },
    {
      accessorKey: "longitude",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Longitude
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase text-center">{row.getValue("longitude")}</div>
      ),
    },
    {
      accessorKey: "radius",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Radius (meter)
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase text-center">{row.getValue("radius")}</div>
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
                  router.push(`/location/view/${row.getValue("id")}`)
                }
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/location/edit/${row.getValue("id")}`)
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
        data={locations?.data || []}
        filterComponent={() => (
          <Input
            placeholder="Filter ruangan..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="max-w-sm"
          />
        )}
        paginationComponent={
          <CustomPagination
            show={locations?.data?.length > 0}
            onPageChange={(val) => setCurrentPage(val)}
            currentPage={currentPage}
            totalPages={locations?.pagination?.totalPages || 1}
          />
        }
      />

      <DeleteLocationModal
        selectedId={selectedId}
        isModalOpen={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        onSuccess={() => {
          locations.refetch();
        }}
      />
    </>
  );
};

export default LocationTable;
