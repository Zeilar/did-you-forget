"use client";

import { Box, Button, Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import type { EditNotificationDto, NotificationDto } from "@did-you-forget/dto";
import { Input } from "@ui/components";
import { useEditNotification } from "@ui/features/notification/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pen } from "lucide-react";

export function Time({ id, time }: Pick<NotificationDto, "id" | "time">) {
  const { register, handleSubmit, setValue, formState } = useForm<EditNotificationDto>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isLoading, mutate } = useEditNotification(id, onClose);

  useEffect(() => {
    setValue("time", String(time).slice(0, 16) as unknown as Date);
  }, [setValue, time]);

  return (
    <Box bgColor="gray.800" p={4} rounded="md">
      <Text mb={4} fontWeight={500}>
        Time
      </Text>
      {isOpen ? (
        <Box
          as="form"
          onSubmit={handleSubmit(({ time }) =>
            mutate({
              time: new Date(time as Date).toISOString() as unknown as Date,
            })
          )}
          w="full"
        >
          <Input
            w={["full", 500]}
            type="datetime-local"
            placeholder="Title"
            autoFocus
            {...register("time", {
              required: {
                value: true,
                message: "Time is required.",
              },
            })}
          />
          <Flex gap={2} align="center" mt={2}>
            <Button type="submit" isLoading={isLoading || formState.isSubmitting}>
              Save
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </Box>
      ) : (
        <Flex gap={3} align="center">
          <IconButton
            aria-label="Edit time"
            variant="icon"
            size="icon"
            onClick={onOpen}
            icon={<Pen size="1.25em" />}
          />
          <Text>{new Date(time).toLocaleString()}</Text>
        </Flex>
      )}
    </Box>
  );
}
