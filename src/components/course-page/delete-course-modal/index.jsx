import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";

const DeleteCourseModal = ({ isModalOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="flex flex-col gap-5 items-center justify-center"
    >
      <h2 className="text-xl font-bold">Peringatan</h2>
      <p>Apakah Anda yakin ingin menghapus data tersebut?</p>
      <div className="flex items-center justify-between gap-2 w-full">
        <Button
          onClick={closeModal}
          className="font-bold mt-4 w-1/2"
        >
          Tidak
        </Button>
        <Button onClick={closeModal} className="font-bold mt-4 w-1/2 bg-red-500 text-white">
          Hapus
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteCourseModal;
