"use client";

import useSWR from "swr";
import { SWR_CONFIG } from "../utils";

export const useLatestAnnouncementList = ({
  page = 1,
  limit = 5,
  search = "",
  role = "",
}) => {
  const fetcher = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user list");
    }

    const resJson = await res.json();
    return {
      data: resJson?.data || null,
      pagination: resJson?.pagination || null,
    };
  };

  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/scrape/latest-announcement?page=${page}&limit=${limit}&search=${search}&role=${role}`,
    fetcher,
    SWR_CONFIG
  );

  return {
    data: data?.data || null,
    pagination: data?.pagination || null,
    isLoading,
    isError: !!error,
    refetch: mutate, // Menggunakan `mutate` untuk memuat ulang data
  };
};
