"use client";

import useSWR from "swr";

export const useCourseDetails = (id) => {
  const fetcher = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch course details");
    }

    const resJson = await res.json();
    return resJson?.data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/course/${id}` : null, // Hanya fetch jika ID tersedia
    fetcher
  );

  return {
    data,
    isLoading,
    isError: !!error,
    refetch: mutate, // `mutate` dapat digunakan untuk refresh data
  };
};
