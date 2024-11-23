"use client";

import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Input } from "@ui/components";
import { useEditNotification } from "@ui/features/notification/hooks";

interface EditPromptProps {
  id: string;
  originalTitle: string;
}

export function EditPrompt({ id, originalTitle }: EditPromptProps) {
  const [title, setTitle] = useState<string>(originalTitle);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useEditNotification(id, { title }, onClose);

  useEffect(() => {
    setTitle(originalTitle);
  }, [originalTitle]);

  return (
    <>
      <MenuItem icon={<BsPencilSquare size="1.5em" />} onClick={onOpen}>
        Edit
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          </ModalBody>
          <ModalFooter gap={2} px={4}>
            <Button onClick={() => mutate()} isLoading={isLoading}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
