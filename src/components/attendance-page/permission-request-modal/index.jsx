"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useParams } from "next/navigation";

const formSchema = z.object({
  remarks: z.string().min(1, "Keterangan wajib diisi."),
  file: z
    .custom((value) => value instanceof File, {
      message: "Gambar wajib diunggah.",
    })
    .optional(),
});

const PermissionRequestModal = ({ studentId, isModalOpen, closeModal, onSuccess }) => {
  const params = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      remarks: "",
      file: undefined,
    },
  });

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
      
      form.setValue("file", file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      form.setValue("file", "");
      setImagePreview(null);
    }
  };
  
  const onSubmit = async (data) => {
    const { remarks, file } = data;

    const formData = new FormData();
    formData.append('course_meeting_id', params?.courseMeetingId || '');
    formData.append('course_id', params?.id || '');
    formData.append('student_id', studentId || '');
    formData.append('latitude', '');
    formData.append('longitude', '');
    formData.append('qr_code', '');
    formData.append('status', 'permission');
    formData.append('remarks', remarks);

    if (file) {
      formData.append("file", file);
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/record`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        const response = await res.json();
        toast({
          title: "Success",
          description:
            response?.message || "Izin berhasil ditambahkan.",
          variant: "success",
        });
        onSuccess?.();
        form.reset(); // Reset form values
        closeModal();
      } else {
        const errorData = await res.json();
        toast({
          title: "Failed",
          description: errorData?.error || errorData?.errors?.[0]?.msg,
          variant: "danger",
        });
      }
    } catch (err) {
      console.log("err", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        form.reset();
        closeModal();
      }}
      className="flex flex-col gap-5 items-center justify-center"
    >
      <h2 className="text-xl font-bold">Form Izin</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keterangan</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Masukkan Keterangan"
                    className="h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="file"
            render={() => (
              <FormItem>
                <FormLabel>Gambar (Opsional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className="h-[50px]"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {imagePreview && (
            <div className="lg:col-span-2">
              <FormLabel>Preview Gambar</FormLabel>
              <Image
                src={imagePreview}
                alt="Preview Gambar"
                width={300} // Ganti sesuai kebutuhan
                height={200} // Ganti sesuai kebutuhan
                className="max-w-sm h-auto"
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-2 w-full mt-4">
            <Button
              onClick={() => {
                form.reset();
                closeModal();
              }}
              className="font-bold w-1/2 bg-red-500"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="font-bold w-1/2 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Kirim"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default PermissionRequestModal;
