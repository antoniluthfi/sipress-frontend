"use client";

export const useDownloadAttendanceRecapReport = () => {
  const fetcher = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }
  
    const blob = await response.blob();
    return blob;
  };
  
  const downloadPDF = async (data) => {
    try {
      const blob = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/report/attendance-recap`,
        data
      );
      const url = window.URL.createObjectURL(blob);
      const newWindow = window.open(url, "_blank");
      if (!newWindow) {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "attendance_recap_report.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return { downloadPDF };
};
