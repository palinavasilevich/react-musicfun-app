import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";

import cls from "./Modal.module.css";
import { Button } from "../Button";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  className?: string;
  onClose?: () => void;
};

export const Modal = ({
  children,
  isOpen,
  title,
  className,
  onClose,
}: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // Add global keydown handler for ESC key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <div
      className={cls.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <section className={clsx(cls.modal, className)}>
        <header className={cls.header}>
          <div>{title}</div>
          <Button
            onClick={onClose}
            aria-label="Close dialog"
            type="button"
            variant="withIcon"
            className={cls.closeButton}
          >
            ✕
          </Button>
        </header>
        <div className={cls.content}>{children}</div>
      </section>
    </div>
  );

  return createPortal(modalContent, document.body);
};

/*
 * ModalFooter
 */

export type ModalFooterProps = {
  children: ReactNode;
  className?: string;
};

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return <footer className={clsx(cls.footer, className)}>{children}</footer>;
};
