"use client";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import type { EditUserDto, UserWithoutPasswordDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { useEditUser } from "@ui/features/user/hooks";
import { isEmail } from "class-validator";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

interface CredentialsProps {
  initialData: UserWithoutPasswordDto;
}

export function Credentials({ initialData }: CredentialsProps) {
  const { mutate, isLoading } = useEditUser();
  const { data } = useQuery<UserWithoutPasswordDto>(
    "user",
    async () => {
      const { data } = await clientFetch<UserWithoutPasswordDto>("/user");
      return data;
    },
    { initialData, cacheTime: 0 } // For some reason the cache invalidation doesn't work.
  );
  const { register, setValue, watch, formState, handleSubmit } = useForm<EditUserDto>({
    defaultValues: { email: initialData.email },
    disabled: !data?.isVerified,
  });

  useEffect(() => {
    setValue("email", data?.email ?? initialData.email);
  }, [initialData.email, data?.email, setValue]);

  return (
    <Stack spacing={4} as="form" onSubmit={handleSubmit((fields) => mutate(fields))}>
      <Heading as="h3" size="lg" mb={0}>
        Profile
      </Heading>
      <FormControl isInvalid={!!formState.errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder={data?.email ?? initialData.email}
          type="email"
          {...register("email", { validate: (value) => isEmail(value) || "Invalid email." })}
        />
        {formState.errors.email?.message && (
          <FormErrorMessage>{formState.errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!formState.errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          type="password"
          {...register("password", {
            minLength: {
              value: 3,
              message: "Password must be at least 3 character long.",
            },
          })}
        />
        {formState.errors.password?.message && (
          <FormErrorMessage>{formState.errors.password.message}</FormErrorMessage>
        )}
      </FormControl>
      <Flex gap={2} justify="end">
        <Button
          disabled={!data?.isVerified || (data?.email ?? initialData.email) === watch("email")}
          variant="outline"
          onClick={() => setValue("email", data?.email ?? initialData.email)}
        >
          Reset
        </Button>
        <Button type="submit" isLoading={isLoading} disabled={!data?.isVerified}>
          Save
        </Button>
      </Flex>
    </Stack>
  );
}
