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
          bgColor: "primary.600",
          _hover: {
            bgColor: "primary.700",
            _loading: {
              bgColor: "primary.600",
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
            bgColor: "red.700",
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
      danger: "var(--chakra-colors-red-400)",
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
        color: "gray.100",
        bgColor: "gray.900",
      },
      "::selection": {
        bgColor: "primary.500",
        color: "gray.900",
      },
    },
  },
});
