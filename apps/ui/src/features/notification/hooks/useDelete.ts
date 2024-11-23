"use client";

import { useToast } from "@chakra-ui/react";
import type { DeletedNotificationsDto, NotificationDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { pluralizeWithS } from "@ui/common/pluralize";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteNotification(ids: string[], onSuccess?: (ids: string[]) => void) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<NotificationDto[]>(
    "deleteNotification",
    async () => {
      const { data } = await clientFetch<DeletedNotificationsDto>(
        `/notification/delete?ids=${ids.join(",")}`,
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
        toast({
          title: "Deleted",
          description: `Successfully deleted ${pluralizeWithS("notification", data.length)}.`,
          status: "success",
        });
        onSuccess?.(data.flatMap(({ id }) => id));
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: `Failed to delete ${pluralizeWithS("notification", ids.length)}.`,
          status: "error",
        });
      },
    }
  );
}
