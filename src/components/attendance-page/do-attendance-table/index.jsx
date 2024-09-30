"use client";

import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import GenerateQrCodeModal from "../generate-qr-code-modal";

const DoAttendanceTable = () => {
  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);

  const columns = [
    {
      accessorKey: "meeting",
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
        <div className="text-center">{row.getValue("meeting")}</div>
      ),
    },
    {
      accessorKey: "room",
      header: ({ column }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Ruangan
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("room")}</div>
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
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("date")}</div>
      ),
    },
    {
      accessorKey: "time",
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
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("time")}</div>
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

  const data = [
    {
      id: "m5gr84i9",
      meeting: 1,
      date: "13 September 2023",
      time: "09.00 - 12.00",
      room: "LT1-2A",
    },
    {
      id: "3u1reuv4",
      meeting: 2,
      date: "13 September 2023",
      time: "09.00 - 12.00",
      room: "LT1-2A",
    },
    {
      id: "derv1ws0",
      meeting: 3,
      date: "13 September 2023",
      time: "09.00 - 12.00",
      room: "LT1-2A",
    },
    {
      id: "5kma53ae",
      meeting: 4,
      date: "13 September 2023",
      time: "09.00 - 12.00",
      room: "LT1-2A",
    },
    {
      id: "bhqecj4p",
      meeting: 5,
      date: "13 September 2023",
      time: "09.00 - 12.00",
      room: "LT1-2A",
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />
      <GenerateQrCodeModal
        isModalOpen={openQrCodeModal}
        closeModal={() => {
          setOpenQrCodeModal(false);
        }}
      />
    </>
  );
};

export default DoAttendanceTable;
