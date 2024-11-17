"use client";

import { Box } from "@chakra-ui/react";
import type { DeletedNotificationsDto, NotificationDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Button,
  Checkbox,
  toaster,
} from "@ui/components";
import { useMutation, useQueryClient } from "react-query";

export function Notification({ id, title }: NotificationDto) {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation<NotificationDto[]>(
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

  return (
    <AccordionRoot
      key={id}
      collapsible
      variant="plain"
      rounded="lg"
      border="1px solid"
      borderColor="border"
      px={3}
    >
      <AccordionItem value={id}>
        <AccordionItemTrigger>
          {title}
          <Checkbox ml="auto" />
        </AccordionItemTrigger>
        <AccordionItemContent pb={3}>
          <Box padding="1px">
            <Button bgColor="danger" onClick={() => mutate()} loading={isLoading}>
              Delete
            </Button>
          </Box>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
