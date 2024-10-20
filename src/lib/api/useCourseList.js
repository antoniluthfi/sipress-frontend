"use client";

import { useEffect, useState } from "react";

export const useCourseList = ({ page = 1, limit = 5, search = "" }) => {
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/course?page=${page}&limit=${limit}&search=${search}`,
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
        setPagination(resJson?.pagination || null);
      }
    } catch (error) {
      console.log("error useCourseList: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, search]);

  return { data, pagination, isLoading };
};
