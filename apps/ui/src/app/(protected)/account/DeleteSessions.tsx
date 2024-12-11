"use client";

import { Alert, AlertIcon, Button, Stack, Text } from "@chakra-ui/react";
import { clientFetch } from "@ui/common/fetchers/client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

interface DeleteSessionsProps {
  disabled: boolean;
}

export function DeleteSessions({ disabled }: DeleteSessionsProps) {
  const { push } = useRouter();
  const { isLoading, mutate } = useMutation(
    "deleteSessions",
    () => clientFetch("/session/all", "DELETE"),
    { onSuccess: () => push("/login") }
  );

  return (
    <Stack>
      <Alert status="error">
        <AlertIcon />
        <Text>This will sign you out everywhere, including this machine.</Text>
      </Alert>
      <Button
        variant="outline-danger"
        disabled={disabled}
        isLoading={isLoading}
        onClick={() => mutate()}
        leftIcon={<Trash2 />}
      >
        Delete sessions
      </Button>
    </Stack>
  );
}
