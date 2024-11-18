import { createSystem, defaultConfig, defineConfig, defineTextStyles } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    textStyles: defineTextStyles({
      body: {
        value: {
          fontFamily: "Inter",
          fontSize: "1rem",
        },
      },
    }),
    tokens: {
      colors: {
        accent: {
          "100": { value: "{colors.purple.100}" },
          "200": { value: "{colors.purple.200}" },
          "300": { value: "{colors.purple.300}" },
          "400": { value: "{colors.purple.400}" },
          "500": { value: "{colors.purple.500}" },
          "600": { value: "{colors.purple.600}" },
          "700": { value: "{colors.purple.700}" },
          "800": { value: "{colors.purple.800}" },
          "900": { value: "{colors.purple.900}" },
          "950": { value: "{colors.purple.950}" },
        },
        danger: { value: "{colors.red.600}" },
        body: {
          bg: { value: "{colors.gray.950}" },
        },
      },
    },
  },
  globalCss: {
    "::selection": {
      bgColor: "accent.600",
      color: "accent.100",
    },
    "button, img, ::placeholder": {
      userSelect: "none",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
