"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { SWR_CONFIG } from "../utils";

export const useCourseList = ({
  page = 1,
  limit = 5,
  search = "",
  lecturer_id = "",
  include_upcoming_schedule = 0,
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
    const url = `${process.env.NEXT_PUBLIC_API_URL}/course?page=${page}&limit=${limit}&search=${search}&include_upcoming_schedule=${include_upcoming_schedule}`;

    if (lecturer_id) {
      return `${url}&lecturer_id=${lecturer_id}`;
    }

    return url;
  }, [page, limit, search, lecturer_id, include_upcoming_schedule]);

  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher, SWR_CONFIG);

  return {
    data: data?.data || null,
    pagination: data?.pagination || null,
    isLoading,
    isError: !!error,
    refetch: mutate, // Menggunakan `mutate` untuk memuat ulang data
  };
};
