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
          bgColor: "cyan.700",
          _hover: {
            bgColor: "cyan.800",
            _loading: {
              bgColor: "cyan.700",
            },
          },
          _active: {
            bgColor: "cyan.800",
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
      900: "#161b23",
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
        bgColor: "cyan.500",
        color: "gray.900",
      },
    },
  },
});
