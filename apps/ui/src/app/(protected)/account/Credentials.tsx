"use client";

import { Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import type { EditUserDto, UserWithoutPasswordDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { Paper } from "@ui/components";
import { isEmail } from "class-validator";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

interface CredentialsProps {
  initialData: UserWithoutPasswordDto;
}

export function Credentials({ initialData }: CredentialsProps) {
  const { data } = useQuery<UserWithoutPasswordDto>(
    "user",
    async () => {
      const { data } = await clientFetch<UserWithoutPasswordDto>("/user");
      return data;
    },
    { initialData, cacheTime: 0 } // For some reason the cache invalidation doesn't work.
  );
  const { register } = useForm<EditUserDto>({ defaultValues: { email: initialData.email } });

  return (
    <Paper w="full" as="form">
      <Heading as="h3" size="lg" mb={0}>
        Profile
      </Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder={data?.email ?? initialData.email}
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required.",
            },
            validate: (value) => isEmail(value) || "Invalid email.",
          })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          type="password"
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
        />
      </FormControl>
      <Flex gap={2} mt={2}>
        <Button>Save</Button>
        <Button variant="outline">Reset</Button>
      </Flex>
    </Paper>
  );
}
