"use client";

import { clientFetch } from "@ui/common/fetchers/client";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  type UseToastOptions,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input, Paper, passwordPlaceholder } from "@ui/components";
import type { SignInDto } from "@did-you-forget/dto";
import { useToast } from "@ui/hooks";

const errorToastOptions: UseToastOptions = {
  title: "Error",
  description: "An unexpected error occurred.",
  status: "error",
};

export function Login() {
  const { replace } = useRouter();
  const { handleSubmit, register, formState } = useForm<SignInDto>({ mode: "onSubmit" });
  const toast = useToast();

  return (
    <Paper
      w="full"
      as="form"
      onSubmit={handleSubmit(async (fields) => {
        try {
          const { ok } = await clientFetch("/auth/sign-in", "POST", fields);
          if (!ok) {
            toast(errorToastOptions);
            return;
          }
          replace("/");
        } catch (error) {
          console.error(error);
          toast(errorToastOptions);
        }
      })}
    >
      <FormControl isInvalid={!!formState.errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          {...register("email", {
            required: {
              value: true,
              message: "Email is required.",
            },
          })}
          type="email"
          placeholder="Email"
          autoFocus
        />
        {formState.errors.email?.message && (
          <FormErrorMessage>
            <FormErrorIcon />
            <span>{formState.errors.email.message}</span>
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!formState.errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          {...register("password", {
            required: {
              value: true,
              message: "Password is required.",
            },
            minLength: {
              value: 3,
              message: "Password must be at least 3 character long.",
            },
          })}
          type="password"
          placeholder={passwordPlaceholder}
        />
        {formState.errors.password?.message && (
          <FormErrorMessage>
            <FormErrorIcon />
            <span>{formState.errors.password.message}</span>
          </FormErrorMessage>
        )}
      </FormControl>
      <Flex justify="space-between">
        <Checkbox {...register("rememberMe")} w="fit-content">
          Remember me
        </Checkbox>
      </Flex>
      <Button mt={2} type="submit" isLoading={formState.isSubmitting}>
        Sign in
      </Button>
    </Paper>
  );
}
