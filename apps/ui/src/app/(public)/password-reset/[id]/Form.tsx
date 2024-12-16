"use client";

import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import type { PasswordResetConfirmDto } from "@did-you-forget/dto";
import { clientFetch, type ClientFetchResult } from "@ui/common/fetchers/client";
import { Input, Paper, passwordPlaceholder } from "@ui/components";
import { useToast } from "@ui/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

interface FormProps {
  id: string;
}

interface Fields {
  password: string;
}

export function Form({ id }: FormProps) {
  const { replace } = useRouter();
  const toast = useToast();
  const { mutate, isLoading } = useMutation<ClientFetchResult, unknown, PasswordResetConfirmDto>(
    ["password-reset", id],
    (fields) => clientFetch("/auth/password-reset/confirm", "POST", fields),
    {
      onSuccess: () => {
        toast({
          title: "Password reset",
          description: "Use your new password to log in.",
          status: "success",
        });
        replace("/login");
      },
    }
  );
  const { handleSubmit, register, formState } = useForm<Fields>();

  return (
    <>
      <Heading textAlign="center">Password Reset</Heading>
      <Paper as="form" onSubmit={handleSubmit(({ password }) => mutate({ id, password }))}>
        <FormControl isInvalid={!!formState.errors.password}>
          <FormLabel>New Password</FormLabel>
          <Input
            required
            type="password"
            placeholder={passwordPlaceholder}
            {...register("password", {
              required: {
                value: true,
                message: "Please fill out the field.",
              },
              minLength: {
                value: 3,
                message: "Password must be at least 3 character long.",
              },
            })}
          />
          {formState.errors.password && (
            <FormErrorMessage>
              <FormErrorIcon />
              <span>{formState.errors.password.message}</span>
            </FormErrorMessage>
          )}
        </FormControl>
        <Button type="submit" isLoading={isLoading}>
          Confirm
        </Button>
      </Paper>
    </>
  );
}
