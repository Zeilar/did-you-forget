"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import type { EditUserDto, UserWithoutPasswordDto } from "@did-you-forget/dto";
import { clientFetch } from "@ui/common/fetchers/client";
import { Paper } from "@ui/components";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

interface CredentialsProps {
  initialData: UserWithoutPasswordDto;
}

export function Credentials({ initialData }: CredentialsProps) {
  const { register } = useForm<EditUserDto>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery<UserWithoutPasswordDto>(
    "user",
    async () => {
      const { data } = await clientFetch<UserWithoutPasswordDto>("/user");
      return data;
    },
    { initialData, cacheTime: 0 } // For some reason the cache invalidation doesn't work.
  );

  return (
    <Paper w="full" as="form">
      <Heading as="h3" size="lg" mb={0}>
        Profile
      </Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" type="email" {...register("email")} />
      </FormControl>
      <FormControl>
        <FormLabel>password</FormLabel>
        <Input placeholder="Password" type="password" {...register("password")} />
      </FormControl>
      <Flex gap={2} mt={2}>
        <Button>Save</Button>
        <Button variant="outline">Reset</Button>
      </Flex>
    </Paper>
  );
}
