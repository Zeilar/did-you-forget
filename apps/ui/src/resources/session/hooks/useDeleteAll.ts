"use client";

import { useToast } from "@chakra-ui/react";
import type { SessionForUserDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteAllSessions() {
  const queryClient = useQueryClient();
  const { replace } = useRouter();
  const toast = useToast();

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
        toast({
          title: "Deleted",
          description: "Successfully deleted all sessions.",
          status: "success",
        });
        replace("/login");
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to delete sessions.",
          status: "error",
        });
      },
    }
  );
}
