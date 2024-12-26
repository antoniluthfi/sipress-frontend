"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { useToast } from "@/components/ui/use-toast";
import { isDev } from "@/lib/utils";

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Email tidak valid." })
    .min(1, { message: "Email harus diisi." }),
});

const LoginPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // email: isDev ? "dosen1@gmail.com" : "",
      email: isDev ? "antoni10@gmail.com" : "",
    },
  });

  const { toast } = useToast();
  useAuthenticateUser();

  const onSubmit = async (data) => {
    const { email } = data;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      if (res.ok) {
        const response = await res.json();

        toast({
          title: "Success",
          description: response?.message,
          variant: "success",
        });
        router.push("/login");
      } else {
        const errorData = await res.json();
        toast({
          title: "Failed",
          description:
            errorData?.error || errorData?.errors?.[0]?.msg || "Login Failed",
          variant: "danger",
        });
      }
    } catch (err) {
      toast({
        title: "Failed",
        description: err?.message || "Internal Server Error",
        variant: "danger",
      });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[url('/images/bg_work.png')] bg-cover">
      <div className="w-[630px] h-[740px] bg-white bg-opacity-30 rounded-sm p-4">
        <div className="w-full h-2/4 bg-[#253763] rounded-t-sm flex flex-col gap-4 items-center justify-center">
          <Image
            src="/images/ic_logo.png"
            width={163}
            height={136}
            alt="logo"
            priority
          />
          <h2 className="text-white text-4xl font-bold text-center">
            LUPA PASSWORD
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-2/4 bg-[#E0E0E0] rounded-b-sm flex flex-col gap-4 items-center justify-center p-10"
          >
            <div className="w-full flex flex-col gap-7">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        className="h-[50px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <Link href="/login" className="text-[#1E73BE]">
                Login
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-[60px] bg-[#253763] rounded-md text-2xl"
            >
              Kirim Email
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default LoginPage;
