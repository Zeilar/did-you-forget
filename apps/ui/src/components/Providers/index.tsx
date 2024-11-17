"use client";

import type { PropsWithChildren } from "react";
import { ChakraProvider, Theme } from "@chakra-ui/react";
import { system } from "../../theme";
import { QueryClientProvider, QueryClient } from "react-query";
import { Toaster } from "../chakra";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider value={system}>
      <Theme bgColor="body.bg" appearance="dark">
        <Toaster />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Theme>
    </ChakraProvider>
  );
}
