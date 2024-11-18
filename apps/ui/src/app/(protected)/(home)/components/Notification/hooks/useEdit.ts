// UseMutationOptions

import { EditNotificationDto, NotificationDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { toaster } from "@ui/components";
import { useMutation, useQueryClient } from "react-query";

export function useEdit(id: string, input: EditNotificationDto, onSuccess?: VoidFunction) {
  const queryClient = useQueryClient();

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
        toaster.create({
          title: "Saved",
          description: "Successfully edited notification.",
          type: "success",
        });
        onSuccess?.();
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
}
