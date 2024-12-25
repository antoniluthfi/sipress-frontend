"use client";

import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import GenerateQrCodeModal from "../generate-qr-code-modal";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import PermissionRequestModal from "../permission-request-modal";
import SickRequestModal from "../sick-request-modal";
import { useParams } from "next/navigation";
import Image from "next/image";

const ManualAttendanceTable = ({ data, courseName, refreshData }) => {
  const params = useParams();

  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
  const [openPermissionRequest, setOpenPermissionRequest] = useState(false);
  const [openSickRequest, setOpenSickRequest] = useState(false);
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
      accessorKey: "file_path",
      header: ({ column }) => (
        <div className="w-full flex items-center justify-center">
          <Button variant="ghost">Gambar</Button>
        </div>
      ),
      cell: ({ row }) => {
        if (row.getValue("file_path")) {
          const imageLink =
            process.env.NEXT_PUBLIC_BE_URL + row.getValue("file_path");

          return (
            <div
              className="cursor-pointer"
              onClick={() => {
                window.open(imageLink, "_blank");
              }}
            >
              <Image
                src={imageLink}
                width={150}
                height={150}
                alt="attendance image"
                priority
              />
            </div>
          );
        }

        return;
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
            <Button
              variant="destructive"
              onClick={() => {
                const id = row.getValue("user_id");

                setSelectedStudentId(id);
                setOpenSickRequest(true);
              }}
              disabled={!!attendanceTime}
            >
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
        courseMeetingId={params?.courseMeetingId}
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
      <SickRequestModal
        studentId={selectedStudentId}
        isModalOpen={openSickRequest}
        closeModal={() => {
          setOpenSickRequest(false);
          setSelectedStudentId("");
        }}
        onSuccess={() => {
          refreshData();
          setOpenSickRequest(false);
          setSelectedStudentId("");
        }}
      />
    </>
  );
};

export default ManualAttendanceTable;
