"use client";

import { clientFetch } from "@ui/common/fetchers/client";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  UseToastOptions,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input, Paper } from "@ui/components";
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
    <Box
      w="full"
      as="form"
      onSubmit={handleSubmit(async (fields) => {
        try {
          const { status } = await clientFetch("/auth/sign-in", "POST", fields);
          if (status === 204) {
            replace("/");
            return;
          }
          toast(errorToastOptions);
        } catch (error) {
          console.error(error);
          toast(errorToastOptions);
        }
      })}
    >
      <Paper>
        <h2>Sign in</h2>
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
            <FormErrorMessage>{formState.errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!formState.errors.password}>
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
            placeholder="Password"
          />
          {formState.errors.password?.message && (
            <FormErrorMessage>{formState.errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <Checkbox {...register("rememberMe")} w="fit-content">
          Remember me
        </Checkbox>
        <Button mt={2} type="submit" isLoading={formState.isSubmitting}>
          Sign in
        </Button>
      </Paper>
    </Box>
  );
}
