"use client";

import type { PropsWithChildren } from "react";
import { ChakraProvider, GlobalStyle } from "@chakra-ui/react";
import { theme } from "../../theme";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProvider>
  );
}
