import { Flex } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Flex flexDir="column" h="full" p={4} justify="center">
      {children}
    </Flex>
  );
}
