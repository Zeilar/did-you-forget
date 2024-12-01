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
      baseStyle: {
        fontWeight: 500,
      },
      defaultProps: {
        variant: "solid-primary",
      },
      sizes: {
        icon: {
          h: "auto",
          minW: "auto",
          p: "0.5rem !important",
        },
      },
      variants: {
        "solid-primary": {
          color: "text.default",
          bgColor: "green.600",
          _hover: {
            bgColor: "primary.700",
            _loading: {
              bgColor: "primary.800",
            },
          },
          _active: {
            bgColor: "primary.800",
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
          color: "primary.600",
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
      default: "var(--chakra-colors-gray-50)",
      dark: "var(--chakra-colors-gray-900)",
      danger: "var(--chakra-colors-red-400)",
      muted: "var(--chakra-colors-gray-500)",
    },
    primary: {
      50: "var(--chakra-colors-green-50)",
      100: "var(--chakra-colors-green-100)",
      200: "var(--chakra-colors-green-200)",
      300: "var(--chakra-colors-green-300)",
      400: "var(--chakra-colors-green-400)",
      500: "var(--chakra-colors-green-500)",
      600: "var(--chakra-colors-green-600)",
      700: "var(--chakra-colors-green-700)",
      800: "var(--chakra-colors-green-800)",
      900: "var(--chakra-colors-green-900)",
      text: "var(--chakra-colors-green-400)",
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
        color: "text.default",
        bgColor: "gray.900",
      },
      "::selection": {
        bgColor: "black",
        color: "primary.text",
      },
      "::placeholder": {
        color: "text.muted",
      },
    },
  },
});
