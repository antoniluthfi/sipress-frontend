/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useAuthStore from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { PATH_NAME } from "../utils";

export const useAuthenticateUser = (route) => {
  const pathName = usePathname();
  const router = useRouter();
  const { saveUser, removeUser } = useAuthStore();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/authenticated-user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch authenticated user");
      }

      const resJson = await res.json();
      setData(resJson?.data || null);
      saveUser(resJson?.data);
      router.push(route?.authenticatedRedirectRoute || PATH_NAME.DASHBOARD);
    } catch (error) {
      console.error("Authentication failed:", error);
      removeUser();
      router.push(route?.redirectRoute || PATH_NAME.LOGIN);
    } finally {
      setIsLoading(false);
    }
  }, [route]);

  useEffect(() => {
    let isMounted = true;

    if (pathName && isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [pathName]);

  return { data, isLoading };
};
