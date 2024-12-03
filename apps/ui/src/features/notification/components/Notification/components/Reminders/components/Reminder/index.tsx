"use client";

import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { useEditNotification } from "@ui/features/notification/hooks";
import { useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Dialog, type DialogFields } from "../Dialog";
import { formatDuration } from "../../common";

interface ReminderProps extends Pick<NotificationDto, "id" | "reminders"> {
  reminder: string;
}

export function Reminder({ id, reminder, reminders }: ReminderProps) {
  const editForm = useForm<DialogFields>({ defaultValues: { reminder } });
  const editModal = useDisclosure();
  const { mutate, isLoading } = useEditNotification(id, editModal.onClose);

  return (
    <>
      <Flex align="center" gap={2}>
        <Flex
          as="button"
          w="full"
          justifyContent="start"
          py={2}
          px={3}
          bgColor="bg.paper"
          rounded="md"
          opacity={!isLoading ? 1 : 0.5}
          disabled={isLoading}
          onClick={editModal.onOpen}
        >
          {formatDuration(parseInt(reminder))}
        </Flex>
        <IconButton
          variant="outline-danger"
          size="icon"
          icon={<Trash2 />}
          aria-label="Delete"
          isLoading={isLoading}
          onClick={() => mutate({ reminders: reminders.filter((element) => element !== reminder) })}
        />
      </Flex>
      <Dialog
        control={editForm.control}
        disclosure={editModal}
        error={editForm.formState.errors.reminder}
        isLoading={isLoading}
        onSubmit={editForm.handleSubmit((fields) => {
          mutate(
            {
              reminders: reminders.map((element) =>
                element === reminder ? fields.reminder : element
              ),
            },
            { onSuccess: () => editForm.reset() }
          );
        })}
      />
    </>
  );
}
