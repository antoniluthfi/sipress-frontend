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

const formSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),
  longitude: z.string().min(1, { message: "Koordinat bujur harus diisi" }),
  latitude: z.string().min(1, { message: "Koordinat lintang harus diisi" }),
  radius: z.string().min(1, { message: "Jarak dalam radius harus diisi" }),
});

const LocationForm = ({ mode, defaultValues, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

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
