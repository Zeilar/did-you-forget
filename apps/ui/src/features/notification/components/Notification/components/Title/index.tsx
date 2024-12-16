"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  IconButton,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import type { EditNotificationDto, NotificationDto } from "@did-you-forget/dto";
import { inputProps } from "@ui/components";
import { useEditNotification } from "@ui/features/notification/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pen } from "lucide-react";

export function Title({ id, title }: Pick<NotificationDto, "id" | "title">) {
  const { register, handleSubmit, setValue, formState } = useForm<EditNotificationDto>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isLoading, mutate } = useEditNotification(id, onClose);

  useEffect(() => {
    setValue("title", title);
  }, [setValue, title]);

  return isOpen ? (
    <Box as="form" onSubmit={handleSubmit((fields) => mutate(fields))} w="full">
      <FormControl isInvalid={!!formState.errors.title}>
        <Input
          {...inputProps}
          required
          w={["full", 500]}
          placeholder="Title"
          autoFocus
          {...register("title", {
            required: {
              value: true,
              message: "Please fill out the field.",
            },
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters long.",
            },
          })}
        />
        {formState.errors.title?.message && (
          <FormErrorMessage>
            <FormErrorIcon />
            <span>{formState.errors.title.message}</span>
          </FormErrorMessage>
        )}
      </FormControl>
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
        aria-label="Edit title"
        variant="ghost"
        display="flex"
        size="sm"
        onClick={onOpen}
        icon={<Pen size="1.25em" />}
      />
      <Text fontSize="lg" fontWeight={600}>
        {title}
      </Text>
    </Flex>
  );
}
