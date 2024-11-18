"use client";

import { Text, useDisclosure } from "@chakra-ui/react";
import {
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@ui/components";
import { useDelete } from "./useDelete";

interface DeletePromptProps {
  id: string;
}

export function DeletePrompt({ id }: DeletePromptProps) {
  const { open, onClose, onOpen } = useDisclosure();
  const { mutate, isLoading } = useDelete(id, onClose);

  return (
    <DialogRoot
      lazyMount
      role="alertdialog"
      open={open}
      onOpenChange={(e) => (e.open ? onOpen() : onClose())}
    >
      <DialogTrigger asChild>
        <Button bgColor="danger" onClick={onOpen}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>This action cannot be undone. The notification will be gone forever.</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            bgColor="danger"
            onClick={(e) => {
              e.stopPropagation();
              mutate();
            }}
            loading={isLoading}
          >
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={onClose} />
      </DialogContent>
    </DialogRoot>
  );
}
