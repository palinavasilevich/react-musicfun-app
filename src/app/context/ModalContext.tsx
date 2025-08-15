import { createContext, useContext, useState } from "react";

type ModalType = "add" | "edit";

type ModalContextType = {
  currentModal: ModalType | null;
  editingPlaylistId: string | null;
  openModal: {
    (type: "add"): void;
    (type: "edit", playlistId: string): void;
  };
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(
    null
  );

  const openModal = ((type: ModalType, playlistId?: string) => {
    setCurrentModal(type);
    if (type === "edit") {
      setEditingPlaylistId(playlistId!);
    } else {
      setEditingPlaylistId(null);
    }
  }) as ModalContextType["openModal"];

  const closeModal = () => {
    setCurrentModal(null);
    setEditingPlaylistId(null);
  };

  return (
    <ModalContext.Provider
      value={{
        currentModal,
        editingPlaylistId,
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
