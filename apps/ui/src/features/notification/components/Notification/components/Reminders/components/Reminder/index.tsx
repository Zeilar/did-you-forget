"use client";

import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { useEditNotification } from "@ui/features/notification/hooks";
import humanFormat from "human-format";
import { useCallback } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import { EditDialog } from "./components";

interface ReminderProps extends Pick<NotificationDto, "id" | "reminders"> {
  reminder: string;
}

export interface EditFields {
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
  const editForm = useForm<EditFields>();
  const editModal = useDisclosure();
  const { mutate, isLoading } = useEditNotification(id, editModal.onClose);

  const onEditSubmit = useCallback<SubmitHandler<EditFields>>(
    (fields) => {
      const [h1, h2, m1, m2] = fields.reminder;
      const hours = parseInt(`${h1}${h2}`);
      const minutes = parseInt(`${m1}${m2}`);
      const totalSeconds = hours * 60 * 60 + minutes * 60;
      mutate({
        reminders: reminders.map((element) => (element === reminder ? `${totalSeconds}` : element)),
      });
    },
    [mutate, reminders, reminder]
  );

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
          icon={<BsTrash />}
          aria-label="Delete"
          isLoading={isLoading}
          size="lg"
          onClick={() => mutate({ reminders: reminders.filter((element) => element !== reminder) })}
        />
      </Flex>
      <EditDialog
        control={editForm.control}
        disclosure={editModal}
        error={editForm.formState.errors.reminder}
        isLoading={isLoading}
        onSubmit={editForm.handleSubmit(onEditSubmit)}
      />
    </>
  );
}
