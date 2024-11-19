"use client";

import type { DeletedNotificationsDto, NotificationDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { pluralizeWithS } from "@ui/common/pluralize";
import { toaster } from "@ui/components";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteNotification(ids: string[], onSuccess?: (ids: string[]) => void) {
  const queryClient = useQueryClient();

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
        toaster.create({
          title: "Deleted",
          description: `Successfully deleted ${pluralizeWithS("notification", data.length)}.`,
          type: "success",
        });
        onSuccess?.(data.flatMap(({ id }) => id));
      },
      onError: (error) => {
        console.error(error);
        toaster.create({
          title: "Error",
          description: `Failed to delete ${pluralizeWithS("notification", ids.length)}.`,
          type: "error",
        });
      },
    }
  );
}
