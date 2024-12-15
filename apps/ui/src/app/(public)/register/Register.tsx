"use client";

import { clientFetch } from "@ui/common/fetchers/client";
import {
  Button,
  Divider,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Text,
  type UseToastOptions,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input, Paper, passwordPlaceholder } from "@ui/components";
import type { RegisterUserDto } from "@did-you-forget/dto";
import { useToast } from "@ui/hooks";
import { isEmail } from "class-validator";
import { Link } from "@chakra-ui/next-js";

const errorToastOptions: UseToastOptions = {
  title: "Error",
  description: "An unexpected error occurred.",
  status: "error",
};

export function Register() {
  const { replace } = useRouter();
  const { handleSubmit, register, formState } = useForm<RegisterUserDto>({ mode: "onSubmit" });
  const toast = useToast();

  return (
    <Paper
      w="full"
      as="form"
      onSubmit={handleSubmit(async (fields) => {
        try {
          const { ok } = await clientFetch("/user/register", "POST", fields);
          if (!ok) {
            toast(errorToastOptions);
            return;
          }
          replace("/account");
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
            validate: (value) => isEmail(value) || "Invalid email.",
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
      <Button mt={2} type="submit" isLoading={formState.isSubmitting}>
        Register
      </Button>
      <Divider />
      <Text textAlign="center">
        Already have an account? {` `}
        <Link href="/login" display="inline-flex" alignItems="center" gap={1}>
          Login
        </Link>
      </Text>
    </Paper>
  );
}
