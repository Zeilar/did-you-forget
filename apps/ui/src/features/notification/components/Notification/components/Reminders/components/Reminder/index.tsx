"use client";

import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { useEditNotification } from "@ui/features/notification/hooks";
import humanFormat from "human-format";
import { useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Dialog, type DialogFields } from "../Dialog";
import { getTotalSeconds } from "../../common";

interface ReminderProps extends Pick<NotificationDto, "id" | "reminders"> {
  reminder: string;
}

const timeScale = new humanFormat.Scale({
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  months: 2592000,
});

export function Reminder({ id, reminder, reminders }: ReminderProps) {
  const editForm = useForm<DialogFields>();
  const editModal = useDisclosure();
  const { mutate, isLoading } = useEditNotification(id, editModal.onClose);

  return (
    <>
      <Flex align="center" gap={2}>
        <Flex
          as="button"
          w="full"
          justifyContent="start"
          p={3}
          bgColor="bg.paper"
          rounded="md"
          opacity={!isLoading ? 1 : 0.5}
          disabled={isLoading}
          onClick={editModal.onOpen}
        >
          {humanFormat(parseInt(reminder), { scale: timeScale })}
        </Flex>
        <IconButton
          variant="outline"
          borderColor="text.danger"
          color="text.danger"
          icon={<Trash2 />}
          aria-label="Delete"
          isLoading={isLoading}
          size="lg"
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
                element === reminder ? `${getTotalSeconds(fields.reminder)}` : element
              ),
            },
            { onSuccess: () => editForm.reset() }
          );
        })}
      />
    </>
  );
}
