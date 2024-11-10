"use client";

import { useEffect, useState } from "react";
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
  identification_number: z.string().min(1, { message: "NIM harus diisi" }),
  address: z.string().min(1, { message: "Alamat harus diisi" }),
  phone_number: z.string().min(1, { message: "Nomor telpon harus diisi" }),
  profile_url: z.any(),
  status: z.string().min(1, { message: "Status harus diisi" }),
});

const StudentForm = ({ mode, defaultValues, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue("profile_url", file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      form.setValue("profile_url", ""); // Set ke string kosong jika tidak ada file
      setImagePreview(null);
    }
  };

  const isViewMode = mode === "view";

  useEffect(() => {
    if (mode !== "new" && defaultValues?.profile_url) {
      setImagePreview(
        process.env.NEXT_PUBLIC_BE_URL + defaultValues?.profile_url
      );
    }
  }, [mode, defaultValues?.profile_url]);

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
                    <SelectItem value="male">Laki-laki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input NIM */}
        <FormField
          name="identification_number"
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
          name="phone_number"
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
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Profile Image */}
        {!isViewMode && (
          <FormField
            name="profile_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className="h-[50px]"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isViewMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Preview Gambar */}
        {imagePreview && (
          <div className="lg:col-span-2">
            <FormLabel>Image Preview</FormLabel>
            <img src={imagePreview} alt="Preview" className="max-w-sm h-auto" />
          </div>
        )}

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

export default StudentForm;
