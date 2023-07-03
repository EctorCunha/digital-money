import {
  Modal,
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  ModalProps,
  ThemingProps,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

export type ModalDefaultProps = {
  isOpen: boolean;
  onClose: () => void;
  size?: ThemingProps<"Modal">["size"];
  children?: ReactNode;
  modalContentProps?: ModalContentProps;
} & Omit<ModalProps, "children">;

export const ModalDefault = (props: ModalDefaultProps) => {
  const { isOpen, onClose, size = "xs", children, modalContentProps } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
      <ModalOverlay background={"rgba(0, 0, 0, 0.2)"} />

      <ModalContent
        transition={"all 0.2s ease-in-out"}
        background={"white"}
        {...modalContentProps}
      >
        <ModalBody p={"1.5rem"} borderRadius={"8px"}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
