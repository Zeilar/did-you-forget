"use client";

import type { DeletedSessionsDto, SessionDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { pluralizeWithS } from "@ui/common/pluralize";
import { toaster } from "@ui/components";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteSession(ids: string[], onSuccess?: (ids: string[]) => void) {
  const queryClient = useQueryClient();

  return useMutation<SessionDto[]>(
    "deleteNotification",
    async () => {
      const { data } = await clientFetch<DeletedSessionsDto>(
        `/session/delete?ids=${ids.join(",")}`,
        "DELETE"
      );
      return data?.deletedSessions ?? [];
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData("sessions", (oldData: SessionDto[] | undefined): SessionDto[] => {
          return (
            oldData?.filter(({ id }) => !data?.some((notification) => notification.id === id)) ?? []
          );
        });
        toaster.create({
          title: "Deleted",
          description: `Successfully deleted ${pluralizeWithS("session", data.length)}.`,
          type: "success",
        });
        onSuccess?.(data.flatMap(({ id }) => id));
      },
      onError: (error) => {
        console.error(error);
        toaster.create({
          title: "Error",
          description: `Failed to delete ${pluralizeWithS("session", ids.length)}.`,
          type: "error",
        });
      },
    }
  );
}
