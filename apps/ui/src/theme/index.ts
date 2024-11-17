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
        accent: { value: "{colors.cyan.600}" },
        danger: { value: "{colors.red.600}" },
        body: {
          bg: { value: "{colors.gray.950}" },
        },
      },
    },
  },
  globalCss: {
    "::selection": {
      bgColor: "black",
      color: "cyan.200",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
