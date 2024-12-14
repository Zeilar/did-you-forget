import { Flex, Heading } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Flex p={4} gap={4} m="auto" w="full" h="full" align="center" justify="center" flexDir="column">
      <Heading m={0}>Sign in</Heading>
      {children}
    </Flex>
  );
}
