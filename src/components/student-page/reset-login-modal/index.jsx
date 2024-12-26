import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ResetLoginModal = ({
  selectedId,
  isModalOpen,
  closeModal,
  onSuccess,
}) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/reset/${selectedId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (res.ok) {
        const response = await res.json();
        toast({
          title: "Success",
          description: response?.message,
          variant: "success",
        });
        onSuccess?.();
      } else {
        const errorData = await res.json();
        toast({
          title: "Failed",
          description: errorData?.error || errorData?.errors?.[0]?.msg,
          variant: "danger",
        });
      }
    } catch (err) {
      console.log("An error occurred");
    } finally {
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="flex flex-col gap-5 items-center justify-center"
    >
      <h2 className="text-xl font-bold">Peringatan</h2>
      <p>Apakah Anda yakin ingin melakukan reset login pada data tersebut?</p>
      <div className="flex items-center justify-between gap-2 w-full">
        <Button onClick={closeModal} className="font-bold mt-4 w-1/2">
          Tidak
        </Button>
        <Button
          onClick={handleDelete}
          className="font-bold mt-4 w-1/2 bg-red-500 text-white"
        >
          Ya
        </Button>
      </div>
    </Modal>
  );
};

export default ResetLoginModal;