"use client";

import { Button, FormControl, FormErrorIcon, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import type { PasswordResetDto } from "@did-you-forget/dto";
import { clientFetch, type ClientFetchResult } from "@ui/common/fetchers/client";
import { Input } from "@ui/components";
import { useToast } from "@ui/hooks";
import { isEmail } from "class-validator";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export function PasswordReset() {
  const toast = useToast();
  const { register, handleSubmit, formState, watch } = useForm<PasswordResetDto>();
  const { mutate } = useMutation<ClientFetchResult, unknown, PasswordResetDto>(
    "password-reset",
    ({ email }) =>
      clientFetch("/auth/password-reset", "POST", { email } satisfies PasswordResetDto),
    {
      onSuccess: () => {
        toast({
          title: `Password reset sent to ${watch("email")}`,
          description: "Check your mail inbox for instructions.",
          status: "success",
        });
      },
    }
  );

  return (
    <form onSubmit={handleSubmit(({ email }) => mutate({ email }))}>
      <FormControl isInvalid={!!formState.errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          required
          type="email"
          placeholder="john.doe@example.com"
          {...register("email", {
            required: {
              value: true,
              message: "Please fill out the field.",
            },
            validate: (value) => isEmail(value) || "Invalid email.",
          })}
        />
        {formState.errors.email?.message && (
          <FormErrorMessage>
            <FormErrorIcon />
            <span>{formState.errors.email.message}</span>
          </FormErrorMessage>
        )}
      </FormControl>
      <Button w="full" mt={4} isLoading={formState.isSubmitting} type="submit">
        Send
      </Button>
    </form>
  );
}
