"use client";

import { useToast } from "@chakra-ui/react";
import type { CreateNotificationDto, NotificationDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { useMutation, useQueryClient } from "react-query";

export function useCreateNotification(onSuccess?: VoidFunction) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<NotificationDto | null, unknown, CreateNotificationDto>(
    "createNotification",
    async (notificationDto) => {
      // Use react hook form and validate title etc
      const { data } = await clientFetch<NotificationDto>("/notification", "POST", notificationDto);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          "notifications",
          (oldData: NotificationDto[] | undefined = []): NotificationDto[] => {
            if (!data) {
              throw new Error("An unexpected error occurred.");
            }
            return [data, ...oldData];
          }
        );
        onSuccess?.();
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to create notification.",
          status: "error",
        });
      },
    }
  );
}
