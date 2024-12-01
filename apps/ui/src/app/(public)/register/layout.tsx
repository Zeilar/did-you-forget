import { Link } from "@chakra-ui/next-js";
import { Flex, Heading, Text } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return (
    <Flex p={4} m="auto" h="full" align="center" justify="center" flexDir="column">
      <Heading>Register</Heading>
      {children}
      <Text mt={4}>
        Already have an account? {` `}
        <Link href="/login" display="inline-flex" alignItems="center" gap={1}>
          Login
        </Link>
      </Text>
    </Flex>
  );
}
