"use client";

import useSWR from "swr";
import { SWR_CONFIG } from "../utils";

export const useUserCoursesList = ({
  page = 1,
  limit = 5,
  search = "",
  course_id = "",
  include_attendance_recap = 0,
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
    `${process.env.NEXT_PUBLIC_API_URL}/user-course?page=${page}&limit=${limit}&course_id=${course_id}&include_attendance_recap=${include_attendance_recap}&search=${search}`,
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
