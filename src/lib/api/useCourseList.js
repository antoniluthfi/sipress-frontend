"use client";

import useSWR from "swr";

export const useCourseList = ({ page = 1, limit = 5, search = "" }) => {
  const fetcher = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch course list");
    }

    const resJson = await res.json();
    return {
      data: resJson?.data || null,
      pagination: resJson?.pagination || null,
    };
  };

  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/course?page=${page}&limit=${limit}&search=${search}`,
    fetcher
  );

  return {
    data: data?.data || null,
    pagination: data?.pagination || null,
    isLoading,
    isError: !!error,
    refetch: mutate, // Menggunakan `mutate` untuk memuat ulang data
  };
};
