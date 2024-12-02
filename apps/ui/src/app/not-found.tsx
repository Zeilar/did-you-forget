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
        <Heading as="h1" size="3xl" color="text.primary">
          404
        </Heading>
        <Heading m={0}>Page not found</Heading>
      </Flex>
      <Navbar />
    </>
  );
}
