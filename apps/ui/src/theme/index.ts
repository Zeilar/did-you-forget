import { defineStyleConfig, extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Menu, Modal } from "./components";

export const theme = extendTheme({
  fonts: {
    body: "Roboto",
    heading: "Roboto",
  },
  config: {
    initialColorMode: "dark",
    disableTransitionOnChange: true,
    useSystemColorMode: false,
  } satisfies ThemeConfig,
  components: {
    Modal,
    Menu,
    Heading: defineStyleConfig({
      baseStyle: {
        mb: 4,
      },
    }),
    Button: defineStyleConfig({
      defaultProps: {
        variant: "solid-primary",
      },
      variants: {
        "solid-primary": {
          bgColor: "cyan.700",
          _hover: {
            bgColor: "cyan.800",
          },
          _active: {
            bgColor: "cyan.800",
          },
        },
        "solid-secondary": {
          bgColor: "gray.600",
          _hover: {
            bgColor: "gray.700",
          },
          _active: {
            bgColor: "gray.700",
          },
        },
        "solid-danger": {
          bgColor: "red.600",
          _hover: {
            bgColor: "red.700",
          },
          _active: {
            bgColor: "red.700",
          },
        },
      },
    }),
  },
  colors: {
    border: "var(--chakra-colors-gray-600)",
    bg: {
      paper: "var(--chakra-colors-gray-800)",
    },
    text: {
      danger: "var(--chakra-colors-red-400)",
    },
    gray: {
      50: "#F0F2F5",
      100: "#D4DAE3",
      200: "#B8C2D1",
      300: "#9CAABF",
      400: "#8091AC",
      500: "#65799A",
      600: "#50617C",
      700: "#3C495D",
      800: "#28313E",
      900: "#14181F",
    },
    purple: {
      50: "#E4D4F4", // Closer to the mid-tone, very subtle lightness
      100: "#CBB6EB", // Still light but closer to 500
      200: "#B297E2", // Slightly lighter than 500
      300: "#9A79D9", // Approaching mid-tone
      400: "#825BD0", // A soft transition to 500
      500: "#6C21DE", // Mid-tone unchanged
      600: "#631FC4", // Slightly deeper, but close to 500
      700: "#5920AA", // Muted, soft depth
      800: "#4F2190", // Closer to 700 than original
      900: "#452377", // A more subdued dark
    },
  },
  shadows: {
    md: "0 0 5px 0 rgba(0, 0, 0, 0.75)",
  },
  styles: {
    global: {
      "*, *::before, *::after": {
        borderColor: "gray.600",
      },
      "html, body": {
        color: "gray.100",
        bgColor: "gray.900",
      },
    },
  },
});
