import * as Dialog from "@radix-ui/react-dialog";
import * as React from "react";
import "./styles.css";

const Modal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.JSX.Element;
}) => (
  <Dialog.Root open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
    {children}
  </Dialog.Root>
);

export default Modal;
