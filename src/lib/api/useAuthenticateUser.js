"use client";

import useAuthStore from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthenticateUser = () => {
  const pathName = usePathname();
  const router = useRouter();
  const {saveUser, removeUser} = useAuthStore();

  const [data, setData] = useState(null);

  const fetchData = async () => {
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

    if (res.ok) {
      const resJson = await res.json();
      setData(resJson?.data || null);
      saveUser(resJson?.data);

      if (['/', '/login'].includes(pathName)) {
        router.push('/dashboard');
      }
    } else {
      removeUser();
      router.push("/login");
    }
  };

  useEffect(() => {
    if (pathName) {
      fetchData();
    }
  }, [pathName]);

  return data;
};
