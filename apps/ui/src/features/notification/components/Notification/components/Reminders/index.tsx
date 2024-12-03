"use client";

import { Button, Flex, Text, useDisclosure, type FlexProps } from "@chakra-ui/react";
import { NotificationDto } from "@did-you-forget/dto";
import { Accordion } from "@ui/components";
import { Dialog, type DialogFields, Reminder } from "./components";
import { useEditNotification } from "@ui/features/notification/hooks";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

const flexProps: FlexProps = { bgColor: "gray.800", shadow: "none" };

export function Reminders({ id, reminders }: Pick<NotificationDto, "id" | "reminders">) {
  const addModal = useDisclosure();
  const addForm = useForm<DialogFields>();
  const { mutate, isLoading } = useEditNotification(id, addModal.onClose);

  return (
    <>
      <Accordion title={<Text color="text.secondary">Reminders</Text>} flexProps={flexProps}>
        <Button
          variant="outline-primary"
          onClick={addModal.onOpen}
          leftIcon={<Plus size="1.25em" />}
          size="sm"
        >
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
          mutate({ reminders: [...reminders, reminder] }, { onSuccess: () => addForm.reset() })
        )}
        control={addForm.control}
      />
    </>
  );
}
