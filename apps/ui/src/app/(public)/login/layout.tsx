import { Link } from "@chakra-ui/next-js";
import { Flex, Heading, Text } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return (
    <Flex p={4} m="auto" h="full" align="center" justify="center" flexDir="column">
      <Heading>Sign in</Heading>
      {children}
      <Text mt={4}>
        Don&apos;t have an account? {` `}
        <Link href="/register" display="inline-flex" alignItems="center" gap={1}>
          Register
        </Link>
      </Text>
    </Flex>
  );
}
