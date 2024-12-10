"use client";

import { Button } from "@chakra-ui/react";
import { clientFetch } from "@ui/common/fetchers/client";
import { useToast } from "@ui/hooks";
import { useMutation } from "react-query";

interface VerifyProps {
  email: string;
}

export function Verify({ email }: VerifyProps) {
  const toast = useToast();
  const { isLoading, mutateAsync } = useMutation(["send-verification-code", email], () =>
    clientFetch(`/user/send-verification-code/${email}`, "POST")
  );

  return (
    <Button
      variant="link"
      disabled={isLoading}
      onClick={() =>
        toast.promise(mutateAsync(), {
          error: {
            title: "Failed to send verification code",
            description: "An unexpected error occurred.",
          },
          loading: { title: "Sending verification code..." },
          success: {
            title: `Verification code sent to ${email}`,
            description: "Don't forget to check yor spam and junk folders.",
          },
        })
      }
    >
      verify your account
    </Button>
  );
}
