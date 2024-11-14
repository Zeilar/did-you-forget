"use client";

import type { PropsWithChildren } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "../../theme";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider forcedTheme="dark" enableSystem={false} defaultTheme="dark">
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </ThemeProvider>
  );
}
