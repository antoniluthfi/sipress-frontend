"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import GenerateQrCodeModal from "../generate-qr-code-modal";
import { format, isBefore, isAfter, addMinutes } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { id } from "date-fns/locale";
import Link from "next/link";

const DoAttendanceTable = ({ data, courseName }) => {
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
      alias: "ID",
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
      alias: "Pertemuan ke",
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
        const formattedDate = format(date, "eeee, dd MMMM yyyy", {
          locale: id,
        });

        return <div className="text-center">{formattedDate}</div>;
      },
      alias: "Tanggal",
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
        return <div className="text-center">{formattedStartTime} WIB</div>;
      },
      alias: "Waktu Mulai",
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
        return <div className="text-center">{formattedEndTime} WIB</div>;
      },
      alias: "Waktu Selesai",
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
            <Link
              href={`/attendance/do/${
                params?.id
              }/manual-attendance/${row.getValue("id")}`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#253763] text-white hover:bg-primary/90 h-10 px-4 py-2"
            >
              Absensi Manual
            </Link>
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
      <DataTable columns={columns} columnFilter={columnFilter} data={data} />
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
