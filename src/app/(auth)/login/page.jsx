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

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Email tidak valid." })
    .min(1, { message: "Email harus diisi." }),
  password: z
    .string()
    .min(8, { message: "Password harus minimal 8 karakter." }),
});

const LoginPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "antoni@gmail.com",
      password: "12345678",
    },
  });

  useAuthenticateUser();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await res.json();
        console.log(errorData.message || "Login failed");
      }
    } catch (err) {
      console.log("An error occurred");
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
            LOGIN TO YOUR ACCOUNT
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="h-[50px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms2" />
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </label>
              </div>

              <Link href="/" className="text-[#1E73BE]">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-[60px] bg-[#253763] rounded-md text-2xl"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default LoginPage;
