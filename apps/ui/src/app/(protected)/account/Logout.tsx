"use client";

import { Button } from "@chakra-ui/react";
import { clientFetch } from "@ui/common/fetchers/client";
import { useToast } from "@ui/hooks";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

export function Logout() {
  const toast = useToast();
  const { push } = useRouter();
  const { isLoading, mutate } = useMutation("logout", () => clientFetch("/auth/logout", "POST"), {
    onSuccess: () => push("/login"),
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        status: "error",
      });
    },
  });

  return (
    <Button
      variant="outline"
      isLoading={isLoading}
      onClick={() => mutate()}
      leftIcon={<LogOut style={{ rotate: "180deg" }} />}
    >
      Logout
    </Button>
  );
}
