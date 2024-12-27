import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { useState } from "react";

const PresentModal = ({ studentId, isModalOpen, closeModal, onSuccess }) => {
  const params = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("course_meeting_id", params?.courseMeetingId || "");
    formData.append("course_id", params?.id || "");
    formData.append("student_id", studentId || "");
    formData.append("latitude", "0.00000000");
    formData.append("longitude", "0.00000000");
    formData.append("qr_code", "-");
    formData.append("status", "present");
    formData.append("remarks", "Absensi Manual");

    try {
      setIsSubmitting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/attendance/record`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (res.ok) {
        const response = await res.json();
        toast({
          title: "Success",
          description: response?.message || "Izin berhasil ditambahkan.",
          variant: "success",
        });
        onSuccess?.();
        closeModal();
      } else {
        const errorData = await res.json();
        toast({
          title: "Failed",
          description: errorData?.error || errorData?.errors?.[0]?.msg || errorData?.message,
          variant: "danger",
        });
      }
    } catch (err) {
      console.log("err", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="flex flex-col gap-5 items-center justify-center w-[300px]"
    >
      <h2 className="text-xl font-bold">Peringatan</h2>
      <p>Apakah Anda yakin?</p>
      <div className="flex items-center justify-between gap-2 w-full mt-4">
        <Button onClick={closeModal} className="font-bold w-1/2 bg-red-500">
          Batal
        </Button>
        <Button
          type="submit"
          className="font-bold w-1/2 text-white"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Memproses..." : "Ya"}
        </Button>
      </div>
    </Modal>
  );
};

export default PresentModal;
