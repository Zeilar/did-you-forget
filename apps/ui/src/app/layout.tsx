import type { PropsWithChildren } from "react";
import { Navbar, Providers } from "@ui/components";
import { Box, Flex } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Welcome to UI",
  description: "Generated by create-nx-workspace",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <Providers>
          <Flex as="main" h="100svh" direction="column">
            <Navbar />
            <Box overflow="auto" h="100%" px={4}>
              {children}
            </Box>
            <Box as="footer" textAlign="center" mt="auto" p={4}>
              I am footer
            </Box>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
