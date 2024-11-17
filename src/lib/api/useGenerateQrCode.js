/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export const useGenerateQrCode = ({ courseMeetingId, enable = false }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const generateQrCode = async () => {
    try {
      setIsLoading(true);

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

      if (!res.ok) {
        throw new Error("Failed to generate QR code");
      }

      const resJson = await res.json();
      setData(resJson?.data || null);
    } catch (error) {
      console.log("error generateQrCode: ", error);
      toast({
        title: "Failed",
        description: error.message,
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshQrCode = async () => {
    try {
      setIsLoading(true);

      console.log(data);
      if (!data?.id) throw new Error("QR code data is missing");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qr-code/refresh/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qr_code: data.qr_code }),
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to refresh QR code");

      const resJson = await res.json();
      setData(resJson?.data || null);
    } catch (error) {
      console.log("error refreshQrCode: ", error);
      toast({
        title: "Failed",
        description: error.message,
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteQrCode = async () => {
    try {
      setIsLoading(true);

      if (!data?.id) throw new Error("QR code data is missing");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qr-code/${data.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to delete QR code");

      const resJson = await res.json();
      setData(resJson?.data || null);
    } catch (error) {
      console.log("error deleteQrCode: ", error);
      toast({
        title: "Failed",
        description: error.message,
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval;

    if (enable && !data) {
      generateQrCode();
    }

    if (enable && data?.id) {
      interval = setInterval(() => {
        refreshQrCode();
      }, 50000); // 50 detik
    }

    if (!enable && data?.id) {
      deleteQrCode();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [enable, data]);

  return { data, isLoading };
};
