"use client";

import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import GenerateQrCodeModal from "../generate-qr-code-modal";
import { format, isBefore, isAfter, addMinutes } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { id } from "date-fns/locale";

const DoAttendanceTable = ({ data, courseName }) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
  const [selectedCourseMeetingId, setSelectedCourseMeetingId] = useState("");

  const isQrCodeDisabled = (date, startTime, endTime) => {
    const now = new Date();

    const deviceTimezoneOffset = new Date().getTimezoneOffset();
    const dateOnly = addMinutes(new Date(date), -deviceTimezoneOffset);

    const startDateTime = new Date(
      `${dateOnly.toISOString().split("T")[0]}T${startTime}`
    );
    const endDateTime = new Date(
      `${dateOnly.toISOString().split("T")[0]}T${endTime}`
    );

    return isBefore(now, startDateTime) || isAfter(now, endDateTime);
  };

  const columns = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "meeting_number",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pertemuan ke
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("meeting_number")}</div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        const formattedDate = format(date, "eeee, dd MMMM yyyy", { locale: id });

        return <div className="text-center">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "start_time",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Waktu Mulai
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const formattedStartTime = row.getValue("start_time").substring(0, 5); // HH:mm
        return <div className="text-center">{formattedStartTime}</div>;
      },
    },
    {
      accessorKey: "end_time",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Waktu Selesai
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const formattedEndTime = row.getValue("end_time").substring(0, 5); // HH:mm
        return <div className="text-center">{formattedEndTime}</div>;
      },
    },
    {
      accessorKey: "functions",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Aksi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const date = row.getValue("date");
        const startTime = row.getValue("start_time");
        const endTime = row.getValue("end_time");

        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => {
                router.push(
                  `/attendance/do/${
                    params?.id
                  }/manual-attendance/${row.getValue("id")}`
                );
              }}
            >
              Absensi Manual
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                const disabled = isQrCodeDisabled(date, startTime, endTime);
                if (disabled) {
                  toast({
                    title: "Failed",
                    description:
                      "Kode QR tidak bisa dibuat diluar rentang waktu yang telah ditentukan!",
                    variant: "danger",
                  });
                } else {
                  setSelectedCourseMeetingId(row.getValue("id"));
                  setOpenQrCodeModal(true);
                }
              }}
              disabled={isQrCodeDisabled(date, startTime, endTime)}
            >
              Absensi Kode QR
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />
      <GenerateQrCodeModal
        courseMeetingId={selectedCourseMeetingId}
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
