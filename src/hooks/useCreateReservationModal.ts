import { useState, useCallback } from "react";

interface SelectedSlot {
  start: Date | null;
  end: Date | null;
  resourceId: number | null;
}

export const useCreateReservationModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot>({
    start: null,
    end: null,
    resourceId: null,
  });

  const openModal = useCallback(
    ({ start, end, resourceId }: { start: Date; end: Date; resourceId: number }) => {
      setSelectedSlot({ start, end, resourceId });
      setModalOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedSlot({ start: null, end: null, resourceId: null });
  }, []);

  return {
    modalOpen,
    selectedSlot,
    openModal,
    closeModal,
  };
};
