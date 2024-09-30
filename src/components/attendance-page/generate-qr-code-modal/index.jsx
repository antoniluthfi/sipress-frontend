"use client";

import Modal from "@/components/modal";
import { useQRCode } from "next-qrcode";

const GenerateQrCodeModal = ({ isModalOpen, closeModal }) => {
  const { Canvas } = useQRCode();

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="flex flex-col gap-5 items-center justify-center"
    >
      <div>
        <h2 className="text-xl font-bold text-center">S1 Teknik Informatika</h2>
        <p className="text-base text-center">
          Introduction to Computer Science
        </p>
      </div>

      <Canvas
        text={"https://github.com/bunlong/next-qrcode"}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 800,
        }}
        className="w-full max-w-[800px]"
      />
    </Modal>
  );
};

export default GenerateQrCodeModal;
