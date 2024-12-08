/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useSWR from "swr";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { SWR_CONFIG } from "../utils";

export const useGenerateQrCode = ({ courseMeetingId, enable = false }) => {
  const { toast } = useToast();

  // Fetcher untuk generate QR Code
  const generateQrCodeFetcher = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/qr-code/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course_meeting_id: courseMeetingId }),
        credentials: "include",
      }
    );

    if (!res.ok) throw new Error("Failed to generate QR code");

    return await res.json();
  };

  // Hook SWR untuk generate QR Code
  const { data, error, isLoading, mutate } = useSWR(
    enable && courseMeetingId
      ? `${process.env.NEXT_PUBLIC_API_URL}/qr-code/generate-${courseMeetingId}`
      : null,
    generateQrCodeFetcher,
    SWR_CONFIG
  );

  // Refresh QR Code
  const refreshQrCode = async () => {
    try {
      if (!data?.data?.id) throw new Error("QR code data is missing");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qr-code/refresh/${data.data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qr_code: data.data.qr_code }),
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to refresh QR code");

      const refreshedData = await res.json();
      mutate({ ...data, data: refreshedData?.data });
    } catch (error) {
      console.error("Error refreshing QR code:", error);
      toast({
        title: "Failed",
        description: error.message,
        variant: "danger",
      });
    }
  };

  // Delete QR Code
  const deleteQrCode = async () => {
    try {
      if (!data?.data?.id) throw new Error("QR code data is missing");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qr-code/${data.data.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to delete QR code");

      mutate(null, { revalidate: false });
    } catch (error) {
      console.error("Error deleting QR code:", error);
      toast({
        title: "Failed",
        description: error.message,
        variant: "danger",
      });
    }
  };

  // Interval untuk refresh QR code
  useEffect(() => {
    let interval;

    if (enable && data?.data?.id) {
      interval = setInterval(() => {
        refreshQrCode();
      }, 50000); // 50 detik
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [enable, data?.data?.id]);

  // Delete QR code jika `enable` berubah menjadi `false`
  useEffect(() => {
    if (!enable && data?.data?.id) {
      deleteQrCode();
    }
  }, [enable, data?.data?.id]);

  return {
    data: data?.data || null,
    isLoading,
    isError: !!error,
    refetch: mutate, // Untuk revalidasi manual
  };
};
