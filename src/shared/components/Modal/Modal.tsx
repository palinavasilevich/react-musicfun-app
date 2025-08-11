import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

import cls from "./Modal.module.css";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  modalTitle?: string;
  onClose?: () => void;
};

export const Modal = ({ isOpen, children, modalTitle, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialogRef.current;

    if (isOpen) {
      modal?.showModal();
    }

    return () => modal?.close();
  }, [isOpen]);

  return createPortal(
    <dialog className={cls.modal} ref={dialogRef} onClose={onClose}>
      <h3 className={cls.title}>{modalTitle}</h3>
      <div className={cls.content}>{children}</div>
      <button className={cls.closeBtn} onClick={onClose}>
        x
      </button>
    </dialog>,
    document.body
  );
};
