"use client";

import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { pluralizeWithS } from "@ui/common/pluralize";
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
import { useDeleteNotification } from "@ui/resources/notification";
import { BsTrash } from "react-icons/bs";

interface DeletePromptProps {
  ids: string[];
}

export function DeletePrompt({ ids }: DeletePromptProps) {
  const { open, onClose, onOpen } = useDisclosure();
  const { mutate, isLoading } = useDeleteNotification(ids, onClose);

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => (e.open ? onOpen() : onClose())}>
      <DialogTrigger asChild>
        <Button colorPalette="red" onClick={onOpen}>
          <BsTrash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>
            This action cannot be undone. The {pluralizeWithS("notification", 1)} will be gone
            forever.
          </Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Flex gap={2}>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorPalette="red"
                onClick={(e) => {
                  e.stopPropagation();
                  mutate();
                }}
                loading={isLoading}
              >
                Confirm
              </Button>
            </Flex>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger onClick={onClose} />
      </DialogContent>
    </DialogRoot>
  );
}
