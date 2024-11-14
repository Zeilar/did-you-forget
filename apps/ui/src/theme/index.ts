import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    body: {
      bgColor: "gray.900",
      color: "gray.200",
    },
    "::selection": {
      bgColor: "black",
      color: "cyan.200",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
