"use client";

import useAuthStore from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import { PATH_NAME } from "../utils";

export const useAuthenticateUser = (route) => {
  const pathName = usePathname();
  const router = useRouter();
  const { saveUser, removeUser } = useAuthStore();

  const fetcher = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch authenticated user");
    }

    const resJson = await res.json();
    saveUser(resJson?.data); // Simpan user ke store
    return resJson?.data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    pathName
      ? `${process.env.NEXT_PUBLIC_API_URL}/auth/authenticated-user`
      : null, // Hanya fetch jika pathName ada
    fetcher,
    {
      onError: () => {
        removeUser(); // Hapus user jika terjadi error
        router.push(route?.redirectRoute || PATH_NAME.LOGIN);
      },
      onSuccess: () => {
        router.push(route?.authenticatedRedirectRoute || PATH_NAME.DASHBOARD);
      },
    }
  );

  return {
    data,
    isLoading,
    isError: !!error,
    refetch: mutate, // SWR menyediakan `mutate` untuk refresh data
  };
};
