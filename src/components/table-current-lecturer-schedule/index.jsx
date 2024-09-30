"use client";

import React from "react";
import DataTable from "../data-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

const TableCurrentLecturerSchedule = () => {
  const columns = [
    {
      accessorKey: "course",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mata Kuliah
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("course")}</div>
      ),
    },
    {
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jam
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("time")}</div>
      ),
    },
    {
      accessorKey: "room",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ruangan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase text-center">{row.getValue("room")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="uppercase text-center">
          <Badge variant="success">Selesai</Badge>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: "m5gr84i9",
      course: "Introduction to Computer Science",
      time: "09.00",
      room: "LT1-2A",
    },
    {
      id: "3u1reuv4",
      course: "Introduction to Computer Science",
      time: "09.00",
      room: "LT1-2A",
    },
    {
      id: "derv1ws0",
      course: "Introduction to Computer Science",
      time: "09.00",
      room: "LT1-2A",
    },
    {
      id: "5kma53ae",
      course: "Introduction to Computer Science",
      time: "09.00",
      room: "LT1-2A",
    },
    {
      id: "bhqecj4p",
      course: "Introduction to Computer Science",
      time: "09.00",
      room: "LT1-2A",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      filterComponent={({ table }) => (
        <Input
          placeholder="Filter mata kuliah..."
          value={table.getColumn("course")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("course")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )}
    />
  );
};

export default TableCurrentLecturerSchedule;
