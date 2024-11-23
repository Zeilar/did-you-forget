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
import { pluralizeWithS } from "@ui/common/pluralize";
import { useDeleteNotification } from "@ui/resources/notification";
import { BsTrash } from "react-icons/bs";

interface DeletePromptProps {
  ids: string[];
}

export function DeletePrompt({ ids }: DeletePromptProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate, isLoading } = useDeleteNotification(ids, onClose);

  return (
    <>
      <MenuItem
        icon={<BsTrash size="1.5em" />}
        onClick={onOpen}
        bgColor="red.700"
        _hover={{
          bgColor: "red.600",
        }}
      >
        Delete
      </MenuItem>
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
          <ModalFooter gap={2} px={4}>
            <Button onClick={() => mutate()} isLoading={isLoading} variant="solid-danger">
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
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
  //         <BsTrash />
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
