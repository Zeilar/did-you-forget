"use client";

import { Button, Flex, useDisclosure, type FlexProps } from "@chakra-ui/react";
import { NotificationDto } from "@did-you-forget/dto";
import { Accordion } from "@ui/components";
import { Dialog, type DialogFields, Reminder } from "./components";
import { BsPlus } from "react-icons/bs";
import { useEditNotification } from "@ui/features/notification/hooks";
import { useForm } from "react-hook-form";

const flexProps: FlexProps = { bgColor: "gray.800", shadow: "none" };

export function Reminders({ id, reminders }: Pick<NotificationDto, "id" | "reminders">) {
  const addModal = useDisclosure();
  const { mutate, isLoading } = useEditNotification(id, addModal.onClose);
  const { control, formState, handleSubmit } = useForm<DialogFields>();

  return (
    <>
      <Accordion title="Reminders" flexProps={flexProps}>
        <Button
          variant="outline-primary"
          w="fit-content"
          leftIcon={<BsPlus size="1.5em" />}
          iconSpacing={1}
          pl={2}
          onClick={addModal.onOpen}
        >
          Add
        </Button>
        <Flex flexDir="column" gap={2} mt={2}>
          {reminders.map((reminder, i) => (
            <Reminder key={`${reminder}-${i}`} id={id} reminders={reminders} reminder={reminder} />
          ))}
        </Flex>
      </Accordion>
      <Dialog
        disclosure={addModal}
        error={formState.errors.reminder}
        isLoading={isLoading}
        onSubmit={handleSubmit(({ reminder }) => mutate({ reminders: [...reminders, reminder] }))}
        control={control}
      />
    </>
  );
}
