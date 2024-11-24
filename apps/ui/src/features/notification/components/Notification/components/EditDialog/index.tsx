"use client";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Input } from "@ui/components";
import { useEditNotification } from "@ui/features/notification/hooks";
import { useForm } from "react-hook-form";
import { EditNotificationDto } from "@did-you-forget/dto";

interface EditPromptProps {
  id: string;
  originalTitle: string;
}

export function EditPrompt({ id, originalTitle }: EditPromptProps) {
  const { register, formState, handleSubmit, setValue } = useForm<EditNotificationDto>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useEditNotification(id, onClose);

  useEffect(() => {
    setValue("title", originalTitle);
  }, [originalTitle, setValue]);

  return (
    <>
      <MenuItem icon={<BsPencilSquare size="1.5em" />} onClick={onOpen}>
        Edit
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit((fields) => mutate(fields))}>
          <ModalHeader>Edit notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!!formState.errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                {...register("title", {
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long.",
                  },
                })}
                autoFocus
              />
              {formState.errors.title?.message && (
                <FormErrorMessage>{formState.errors.title.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter gap={2} px={4}>
            <Button isLoading={isLoading} type="submit">
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
