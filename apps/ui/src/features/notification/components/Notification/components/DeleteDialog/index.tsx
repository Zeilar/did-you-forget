"use client";

import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { pluralizeWithS } from "@ui/common/pluralize";
import { useDeleteNotification } from "@ui/features/notification";
import { Trash2 } from "lucide-react";

interface DeletePromptProps {
  ids: string[];
}

export function DeletePrompt({ ids }: DeletePromptProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate, isLoading } = useDeleteNotification(ids, onClose);

  return (
    <>
      <IconButton
        aria-label="Delete notification"
        variant="outline-danger"
        size="icon"
        icon={<Trash2 size="1.5em" />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure? This action cannot be undone.
            <br />
            The {pluralizeWithS("notification", 1)} will be gone forever.
          </ModalBody>
          <ModalFooter gap={2} px={4} justifyContent="start">
            <Button onClick={() => mutate()} isLoading={isLoading} variant="solid-danger">
              Delete
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  // return (
  //   <DialogRoot lazyMount open={open} onOpenChange={(e) => (e.open ? onOpen() : onClose())}>
  //     <DialogTrigger asChild>
  //       <Button onClick={onOpen}>
  //         <Trash2 />
  //       </Button>
  //     </DialogTrigger>
  //     <DialogContent>
  //       <DialogHeader>
  //         <DialogTitle>Are you sure?</DialogTitle>
  //       </DialogHeader>
  //       <DialogBody>
  //         <Text>
  //           This action cannot be undone. The {pluralizeWithS("notification", 1)} will be gone
  //           forever.
  //         </Text>
  //       </DialogBody>
  //       <DialogFooter>
  //         <DialogActionTrigger asChild>
  //           <Flex gap={2}>
  //             <Button onClick={onClose}>Cancel</Button>
  //             <Button
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 mutate();
  //               }}
  //               loading={isLoading}
  //             >
  //               Confirm
  //             </Button>
  //           </Flex>
  //         </DialogActionTrigger>
  //       </DialogFooter>
  //       <DialogCloseTrigger onClick={onClose} />
  //     </DialogContent>
  //   </DialogRoot>
  // );
}
