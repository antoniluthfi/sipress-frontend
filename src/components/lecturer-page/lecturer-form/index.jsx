"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),
  email: z.string().email({ message: "Email tidak valid" }),
  gender: z.string().min(1, { message: "Jenis kelamin harus diisi" }),
  nim: z.string().min(1, { message: "NIM harus diisi" }),
  address: z.string().min(1, { message: "Alamat harus diisi" }),
  phoneNumber: z.string().min(1, { message: "Nomor telpon harus diisi" }),
  profileUrl: z.any(),
  status: z.string().min(1, { message: "Status harus diisi" }),
});

const LecturerForm = ({ mode, defaultValues, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Menonaktifkan input jika dalam mode view
  const isViewMode = mode === "view";

  return (
    <Form {...form}>
      <form
        onSubmit={isViewMode ? undefined : form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {/* Input Name */}
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Masukkan Nama"
                  className="h-[50px]"
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Email */}
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Masukkan Email"
                  className="h-[50px]"
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Gender */}
        <FormField
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isViewMode}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input NIM */}
        <FormField
          name="nim"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIM</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Masukkan NIM"
                  className="h-[50px]"
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Phone Number */}
        <FormField
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Masukkan Nomor Telpon"
                  className="h-[50px]"
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Profile URL */}
        <FormField
          name="profileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  className="h-[50px]"
                  accept="image/*"
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Status */}
        <FormField
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isViewMode}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Address */}
        <FormField
          name="address"
          render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Masukkan Alamat"
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        {!isViewMode && (
          <div className="lg:col-span-2">
            <Button type="submit">Submit</Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default LecturerForm;
