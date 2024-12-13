import { Flex } from "@chakra-ui/react";
import { Navbar } from "@ui/components";
import type { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Flex p={4} flexDir="column" justify="center" align="center" h="full">
        {children}
      </Flex>
      <Navbar />
    </>
  );
}
