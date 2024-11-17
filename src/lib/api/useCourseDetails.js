/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

export const useCourseDetails = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/course/${id}`,
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
      }
    } catch (error) {
      console.log("error useCourseDetails: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return { data, isLoading };
};
