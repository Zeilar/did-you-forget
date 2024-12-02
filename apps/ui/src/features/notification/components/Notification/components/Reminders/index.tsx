"use client";

import { Button, Flex, useDisclosure, type FlexProps } from "@chakra-ui/react";
import { NotificationDto } from "@did-you-forget/dto";
import { Accordion } from "@ui/components";
import { Dialog, type DialogFields, Reminder } from "./components";
import { useEditNotification } from "@ui/features/notification/hooks";
import { useForm } from "react-hook-form";
import { getTotalSeconds } from "./common";
import { LuPlus } from "react-icons/lu";

const flexProps: FlexProps = { bgColor: "gray.800", shadow: "none" };

export function Reminders({ id, reminders }: Pick<NotificationDto, "id" | "reminders">) {
  const addModal = useDisclosure();
  const addForm = useForm<DialogFields>();
  const { mutate, isLoading } = useEditNotification(id, addModal.onClose);

  return (
    <>
      <Accordion title="Reminders" flexProps={flexProps}>
        <Button size="sm" onClick={addModal.onOpen} leftIcon={<LuPlus size="1.25em" />}>
          New
        </Button>
        {reminders.length > 0 && (
          <Flex flexDir="column" gap={2} mt={4}>
            {reminders.map((reminder, i) => (
              <Reminder
                key={`${id}-${reminder}-${i}`}
                id={id}
                reminders={reminders}
                reminder={reminder}
              />
            ))}
          </Flex>
        )}
      </Accordion>
      <Dialog
        disclosure={addModal}
        error={addForm.formState.errors.reminder}
        isLoading={isLoading}
        onSubmit={addForm.handleSubmit(({ reminder }) =>
          mutate(
            { reminders: [...reminders, getTotalSeconds(reminder)] },
            { onSuccess: () => addForm.reset() }
          )
        )}
        control={addForm.control}
      />
    </>
  );
}
