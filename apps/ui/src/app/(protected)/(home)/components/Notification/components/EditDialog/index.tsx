"use client";

import { Flex, useDisclosure } from "@chakra-ui/react";
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
  Input,
} from "@ui/components";
import { useEdit } from "./useEdit";
import { useEffect, useState } from "react";

interface EditPromptProps {
  id: string;
  originalTitle: string;
}

export function EditPrompt({ id, originalTitle }: EditPromptProps) {
  const [title, setTitle] = useState<string>(originalTitle);
  const { open, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useEdit(id, { title }, onClose);

  useEffect(() => {
    setTitle(originalTitle);
  }, [originalTitle]);

  return (
    <DialogRoot open={open} lazyMount onOpenChange={(e) => (e.open ? onOpen() : onClose())}>
      <DialogTrigger asChild>
        <Button onClick={onOpen}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit notification</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Flex gap={2}>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                bgColor="accent.600"
                onClick={(e) => {
                  e.stopPropagation();
                  mutate();
                }}
                loading={isLoading}
              >
                Save
              </Button>
            </Flex>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger onClick={onClose} />
      </DialogContent>
    </DialogRoot>
  );
}
