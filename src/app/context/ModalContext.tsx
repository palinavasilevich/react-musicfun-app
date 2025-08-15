import { createContext, useContext, useState } from "react";

type ModalType = "add" | "edit";

type ModalContextType = {
  currentModal: ModalType | null;
  modalData: unknown;
  openModal: (type: ModalType, data?: unknown) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<unknown>(null);

  const openModal = (type: ModalType, data?: unknown) => {
    setCurrentModal(type);
    setModalData(data || null);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider
      value={{
        currentModal,
        modalData,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
