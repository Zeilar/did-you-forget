import { defineStyleConfig, extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Alert, Checkbox, Menu, Modal, Switch } from "./components";
import { plusJakartaSans, roboto } from "./fonts"; // Comment this out when running the types script.

export const theme = extendTheme({
  fonts: {
    heading: plusJakartaSans.style.fontFamily,
    body: roboto.style.fontFamily,
  },
  config: {
    initialColorMode: "dark",
    disableTransitionOnChange: true,
    useSystemColorMode: false,
  } satisfies ThemeConfig,
  components: {
    Alert,
    Switch,
    Checkbox,
    Modal,
    Menu,
    Link: defineStyleConfig({
      baseStyle: {
        color: "text.primary",
      },
    }),
    FormLabel: defineStyleConfig({
      baseStyle: {
        w: "fit-content",
        fontWeight: 500,
        color: "text.secondary",
        cursor: "auto",
        userSelect: "none",
      },
    }),
    Heading: defineStyleConfig({
      baseStyle: {
        mb: 4,
        letterSpacing: 1,
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
          h: "2.25em",
          w: "2.25em",
          minW: "auto",
          p: "0.6em !important",
        },
      },
      variants: {
        link: {
          color: "text.primary",
          _active: {
            color: "text.primary",
          },
        },
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
          color: "text.primary",
          borderColor: "currentColor",
          _hover: {
            color: "primary.500",
          },
          _active: {
            color: "primary.600",
          },
        },
        "outline-danger": {
          border: "1px solid",
          color: "text.danger",
          borderColor: "currentColor",
          _hover: {
            color: "red.500",
          },
          _active: {
            color: "red.600",
          },
        },
        icon: {
          border: "1px solid",
          borderColor: "border",
          _hover: {
            color: "text.primary",
            borderColor: "text.primary",
          },
          _active: {
            color: "primary.500",
            borderColor: "primary.500",
          },
        },
      },
    }),
  },
  colors: {
    border: "var(--chakra-colors-gray-600)",
    bg: {
      body: "#101217",
      paper: "var(--chakra-colors-gray-900)",
    },
    text: {
      default: "var(--chakra-colors-gray-50)",
      primary: "var(--chakra-colors-green-400)",
      secondary: "var(--chakra-colors-gray-300)",
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
      800: "#181F25",
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
        bgColor: "bg.body",
      },
      "::selection": {
        bgColor: "black",
        color: "text.primary",
      },
      "::placeholder": {
        color: "text.muted",
      },
    },
  },
});
