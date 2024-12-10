"use client";

import { useToast } from "@chakra-ui/react";
import type { EditNotificationDto, NotificationDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { useMutation, useQueryClient } from "react-query";

export function useEditNotification(id: string, onSuccess?: VoidFunction) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<NotificationDto | null, unknown, EditNotificationDto>(
    ["editNotification", id],
    async (editNotificationDto) => {
      // Use react hook form and validate title etc
      const { data } = await clientFetch<NotificationDto>(
        `/notification/${id}`,
        "PATCH",
        editNotificationDto
      );
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
        onSuccess?.();
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to edit notification.",
          status: "error",
        });
      },
    }
  );
}
