import { Flex, Heading } from "@chakra-ui/react";
import { Navbar, Paper } from "@ui/components";
import type { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return (
    <>
      <Paper rounded="none">
        <Heading m={0}>Account</Heading>
      </Paper>
      <Flex flexDir="column" align="start" h="full" p={4}>
        {children}
      </Flex>
      <Navbar />
    </>
  );
}
