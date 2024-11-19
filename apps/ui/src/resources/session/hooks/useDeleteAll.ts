"use client";

import type { SessionForUserDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { toaster } from "@ui/components";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteAllSessions() {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation<number>(
    "deleteSessions",
    async () => {
      const { status } = await clientFetch("/session/delete-all", "DELETE");
      return status;
    },
    {
      onSuccess: (data) => {
        if (data !== 204) {
          throw new Error("Failed to delete sessions.");
        }
        queryClient.setQueryData(
          "sessions",
          (_oldData: SessionForUserDto[] | undefined): SessionForUserDto[] => {
            return [];
          }
        );
        toaster.create({
          title: "Deleted",
          description: "Successfully deleted all sessions.",
          type: "success",
        });
        replace("/login");
      },
      onError: (error) => {
        console.error(error);
        toaster.create({
          title: "Error",
          description: "Failed to delete sessions.",
          type: "error",
        });
      },
    }
  );
}
