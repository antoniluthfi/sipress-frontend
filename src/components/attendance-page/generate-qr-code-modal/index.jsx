"use client";

import LoadingSpinner from "@/components/loading-spinner";
import Modal from "@/components/modal";
import { useGenerateQrCode } from "@/lib/api/useGenerateQrCode";
import { useQRCode } from "next-qrcode";

const GenerateQrCodeModal = ({
  isModalOpen,
  closeModal,
  courseId,
  courseName,
}) => {
  const { Canvas } = useQRCode();
  const { data, isLoading } = useGenerateQrCode({
    courseMeetingId: courseId,
    enable: isModalOpen,
  });

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="flex flex-col gap-5 items-center justify-center"
    >
      <div>
        <h2 className="text-xl font-bold text-center">S1 Teknik Informatika</h2>
        <p className="text-base text-center">{courseName}</p>
      </div>

      {isLoading ? (
        <LoadingSpinner isLoading={isLoading} />
      ) : (
        <Canvas
          text={data?.qr_code || "-"}
          options={{
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 800,
          }}
          className="w-full max-w-[800px]"
        />
      )}
    </Modal>
  );
};

export default GenerateQrCodeModal;
