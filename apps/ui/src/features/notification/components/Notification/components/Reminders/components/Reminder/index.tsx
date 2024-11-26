"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  PinInput,
  PinInputField,
  useDisclosure,
} from "@chakra-ui/react";
import type { NotificationDto } from "@did-you-forget/dto";
import { Input } from "@ui/components";
import { useEditNotification } from "@ui/features/notification/hooks";
import humanFormat from "human-format";
import { useCallback } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { BsTrash } from "react-icons/bs";

interface ReminderProps extends Pick<NotificationDto, "id" | "reminders"> {
  reminder: string;
}

interface Fields {
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
  const { control, formState, handleSubmit } = useForm<Fields>();
  const modal = useDisclosure();
  const { mutate, isLoading } = useEditNotification(id, modal.onClose);

  const onSubmit = useCallback<SubmitHandler<Fields>>(
    (fields) => {
      const [h1, h2, m1, m2] = fields.reminder;
      const hours = parseInt(`${h1}${h2}`);
      const minutes = parseInt(`${m1}${m2}`);
      const totalSeconds = hours * 60 * 60 + minutes * 60;
      console.log(reminders, totalSeconds);
      mutate({
        reminders: reminders.map((element) => (element === reminder ? `${totalSeconds}` : element)),
      });
    },
    [mutate, reminders, reminder]
  );

  return (
    <Flex align="center" gap={2}>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent w="fit-content" as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Controller
              control={control}
              name="reminder"
              render={({ field }) => (
                <FormControl>
                  <Flex pt={4} gap={2}>
                    <PinInput
                      size="lg"
                      placeholder="0"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <PinInputField order={1} as={Input} aria-label="Hours" placeholder="M" />
                      <PinInputField order={2} as={Input} aria-label="Hours" placeholder="M" />
                      <PinInputField order={4} as={Input} aria-label="Minutes" placeholder="M" />
                      <PinInputField order={5} as={Input} aria-label="Minutes" placeholder="M" />
                      <Box sx={{ all: "unset", order: 3 }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="48"
                          viewBox="0 0 16 48"
                        >
                          <Box as="circle" cx="8" cy="16" r="2" fill="border" />
                          <Box as="circle" cx="8" cy="32" r="2" fill="border" />
                        </svg>
                      </Box>
                    </PinInput>
                  </Flex>
                  {formState.errors.reminder && (
                    <FormErrorMessage>{formState.errors.reminder.message}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
          </ModalBody>
          <ModalFooter gap={2}>
            <Button isLoading={isLoading} type="submit">
              Save
            </Button>
            <Button variant="ghost" onClick={modal.onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        as="button"
        w="full"
        justifyContent="start"
        p={3}
        bgColor="bg.paper"
        rounded="md"
        opacity={!isLoading ? 1 : 0.5}
        disabled={isLoading}
        onClick={modal.onOpen}
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
  );
}
