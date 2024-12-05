/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

export const useUserCoursesList = ({
  page = 1,
  limit = 5,
  search = "",
  course_id = "",
}) => {
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-course?page=${page}&limit=${limit}&course_id=${course_id}&search=${search}`,
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
      console.log("error useUserCoursesList: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, search, course_id]);

  return { data, pagination, isLoading, refetch: fetchData };
};
