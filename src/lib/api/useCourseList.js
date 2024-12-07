"use client";

import { useMemo } from "react";
import useSWR from "swr";

export const useCourseList = ({
  page = 1,
  limit = 5,
  search = "",
  lecturer_id = "",
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
      throw new Error("Failed to fetch course list");
    }

    const resJson = await res.json();
    return {
      data: resJson?.data || null,
      pagination: resJson?.pagination || null,
    };
  };

  const apiUrl = useMemo(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/course?page=${page}&limit=${limit}&search=${search}`;

    if (lecturer_id) {
      return `${url}&lecturer_id=${lecturer_id}`;
    }

    return url;
  }, [page, limit, search, lecturer_id]);

  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  return {
    data: data?.data || null,
    pagination: data?.pagination || null,
    isLoading,
    isError: !!error,
    refetch: mutate, // Menggunakan `mutate` untuk memuat ulang data
  };
};
