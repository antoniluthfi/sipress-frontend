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
import { Badge } from "@/components/ui/badge";
import PermissionRequestModal from "../permission-request-modal";

const ManualAttendanceTable = ({ data, courseName, refreshData }) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
  const [selectedCourseMeetingId, setSelectedCourseMeetingId] = useState("");
  const [openPermissionRequest, setOpenPermissionRequest] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const getStatus = (status) => {
    switch (status) {
      case "present":
        return "HADIR";
      case "permission":
        return "IZIN";
      case "sick":
        return "SAKIT";
      case "absent":
        return "ALFA";
      default:
        return "BELUM ABSEN";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "success";
      case "permission":
        return "default";
      case "sick":
        return "secondary";
      default:
        return "danger";
    }
  };

  const columns = [
    {
      accessorKey: "user_id",
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
        <div className="text-center">{row.getValue("user_id")}</div>
      ),
    },
    {
      accessorKey: "user_name",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div>{row.getValue("user_name")}</div>,
    },
    {
      accessorKey: "identification_number",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            NIM
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div>{row.getValue("identification_number")}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Absensi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <Badge variant={getStatusColor(row.getValue("status"))}>
            {getStatus(row.getValue("status"))}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "remarks",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Keterangan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div>{row.getValue("remarks")}</div>,
    },
    {
      accessorKey: "attendance_time",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Waktu Absensi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const attendanceTime = row.getValue("attendance_time");

        if (attendanceTime) {
          const formattedAttendanceTime = format(
            new Date(row.getValue("attendance_time")),
            "eeee, dd MMMM yyyy HH:mm",
            { locale: id }
          );

          return <div>{formattedAttendanceTime} WIB</div>;
        }

        return <div>{attendanceTime}</div>;
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
        const attendanceTime = row.getValue("attendance_time");

        return (
          <div className="flex items-center justify-center gap-2">
            <Button disabled={!!attendanceTime}>Hadir</Button>
            <Button
              variant="destructive"
              onClick={() => {
                const id = row.getValue("user_id");

                setSelectedStudentId(id);
                setOpenPermissionRequest(true);
              }}
              disabled={!!attendanceTime}
            >
              Izin
            </Button>
            <Button variant="destructive" disabled={!!attendanceTime}>
              Sakit
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
      <PermissionRequestModal
        studentId={selectedStudentId}
        isModalOpen={openPermissionRequest}
        closeModal={() => {
          setOpenPermissionRequest(false);
          setSelectedStudentId("");
        }}
        onSuccess={() => {
          refreshData();
          setOpenPermissionRequest(false);
          setSelectedStudentId("");
        }}
      />
    </>
  );
};

export default ManualAttendanceTable;
