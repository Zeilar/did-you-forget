"use client";

import { Flex, Heading } from "@chakra-ui/react";
import { Navbar } from "@ui/components";

interface Props {
  error: unknown;
}

export default function Page({ error }: Props) {
  console.error(error);

  return (
    <>
      <Flex flexDir="column" textAlign="center" w="full" h="full" p={4} justify="center">
        <Heading as="h1" size="3xl" color="text.danger">
          500
        </Heading>
        <Heading m={0}>An unexpected error occurred!</Heading>
      </Flex>
      <Navbar />
    </>
  );
}
