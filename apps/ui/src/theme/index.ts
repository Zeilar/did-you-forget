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
    FormLabel: defineStyleConfig({
      baseStyle: {
        w: "fit-content",
      },
    }),
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
          color: "text.dark",
          bgColor: "primary.400",
          _hover: {
            bgColor: "primary.500",
            _loading: {
              bgColor: "primary.400",
            },
          },
          _active: {
            bgColor: "primary.700",
          },
        },
        "solid-secondary": {
          bgColor: "gray.600",
          _hover: {
            bgColor: "gray.700",
            _loading: {
              bgColor: "gray.600",
            },
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
            bgColor: "red.800",
          },
        },
        "outline-primary": {
          border: "1px solid",
          color: "primary.400",
          borderColor: "currentColor",
          _hover: {
            bgColor: "whiteAlpha.50",
          },
          _active: {
            bgColor: "whiteAlpha.100",
          },
        },
      },
    }),
  },
  colors: {
    border: "var(--chakra-colors-gray-600)",
    bg: {
      body: "#0e1014",
      paper: "var(--chakra-colors-gray-900)",
    },
    text: {
      dark: "var(--chakra-colors-gray-900)",
      danger: "var(--chakra-colors-red-400)",
      muted: "var(--chakra-colors-gray-500)",
    },
    primary: {
      50: "#f0f9f7",
      100: "#c4e8df",
      200: "#8ed3c2",
      300: "#49b89d",
      400: "#1fa786",
      500: "#008e6b",
      600: "#00785b",
      700: "#006149",
      800: "#00523e",
      900: "#003b2d",
    },
    gray: {
      50: "#f9faf7",
      100: "#f1f1f0",
      200: "#e6e7e4",
      300: "#d2d4d2",
      400: "#a9adb0",
      500: "#79808a",
      600: "#4d5653",
      700: "#2e3741",
      800: "#192026",
      900: "#141a1e",
    },
  },
  shadows: {
    md: "0 0 5px 0 rgba(0, 0, 0, 0.75)",
  },
  styles: {
    global: {
      "*, *::before, *::after": {
        borderColor: "gray.700",
      },
      "html, body": {
        color: "gray.300",
        bgColor: "gray.900",
      },
      "::selection": {
        bgColor: "black",
        color: "primary.400",
      },
    },
  },
});
