"use client";

import {
  Box,
  Grid,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Heading,
  Button,
  ModalFooter,
  FormErrorMessage,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalBody,
  FormControl,
  useDisclosure,
  FormLabel,
  ModalHeader,
  Stack,
  Alert,
  AlertTitle,
  AlertDescription,
  FormErrorIcon,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Notification } from "../Notification";
import type {
  CreateNotificationDto,
  NotificationDto,
  NotificationsForUserDto,
  UserWithoutPasswordDto,
} from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BellRing, Plus, Search, X } from "lucide-react";
import { inputProps, Paper, Input as UiInput } from "@ui/components";
import { useForm } from "react-hook-form";
import { useCreateNotification } from "../../hooks";

interface NotificationsProps {
  initialData: NotificationDto[];
}

export function Notifications({ initialData }: NotificationsProps) {
  const userQuery = useQuery<UserWithoutPasswordDto>("user", async () => {
    const { data } = await clientFetch<UserWithoutPasswordDto>("/user");
    return data;
  });
  const createForm = useForm<CreateNotificationDto>();
  const createDialog = useDisclosure();
  const createNotification = useCreateNotification(createDialog.onClose);
  const [search, setSearch] = useState<string>("");
  const { data = [] } = useQuery<NotificationDto[]>(
    "notifications",
    async () => {
      const { data } = await clientFetch<NotificationsForUserDto>("/notification");
      return data?.notifications ?? [];
    },
    { initialData, cacheTime: 0 } // For some reason the cache invalidation in useEditNotification doesn't work.
  );
  const searchedNotifications: NotificationDto[] = search.trim()
    ? data.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
    : data;

  return (
    <>
      <Paper rounded="none" flexDir="row" justify="space-between">
        <Heading m={0}>Notifications</Heading>
        <Button
          variant="outline-primary"
          leftIcon={<Plus size="1.25em" />}
          onClick={createDialog.onOpen}
          disabled={userQuery.isLoading || !userQuery.data?.isVerified}
        >
          New
        </Button>
      </Paper>
      {data.length > 0 ? (
        <>
          <Box px={4} mt={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search size="1em" color="var(--chakra-colors-text-muted)" />
              </InputLeftElement>
              <Input
                {...inputProps}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
              {search && (
                <InputRightElement>
                  <X
                    color="var(--chakra-colors-text-muted)"
                    role="button"
                    onClick={() => setSearch("")}
                    cursor="pointer"
                    size="1em"
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </Box>
          <Grid gridTemplateColumns={["repeat(1, 1fr)"]} gap={4} p={4}>
            {!search.trim() ? (
              <AnimatePresence>
                {data.map((notification) => (
                  <motion.div key={notification.id} exit={{ opacity: 0 }}>
                    <Notification {...notification} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              searchedNotifications.map((notification) => (
                <Notification key={notification.id} {...notification} />
              ))
            )}
          </Grid>
        </>
      ) : (
        <Alert
          bgColor="bg.paper"
          status="info"
          variant="subtle"
          flexDir="column"
          rounded="md"
          p={8}
          gap={2}
          m={3}
          w="auto"
        >
          <BellRing color="var(--chakra-colors-text-primary)" size={40} />
          <AlertTitle mt={2}>No notifications found</AlertTitle>
          <AlertDescription>Add some notifications before you forget</AlertDescription>
        </Alert>
      )}
      <Modal isOpen={createDialog.isOpen} onClose={createDialog.onClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          mx={4}
          onSubmit={createForm.handleSubmit(({ time, ...fields }) =>
            createNotification.mutate({
              ...fields,
              time: new Date(time).toISOString(),
            })
          )}
        >
          <ModalHeader>Create notification</ModalHeader>
          <ModalBody as={Stack} spacing={4}>
            <FormControl isInvalid={!!createForm.formState.errors.title}>
              <FormLabel>Title</FormLabel>
              <UiInput
                required
                placeholder="My notification"
                {...createForm.register("title", {
                  required: {
                    value: true,
                    message: "Title is required.",
                  },
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 character long.",
                  },
                })}
              />
              {createForm.formState.errors.title?.message && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  <span>{createForm.formState.errors.title.message}</span>
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!createForm.formState.errors.title}>
              <FormLabel>Time</FormLabel>
              <UiInput
                required
                type="datetime-local"
                {...createForm.register("time", {
                  required: {
                    value: true,
                    message: "Time is required.",
                  },
                })}
              />
              {createForm.formState.errors.time?.message && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  <span>{createForm.formState.errors.time.message}</span>
                </FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter gap={2} justifyContent="start">
            <Button isLoading={createNotification.isLoading} type="submit">
              Save
            </Button>
            <Button variant="outline" onClick={createDialog.onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
