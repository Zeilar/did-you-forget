import { Heading } from "@chakra-ui/react";
import { Navbar, Paper } from "@ui/components";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Paper rounded="none">
        <Heading m={0}>Account</Heading>
      </Paper>
      {children}
      <Navbar />
    </>
  );
}
