/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectLecturerInput from "../select-lecturer-input";
import SelectLocationInput from "../select-location-input";
import { Trash } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Mata kuliah harus diisi." }),
  code: z.string().min(1, { message: "Kode Mata kuliah harus diisi." }),
  lecturer_id: z.number().min(1, { message: "Dosen harus diisi." }),
  location_id: z.number().min(1, { message: "Ruangan harus diisi." }),
  meeting_total: z
    .string()
    .min(1, { message: "Jumlah pertemuan harus diisi." }),
  meetings: z
    .array(
      z.object({
        meeting_number: z.number().min(1),
        date: z.string().min(1, { message: "Tanggal harus diisi." }),
        start_time: z.string().min(1, { message: "Jam mulai harus diisi." }),
        end_time: z.string().min(1, { message: "Jam selesai harus diisi." }),
      })
    )
    .min(1, { message: "Setidaknya satu sesi harus diisi." })
    .refine(
      (meetings) =>
        meetings.every((meeting) => meeting.start_time < meeting.end_time),
      {
        message: "Jam selesai harus lebih lambat dari jam mulai.",
        path: ["meetings"],
      }
    ),
});

const CourseForm = ({ defaultValues, onSubmit, mode }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "meetings",
  });

  const sessionTotal = useWatch({
    control: form.control,
    name: "meeting_total",
  });

  useEffect(() => {
    const currentSessions = form.getValues("meetings");
    const newSessions = Array.from({ length: sessionTotal }, (_, index) => {
      return (
        currentSessions[index] || {
          meeting_number: index + 1,
          date: "",
          start_time: "",
          end_time: "",
        }
      );
    });
    form.setValue("meetings", newSessions);
  }, [sessionTotal]);

  const isViewMode = mode === "view";

  const renderMinimumDate = (index) => {
    if (index > 0) {
      const prevDate = form.getValues(`meetings.${index - 1}.date`);
      if (prevDate) {
        const date = new Date(prevDate);
        date.setDate(date.getDate() + 1); // Tambahkan 1 hari
        return date.toISOString().split("T")[0]; // Format ke 'YYYY-MM-DD'
      }

      return undefined;
    }

    return undefined;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={isViewMode ? undefined : form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col items-end"
      >
        <div className="w-full grid grid-flow-row lg:grid-cols-2 gap-5 items-center">
          {/* Input Fields */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Masukkan Nama Mata Kuliah"
                    className="h-[50px]"
                    disabled={isViewMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Mata Kuliah</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Masukkan Kode Mata Kuliah"
                    className="h-[50px]"
                    disabled={isViewMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Select Inputs */}
          <FormField
            control={form.control}
            name="lecturer_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosen</FormLabel>
                <FormControl>
                  <SelectLecturerInput
                    ref={field.ref}
                    value={field.value}
                    disabled={isViewMode}
                    onSelectOption={(val) => {
                      form.setValue("lecturer_id", val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ruangan</FormLabel>
                <FormControl>
                  <SelectLocationInput
                    ref={field.ref}
                    value={field.value}
                    disabled={isViewMode}
                    onSelectOption={(val) => {
                      form.setValue("location_id", val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meeting_total"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Pertemuan</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Masukkan Jumlah Pertemuan"
                    className="h-[50px]"
                    min={1}
                    disabled={isViewMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="w-full grid grid-flow-row lg:grid-cols-5 gap-5 items-center py-5 border-b-2 border-secondary"
            >
              <FormLabel>Pertemuan ke-{index + 1}</FormLabel>
              <FormField
                control={form.control}
                name={`meetings.${index}.date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="h-[50px]"
                        disabled={isViewMode}
                        min={renderMinimumDate(index)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`meetings.${index}.start_time`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Mulai</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        className="h-[50px]"
                        disabled={isViewMode}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`meetings.${index}.end_time`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Selesai</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        className="h-[50px]"
                        disabled={isViewMode}
                        min={
                          form.getValues(`meetings.${index}.start_time`) ||
                          undefined
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isViewMode && (
                <Button
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="mt-6 gap-2"
                >
                  <Trash className="w-5 h-5" />
                  Hapus
                </Button>
              )}
            </div>
          ))}
          {!isViewMode && (
            <Button
              variant="default"
              onClick={() =>
                append({
                  meeting_number: fields.length + 1,
                  date: "",
                  start_time: "",
                  end_time: "",
                })
              }
              className="mt-4"
            >
              Tambah Pertemuan
            </Button>
          )}
        </div>
        {!isViewMode && <Button variant="default">Submit</Button>}
      </form>
    </Form>
  );
};

export default CourseForm;
