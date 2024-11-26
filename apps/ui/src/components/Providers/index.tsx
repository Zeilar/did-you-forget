"use client";

import type { PropsWithChildren } from "react";
import { ChakraProvider, GlobalStyle } from "@chakra-ui/react";
import { theme } from "../../theme";
import { QueryClientProvider, QueryClient } from "react-query";
import { AppProgressBar } from "next-nprogress-bar";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <AppProgressBar
        shallowRouting
        options={{ showSpinner: false }}
        color="var(--chakra-colors-primary-500)"
      />
    </ChakraProvider>
  );
}
