"use client";
import { useEffect, useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps extends PropsWithChildren {
  onClose: () => void;
}

const Modal = ({ onClose, children }: ModalProps) => {
  const portalTarget = document.getElementById("modal-root") ?? document.body;

  const downOnBackdropRef = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    downOnBackdropRef.current = e.target === e.currentTarget;
  };

  const handleBackdropMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const upOnBackdrop = e.target === e.currentTarget;
    if (downOnBackdropRef.current && upOnBackdrop) onClose();
    downOnBackdropRef.current = false;
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onMouseDown={handleBackdropMouseDown}
      onMouseUp={handleBackdropMouseUp}
    >
      <div
        className={css.modal}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    portalTarget
  );
};

export default Modal;
