"use client";

import useSWR from "swr";
import { SWR_CONFIG } from "../utils";

export const useAttendanceRecordList = ({
  page = 1,
  limit = 5,
  search = "",
  course_meeting_id = "",
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
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };

  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/attendance/records?page=${page}&limit=${limit}&course_meeting_id=${course_meeting_id}&search=${search}`,
    fetcher,
    SWR_CONFIG
  );

  return {
    data: data?.data || null,
    pagination: data?.pagination || null,
    isLoading,
    isError: !!error,
    refetch: mutate, // SWR menyediakan `mutate` untuk me-refresh data
  };
};
