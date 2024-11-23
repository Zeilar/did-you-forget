"use client";

import { useToast } from "@chakra-ui/react";
import type { DeletedSessionsDto, SessionDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { pluralizeWithS } from "@ui/common/pluralize";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteSession(ids: string[], onSuccess?: (ids: string[]) => void) {
  const queryClient = useQueryClient();
  const toast = useToast();

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
        toast({
          title: "Deleted",
          description: `Successfully deleted ${pluralizeWithS("session", data.length)}.`,
          status: "success",
        });
        onSuccess?.(data.flatMap(({ id }) => id));
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: `Failed to delete ${pluralizeWithS("session", ids.length)}.`,
          status: "error",
        });
      },
    }
  );
}
