"use client";

import { useToast } from "@chakra-ui/react";
import type { EditUserDto, UserWithoutPasswordDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { useMutation, useQueryClient } from "react-query";

export function useEditUser(onSuccess?: VoidFunction) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<UserWithoutPasswordDto | null, unknown, EditUserDto>(
    "editUser",
    async (editUserDto) => {
      // Use react hook form and validate title etc
      const { data } = await clientFetch<UserWithoutPasswordDto>("/user", "PATCH", editUserDto);
      return data;
    },
    {
      onSuccess: (data) => {
        if (!data) {
          console.error("User successfully edited but returned data was null.");
          throw new Error("An unexpected error occurred.");
        }
        queryClient.setQueryData("user", data);
        toast({
          title: "Changes saved",
          description: "Your profile was successfully edited.",
          status: "success",
        });
        onSuccess?.();
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to edit user.",
          status: "error",
        });
      },
    }
  );
}
