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
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),
  longitude: z.string().min(1, { message: "Koordinat bujur harus diisi" }),
  latitude: z.string().min(1, { message: "Koordinat lintang harus diisi" }),
  radius: z.string().min(1, { message: "Jarak dalam radius harus diisi" }),
  file_path: z
    .custom((value) => value instanceof File, {
      message: "Gambar wajib diunggah.",
    })
    .optional(),
});

const LocationForm = ({ mode, defaultValues, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran file maksimal 2 MB
      const maxSizeInMB = 2;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        toast({
          title: "File Terlalu Besar",
          description: `Ukuran file tidak boleh lebih dari ${maxSizeInMB} MB.`,
          variant: "danger",
        });
        return;
      }

      form.setValue("file_path", file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      form.setValue("file_path", ""); // Set ke string kosong jika tidak ada file
      setImagePreview(null);
    }
  };

  const isViewMode = mode === "view";

  useEffect(() => {
    if (mode !== "new" && defaultValues?.file_path) {
      setImagePreview(
        process.env.NEXT_PUBLIC_BE_URL + defaultValues?.file_path
      );
    }
  }, [mode, defaultValues?.file_path]);

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
              <FormLabel>Nama Ruangan</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Masukkan Nama Ruangan"
                  className="h-[50px]"
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Latitude */}
        <FormField
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Koordinat Lintang</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Masukkan Koordinat Lintang"
                  className="h-[50px]"
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Longitude */}
        <FormField
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Koordinat Bujur</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Masukkan Koordinat Bujur"
                  className="h-[50px]"
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input Radius */}
        <FormField
          name="radius"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jarak Dalam Radius (meter)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Masukkan Radius"
                  className="h-[50px]"
                  disabled={isViewMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isViewMode && (
          <FormField
            name="file_path"
            render={() => (
              <FormItem>
                <FormLabel>Foto Denah</FormLabel>
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
            <FormLabel>Preview Denah</FormLabel>
            <Image
              src={imagePreview}
              alt="Preview Denah"
              width={300} // Ganti sesuai kebutuhan
              height={200} // Ganti sesuai kebutuhan
              className="max-w-sm h-auto"
              priority
            />
          </div>
        )}

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

export default LocationForm;
