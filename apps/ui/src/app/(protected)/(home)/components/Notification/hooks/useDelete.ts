import type { DeletedNotificationsDto, NotificationDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { toaster } from "@ui/components";
import { useMutation, useQueryClient } from "react-query";

export function useDelete(id: string) {
  const queryClient = useQueryClient();

  return useMutation<NotificationDto[]>(
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
}
