"use client";

import { Flex, Text } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Button,
  Checkbox,
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@ui/components";
import { useState } from "react";
import { useDelete, useEdit } from "./hooks";

export function Notification({ id, title, createdAt }: NotificationDto) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>(title);
  const deleteNotification = useDelete(id);
  const editNotification = useEdit(id, { title: titleInput }, () => setIsEditing(false));

  return (
    <AccordionRoot
      key={id}
      collapsible
      variant="plain"
      rounded="lg"
      border="1px solid"
      borderColor="border"
      bgColor="gray.900"
      px={3}
    >
      <AccordionItem value={id}>
        <AccordionItemTrigger>
          <Text>{title}</Text>
          <Checkbox ml="auto" />
        </AccordionItemTrigger>
        <AccordionItemContent pb={3}>
          <Flex gap={2} justify="flex-end">
            <DialogRoot open={isEditing} lazyMount onOpenChange={(e) => setIsEditing(e.open)}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit notification</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Input
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    autoFocus
                  />
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Flex gap={2}>
                      <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          editNotification.mutate();
                        }}
                        loading={editNotification.isLoading}
                      >
                        Save
                      </Button>
                    </Flex>
                  </DialogActionTrigger>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
            <Button
              bgColor="danger"
              onClick={() => deleteNotification.mutate()}
              loading={deleteNotification.isLoading}
            >
              Delete
            </Button>
          </Flex>
          <p>Created: {new Date(createdAt).toISOString()}</p>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
