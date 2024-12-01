import { Box, Button, Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import type { EditNotificationDto, NotificationDto } from "@did-you-forget/dto";
import { Input } from "@ui/components";
import { useEditNotification } from "@ui/features/notification/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsPencilSquare } from "react-icons/bs";

export function Title({ id, title }: Pick<NotificationDto, "id" | "title">) {
  const { register, handleSubmit, setValue, formState } = useForm<EditNotificationDto>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isLoading, mutate } = useEditNotification(id, onClose);

  useEffect(() => {
    setValue("title", title);
  }, [setValue, title]);

  return isOpen ? (
    <Box as="form" onSubmit={handleSubmit((fields) => mutate(fields))} w="full">
      <Input
        w={["full", 500]}
        placeholder="Title"
        autoFocus
        {...register("title", {
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters long.",
          },
        })}
      />
      <Flex gap={2} align="center" mt={2}>
        <Button type="submit" isLoading={isLoading || formState.isSubmitting}>
          Save
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </Flex>
    </Box>
  ) : (
    <Flex gap={2} align="center">
      <IconButton
        aria-label="Edit title"
        variant="ghost"
        size="icon"
        color="text.primary"
        onClick={onOpen}
        icon={<BsPencilSquare size="1.25em" color="var(--chakra-colors-text-primary)" />}
      />
      <Text fontWeight={500}>{title}</Text>
    </Flex>
  );
}
