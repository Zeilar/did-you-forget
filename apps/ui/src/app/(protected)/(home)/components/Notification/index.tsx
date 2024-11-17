"use client";

import { Flex } from "@chakra-ui/react";
import type {
  DeletedNotificationsDto,
  EditNotificationDto,
  NotificationDto,
} from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Button,
  Checkbox,
  Input,
  toaster,
} from "@ui/components";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

export function Notification({ id, title, createdAt }: NotificationDto) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>(title);
  const queryClient = useQueryClient();
  const deleteNotification = useMutation<NotificationDto[]>(
    ["deleteNotification", id],
    async () => {
      const { data } = await clientFetch<DeletedNotificationsDto>(
        `/notification/delete?ids=${id}`,
        "DELETE"
      );
      return data?.deletedNotifications ?? [];
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          "notifications",
          (oldData: NotificationDto[] | undefined): NotificationDto[] => {
            return (
              oldData?.filter(({ id }) => !data?.some((notification) => notification.id === id)) ??
              []
            );
          }
        );
        toaster.create({
          title: "Deleted",
          description: "Successfully deleted notification.",
          type: "success",
        });
      },
      onError: (error) => {
        console.error(error);
        toaster.create({
          title: "Error",
          description: "Failed to delete notification.",
          type: "error",
        });
      },
    }
  );
  const editNotification = useMutation<NotificationDto | null>(
    ["editNotification", id],
    async () => {
      // Use react hook form and validate title etc
      const { data } = await clientFetch<NotificationDto>(`/notification/edit/${id}`, "PATCH", {
        title: titleInput,
      } satisfies EditNotificationDto);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          "notifications",
          (oldData: NotificationDto[] | undefined): NotificationDto[] => {
            return (
              oldData?.map((notification) =>
                notification.id === data?.id ? data : notification
              ) ?? []
            );
          }
        );
        toaster.create({
          title: "Saved",
          description: "Successfully edited notification.",
          type: "success",
        });
        setIsEditing(false);
      },
      onError: (error) => {
        console.error(error);
        toaster.create({
          title: "Error",
          description: "Failed to edit notification.",
          type: "error",
        });
      },
    }
  );

  return (
    <AccordionRoot
      key={id}
      collapsible
      variant="plain"
      rounded="lg"
      border="1px solid"
      borderColor="border"
      bgColor="gray.900"
      px={3}
    >
      <AccordionItem value={id}>
        <AccordionItemTrigger>
          {!isEditing ? (
            title
          ) : (
            <Input value={titleInput} onChange={(e) => setTitleInput(e.target.value)} autoFocus />
          )}
          <Checkbox ml="auto" />
        </AccordionItemTrigger>
        <AccordionItemContent pb={3}>
          <Flex gap={2} justify="space-between">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            ) : (
              <Flex gap={2}>
                <Button
                  onClick={() => editNotification.mutate()}
                  loading={editNotification.isLoading}
                >
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </Flex>
            )}
            <Button
              bgColor="danger"
              onClick={() => deleteNotification.mutate()}
              loading={deleteNotification.isLoading}
            >
              Delete
            </Button>
          </Flex>
          <p>Created: {new Date(createdAt).toISOString()}</p>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
