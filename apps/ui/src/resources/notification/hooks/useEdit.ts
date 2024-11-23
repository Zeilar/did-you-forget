"use client";

import { useToast } from "@chakra-ui/react";
import { EditNotificationDto, NotificationDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { useMutation, useQueryClient } from "react-query";

export function useEditNotification(
  id: string,
  input: EditNotificationDto,
  onSuccess?: VoidFunction
) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<NotificationDto | null>(
    ["editNotification", id],
    async () => {
      // Use react hook form and validate title etc
      const { data } = await clientFetch<NotificationDto>(
        `/notification/edit/${id}`,
        "PATCH",
        input
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
        toast({
          title: "Saved",
          description: "Successfully edited notification.",
          status: "success",
        });
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
