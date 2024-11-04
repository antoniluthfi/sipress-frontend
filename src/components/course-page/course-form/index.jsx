"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import AutocompleteInput from "@/components/autocomplete-input";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Mata kuliah harus diisi." }),
  code: z.string().min(1, { message: "Kode Mata kuliah harus diisi." }),
  lecturer_id: z.number().min(1, { message: "Dosen harus diisi." }),
  room: z.string().min(1, { message: "Ruangan harus diisi." }),
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
    .min(1, { message: "Setidaknya satu sesi harus diisi." }),
});

const CourseForm = ({ defaultValues, onSubmit, mode }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
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

  // Menonaktifkan input jika dalam mode view
  const isViewMode = mode === "view";

  return (
    <Form {...form}>
      <form
        onSubmit={isViewMode ? undefined : form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col items-end"
      >
        <div className="w-full grid grid-cols-2 gap-5 items-center">
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
          <FormField
            control={form.control}
            name="lecturer_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosen</FormLabel>
                <FormControl>
                  <AutocompleteInput
                    {...field}
                    suggestions={[
                      { id: 1, name: "Antoni" },
                      { id: 2, name: "Jono" },
                      { id: 3, name: "Sumarno" },
                      { id: 4, name: "Haniek" },
                    ]}
                    placeholder="Masukkan Nama Dosen"
                    disabled={isViewMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ruangan</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Masukkan Ruangan"
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
          {form.watch("meetings").map((_, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-4 gap-5 items-center py-5 border-b-2 border-secondary"
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
        {!isViewMode && <Button variant="default">Submit</Button>}
      </form>
    </Form>
  );
};

export default CourseForm;
