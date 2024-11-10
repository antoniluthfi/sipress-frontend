"use client";

import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import GenerateQrCodeModal from "../generate-qr-code-modal";
import { format } from "date-fns";

const DoAttendanceTable = ({ data, courseId, courseName }) => {
  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);

  const columns = [
    {
      accessorKey: "meeting_number",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Pertemuan ke
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("meeting_number")}</div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Tanggal
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        const formattedDate = format(date.toLocaleDateString(), "yyyy-MM-dd");

        return <div className="text-center">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "start_time",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Waktu
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const formattedStartTime = row.getValue("start_time").substring(0, 5); // Mengambil HH:mm

        return <div className="text-center">{formattedStartTime}</div>;
      },
    },
    {
      accessorKey: "end_time",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Waktu
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const formattedEndTime = row.getValue("end_time").substring(0, 5); // Mengambil HH:mm

        return <div className="text-center">{formattedEndTime}</div>;
      },
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
        <div className="text-center">
          <Button
            variant="destructive"
            onClick={() => {
              setOpenQrCodeModal(true);
            }}
          >
            Kode QR
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />
      <GenerateQrCodeModal
      courseId={courseId}
        courseName={courseName}
        isModalOpen={openQrCodeModal}
        closeModal={() => {
          setOpenQrCodeModal(false);
        }}
      />
    </>
  );
};

export default DoAttendanceTable;
