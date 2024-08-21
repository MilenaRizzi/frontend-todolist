"use client";

import { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ onClose, children }: ModalProps) {
  return (
    <div
      className=" fixed top-0 left-0 w-full h-full bg-opacity-80 flex justify-center items-center z-50 bg-[#1a1a1a] "
      onClick={onClose}
    >
      <div
        className="flex flex-col justify-around bg-[#333333] px-6 rounded-lg w-[470px] h-[250px] "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
